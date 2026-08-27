import { defineConfig } from "@lovable.dev/vite-tanstack-config";
import { NodeRequest, sendNodeResponse } from "srvx/node";

export default defineConfig({
  tanstackStart: {
    // Redirect TanStack Start's bundled server entry to src/server.ts (our SSR error wrapper).
    // nitro/vite builds from this
    server: { entry: "server" },
  },
  nitro: {
    preset: "node-server",
  },
  plugins: [
    {
      name: "dev-ssr-handler",
      apply: "serve",
      configureServer(server) {
        return () => {
          server.middlewares.use(async (req, res, next) => {
            const url = req.url || "";
            // Pass through internal vite requests, static assets, and devtools
            if (
              url.startsWith("/@") ||
              url.startsWith("/node_modules") ||
              url.startsWith("/src") ||
              url.startsWith("/_build") ||
              url.startsWith("/.well-known") ||
              /\.[a-zA-Z0-9]+(\?.*)?$/.test(url)
            ) {
              return next();
            }

            const ssrEnv = (server.environments as any)?.ssr;
            if (ssrEnv?.runner) {
              try {
                if (req.originalUrl) req.url = req.originalUrl;
                const nodeReq = new NodeRequest({ req, res });
                const mod = await ssrEnv.runner.import("virtual:tanstack-start-server-entry");
                const handler = mod?.default ?? mod;
                if (handler && typeof handler.fetch === "function") {
                  const response = await handler.fetch(nodeReq);
                  if (response) {
                    return sendNodeResponse(res, response);
                  }
                }
              } catch (err) {
                console.error("[dev-ssr-handler] Error rendering SSR in dev:", err);
                try {
                  server.ssrFixStacktrace(err as Error);
                } catch {}
              }
            }
            next();
          });
        };
      },
    },
  ],
});
