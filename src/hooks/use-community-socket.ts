import { useCallback, useEffect, useRef, useState } from "react";
import { voiceStories } from "@/content/trauma";
import {
  COMMUNITY_WS_PATH,
  type ClientMessage,
  type CommunityComment,
  type CommunityPost,
  type CommunitySnapshot,
  type ServerMessage,
} from "@/lib/community/types";

export type CommunityConnectionState = "connecting" | "open" | "closed";

type UseCommunitySocketOptions = {
  /** When false, the socket stays closed (e.g. SSR). Default true in browser. */
  enabled?: boolean;
};

type UseCommunitySocketResult = {
  status: CommunityConnectionState;
  published: CommunityPost[];
  pending: CommunityPost[];
  lastError: string | null;
  send: (message: ClientMessage) => void;
  getPost: (postId: string) => CommunityPost | undefined;
};

function wsUrl() {
  if (typeof window === "undefined") return "";
  const proto = window.location.protocol === "https:" ? "wss:" : "ws:";
  return `${proto}//${window.location.host}${COMMUNITY_WS_PATH}`;
}

function seedFallback(): CommunityPost[] {
  return voiceStories.map((story) => ({
    id: `seed_${story.id}`,
    title: story.title,
    body: story.excerpt,
    excerpt: story.excerpt,
    author: story.author,
    tags: story.tags,
    status: "published" as const,
    createdAt: new Date(0).toISOString(),
    publishedAt: new Date(0).toISOString(),
    comments: [],
  }));
}

function applySnapshot(
  prev: CommunitySnapshot,
  message: ServerMessage,
): CommunitySnapshot {
  switch (message.type) {
    case "snapshot":
      return message.data;
    case "post_submitted": {
      const without = prev.pending.filter((p) => p.id !== message.post.id);
      return { ...prev, pending: [message.post, ...without] };
    }
    case "post_approved": {
      const pending = prev.pending.filter((p) => p.id !== message.post.id);
      const published = [
        message.post,
        ...prev.published.filter((p) => p.id !== message.post.id),
      ];
      return { pending, published };
    }
    case "post_rejected": {
      return {
        ...prev,
        pending: prev.pending.filter((p) => p.id !== message.postId),
      };
    }
    case "comment_added": {
      const merge = (list: CommunityPost[]) =>
        list.map((post) => {
          if (post.id !== message.postId) return post;
          const exists = post.comments.some((c) => c.id === message.comment.id);
          if (exists) return post;
          return { ...post, comments: [...post.comments, message.comment] };
        });
      return {
        published: merge(prev.published),
        pending: merge(prev.pending),
      };
    }
    default:
      return prev;
  }
}

export function useCommunitySocket(
  options: UseCommunitySocketOptions = {},
): UseCommunitySocketResult {
  const enabled = options.enabled ?? typeof window !== "undefined";
  const [status, setStatus] = useState<CommunityConnectionState>("connecting");
  const [snapshot, setSnapshot] = useState<CommunitySnapshot>(() => ({
    published: seedFallback(),
    pending: [],
  }));
  const [lastError, setLastError] = useState<string | null>(null);
  const socketRef = useRef<WebSocket | null>(null);
  const retryRef = useRef<ReturnType<typeof setTimeout> | null>(null);
  const intentionalClose = useRef(false);

  const send = useCallback((message: ClientMessage) => {
    const socket = socketRef.current;
    if (!socket || socket.readyState !== WebSocket.OPEN) {
      setLastError("Not connected yet — wait a moment and try again.");
      return;
    }
    setLastError(null);
    socket.send(JSON.stringify(message));
  }, []);

  useEffect(() => {
    if (!enabled) return;

    intentionalClose.current = false;
    let cancelled = false;

    const connect = () => {
      if (cancelled) return;
      setStatus("connecting");
      const socket = new WebSocket(wsUrl());
      socketRef.current = socket;

      socket.onopen = () => {
        if (cancelled) return;
        setStatus("open");
        setLastError(null);
        socket.send(JSON.stringify({ type: "hello" } satisfies ClientMessage));
      };

      socket.onmessage = (event) => {
        let message: ServerMessage;
        try {
          message = JSON.parse(String(event.data)) as ServerMessage;
        } catch {
          return;
        }
        if (message.type === "error") {
          setLastError(message.message);
          return;
        }
        setSnapshot((prev) => applySnapshot(prev, message));
      };

      socket.onerror = () => {
        // onclose handles reconnect
      };

      socket.onclose = () => {
        socketRef.current = null;
        if (cancelled || intentionalClose.current) {
          setStatus("closed");
          return;
        }
        setStatus("closed");
        retryRef.current = setTimeout(connect, 1500);
      };
    };

    connect();

    return () => {
      cancelled = true;
      intentionalClose.current = true;
      if (retryRef.current) clearTimeout(retryRef.current);
      socketRef.current?.close();
      socketRef.current = null;
    };
  }, [enabled]);

  const getPost = useCallback(
    (postId: string) =>
      snapshot.published.find((p) => p.id === postId) ??
      snapshot.pending.find((p) => p.id === postId),
    [snapshot],
  );

  return {
    status,
    published: snapshot.published,
    pending: snapshot.pending,
    lastError,
    send,
    getPost,
  };
}

export type { CommunityComment, CommunityPost };
