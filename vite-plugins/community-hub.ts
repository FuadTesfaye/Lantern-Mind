import { mkdirSync, readFileSync, writeFileSync, existsSync } from "node:fs";
import { dirname, join } from "node:path";
import { fileURLToPath } from "node:url";
import { voiceStories } from "../src/content/trauma";
import {
  excerptFromBody,
  type ClientMessage,
  type CommunityComment,
  type CommunityPost,
  type CommunitySnapshot,
  type ServerMessage,
} from "../src/lib/community/types";

const ROOT = join(dirname(fileURLToPath(import.meta.url)), "..");
const DATA_DIR = join(ROOT, ".data");
const STORE_PATH = join(DATA_DIR, "community-store.json");

type PersistShape = {
  posts: CommunityPost[];
};

function nowIso() {
  return new Date().toISOString();
}

function id(prefix: string) {
  return `${prefix}_${Date.now().toString(36)}_${Math.random().toString(36).slice(2, 8)}`;
}

function sanitizeAuthor(raw?: string) {
  const trimmed = (raw ?? "").trim().slice(0, 40);
  return trimmed.length > 0 ? trimmed : "Anonymous";
}

function sanitizeTags(tags: string[]) {
  const unique = [...new Set(tags.map((t) => t.trim()).filter(Boolean))];
  return unique.slice(0, 3);
}

function seedPosts(): CommunityPost[] {
  return voiceStories.map((story) => ({
    id: `seed_${story.id}`,
    title: story.title,
    body: story.excerpt,
    excerpt: story.excerpt,
    author: story.author,
    tags: story.tags,
    status: "published" as const,
    createdAt: nowIso(),
    publishedAt: nowIso(),
    comments: [],
  }));
}

function load(): CommunityPost[] {
  try {
    if (!existsSync(STORE_PATH)) return seedPosts();
    const raw = readFileSync(STORE_PATH, "utf8");
    const parsed = JSON.parse(raw) as PersistShape;
    if (!Array.isArray(parsed.posts) || parsed.posts.length === 0) return seedPosts();
    return parsed.posts;
  } catch {
    return seedPosts();
  }
}

function save(posts: CommunityPost[]) {
  mkdirSync(DATA_DIR, { recursive: true });
  const payload: PersistShape = { posts };
  writeFileSync(STORE_PATH, JSON.stringify(payload, null, 2), "utf8");
}

export type CommunityHub = {
  getSnapshot: () => CommunitySnapshot;
  handleMessage: (raw: string) => ServerMessage[];
};

export function createCommunityHub(): CommunityHub {
  let posts = load();

  const persist = () => save(posts);

  const snapshot = (): CommunitySnapshot => ({
    published: posts
      .filter((p) => p.status === "published")
      .sort((a, b) => (b.publishedAt ?? b.createdAt).localeCompare(a.publishedAt ?? a.createdAt)),
    pending: posts
      .filter((p) => p.status === "pending")
      .sort((a, b) => b.createdAt.localeCompare(a.createdAt)),
  });

  const handle = (msg: ClientMessage): ServerMessage[] => {
    switch (msg.type) {
      case "hello":
        return [{ type: "snapshot", data: snapshot() }];

      case "submit_post": {
        const title = msg.title.trim().slice(0, 120);
        const body = msg.body.trim().slice(0, 8000);
        if (title.length < 3 || body.length < 20) {
          return [
            {
              type: "error",
              message: "Please share a short title and at least a few sentences.",
            },
          ];
        }
        const post: CommunityPost = {
          id: id("post"),
          title,
          body,
          excerpt: excerptFromBody(body),
          author: sanitizeAuthor(msg.author),
          tags: sanitizeTags(msg.tags),
          status: "pending",
          createdAt: nowIso(),
          comments: [],
        };
        posts = [post, ...posts];
        persist();
        return [
          { type: "post_submitted", post },
          { type: "snapshot", data: snapshot() },
        ];
      }

      case "approve_post": {
        const post = posts.find((p) => p.id === msg.postId);
        if (!post || post.status !== "pending") {
          return [{ type: "error", message: "That submission is no longer pending." }];
        }
        post.status = "published";
        post.publishedAt = nowIso();
        persist();
        return [
          { type: "post_approved", post },
          { type: "snapshot", data: snapshot() },
        ];
      }

      case "reject_post": {
        const post = posts.find((p) => p.id === msg.postId);
        if (!post || post.status !== "pending") {
          return [{ type: "error", message: "That submission is no longer pending." }];
        }
        post.status = "rejected";
        persist();
        return [
          { type: "post_rejected", postId: post.id },
          { type: "snapshot", data: snapshot() },
        ];
      }

      case "add_comment": {
        const post = posts.find((p) => p.id === msg.postId && p.status === "published");
        if (!post) {
          return [{ type: "error", message: "Discussion isn’t open on that post." }];
        }
        const body = msg.body.trim().slice(0, 2000);
        if (body.length < 2) {
          return [{ type: "error", message: "Say a little more — even a short witness helps." }];
        }
        const comment: CommunityComment = {
          id: id("cmt"),
          postId: post.id,
          body,
          author: sanitizeAuthor(msg.author),
          createdAt: nowIso(),
        };
        post.comments = [...post.comments, comment];
        persist();
        return [{ type: "comment_added", postId: post.id, comment }];
      }

      default:
        return [{ type: "error", message: "Unknown message." }];
    }
  };

  return {
    getSnapshot: snapshot,
    handleMessage(raw: string) {
      let parsed: ClientMessage;
      try {
        parsed = JSON.parse(raw) as ClientMessage;
      } catch {
        return [{ type: "error", message: "Invalid message." }];
      }
      if (!parsed || typeof parsed !== "object" || !("type" in parsed)) {
        return [{ type: "error", message: "Invalid message." }];
      }
      return handle(parsed);
    },
  };
}
