import type { IncomingMessage } from "node:http";
import type { Duplex } from "node:stream";
import type { Plugin, ViteDevServer } from "vite";
import { WebSocketServer, type WebSocket } from "ws";
import { COMMUNITY_WS_PATH, type ServerMessage } from "../src/lib/community/types.ts";
import { createCommunityHub } from "./community-hub.ts";

function send(socket: WebSocket, message: ServerMessage) {
  if (socket.readyState === socket.OPEN) {
    socket.send(JSON.stringify(message));
  }
}

function broadcast(clients: Set<WebSocket>, message: ServerMessage) {
  const payload = JSON.stringify(message);
  for (const client of clients) {
    if (client.readyState === client.OPEN) {
      client.send(payload);
    }
  }
}

/**
 * Attaches a community WebSocket endpoint to the Vite HTTP server
 * so realtime posts / moderation / discussion work in `vite dev`.
 */
export function communityWsPlugin(): Plugin {
  const hub = createCommunityHub();
  const clients = new Set<WebSocket>();

  return {
    name: "velorah-community-ws",
    configureServer(server: ViteDevServer) {
      const wss = new WebSocketServer({ noServer: true });

      const onUpgrade = (req: IncomingMessage, socket: Duplex, head: Buffer) => {
        const url = req.url ?? "";
        const path = url.split("?")[0];
        if (path !== COMMUNITY_WS_PATH) return;

        wss.handleUpgrade(req, socket, head, (ws) => {
          wss.emit("connection", ws, req);
        });
      };

      server.httpServer?.on("upgrade", onUpgrade);

      wss.on("connection", (ws) => {
        clients.add(ws);
        send(ws, { type: "snapshot", data: hub.getSnapshot() });

        ws.on("message", (data) => {
          const raw = typeof data === "string" ? data : data.toString("utf8");
          const outbound = hub.handleMessage(raw);

          for (const message of outbound) {
            if (message.type === "error") {
              send(ws, message);
            } else if (message.type === "snapshot") {
              broadcast(clients, message);
            } else if (message.type === "comment_added") {
              broadcast(clients, message);
            } else if (
              message.type === "post_submitted" ||
              message.type === "post_approved" ||
              message.type === "post_rejected"
            ) {
              // Specific event + everyone gets a fresh snapshot from the same batch.
              broadcast(clients, message);
            } else {
              broadcast(clients, message);
            }
          }
        });

        ws.on("close", () => {
          clients.delete(ws);
        });

        ws.on("error", () => {
          clients.delete(ws);
        });
      });

      const _close = server.httpServer?.close.bind(server.httpServer);
      if (server.httpServer && _close) {
        server.httpServer.close = ((...args: Parameters<typeof _close>) => {
          server.httpServer?.off("upgrade", onUpgrade);
          for (const client of clients) client.close();
          clients.clear();
          wss.close();
          return _close(...args);
        }) as typeof _close;
      }
    },
  };
}
