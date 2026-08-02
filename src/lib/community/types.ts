/** Shared community realtime protocol (client ↔ WebSocket server). */

export type PostStatus = "pending" | "published" | "rejected";

export type CommunityComment = {
  id: string;
  postId: string;
  body: string;
  /** Soft anonymous label — never a real identity */
  author: string;
  createdAt: string;
};

export type CommunityPost = {
  id: string;
  title: string;
  body: string;
  excerpt: string;
  /** Soft anonymous label */
  author: string;
  tags: string[];
  status: PostStatus;
  createdAt: string;
  publishedAt?: string;
  comments: CommunityComment[];
};

export type CommunitySnapshot = {
  published: CommunityPost[];
  pending: CommunityPost[];
};

/** Client → server */
export type ClientMessage =
  | { type: "hello" }
  | {
      type: "submit_post";
      title: string;
      body: string;
      tags: string[];
      author?: string;
    }
  | { type: "approve_post"; postId: string }
  | { type: "reject_post"; postId: string }
  | { type: "add_comment"; postId: string; body: string; author?: string };

/** Server → client */
export type ServerMessage =
  | { type: "snapshot"; data: CommunitySnapshot }
  | { type: "post_submitted"; post: CommunityPost }
  | { type: "post_approved"; post: CommunityPost }
  | { type: "post_rejected"; postId: string }
  | { type: "comment_added"; postId: string; comment: CommunityComment }
  | { type: "error"; message: string };

export const COMMUNITY_WS_PATH = "/api/community-ws";

export function excerptFromBody(body: string, max = 180): string {
  const cleaned = body.trim().replace(/\s+/g, " ");
  if (cleaned.length <= max) return cleaned;
  return `${cleaned.slice(0, max - 1).trimEnd()}…`;
}

export function formatRelativeDate(iso: string): string {
  const then = new Date(iso).getTime();
  if (Number.isNaN(then)) return "";
  const diff = Date.now() - then;
  const minutes = Math.floor(diff / 60_000);
  if (minutes < 1) return "Just now";
  if (minutes < 60) return `${minutes} min ago`;
  const hours = Math.floor(minutes / 60);
  if (hours < 24) return `${hours}h ago`;
  const days = Math.floor(hours / 24);
  if (days < 7) return `${days} day${days === 1 ? "" : "s"} ago`;
  return new Date(iso).toLocaleDateString(undefined, {
    month: "short",
    day: "numeric",
    year: "numeric",
  });
}
