import "dotenv/config";

import { serve } from "@hono/node-server";
import { showRoutes } from "hono/dev";
import { logger } from "hono/logger";
import { env } from "./utils/config";
import createApp from "./utils/createApp";
import db from "./lib/db";
import { join } from "node:path";
import { serveStatic } from "@hono/node-server/serve-static";
import api from "./api";

const staticRoot = join(__dirname, "public");

console.log("Static root:", staticRoot);
const app = createApp()
  .use(logger())
  .use("*", async (c, next) => {
    c.set("db", db);

    await next();
  })
  .route("/api", api);

app
  .use(
    serveStatic({
      root: staticRoot,
      rewriteRequestPath: (path) => {
        if (path === "/" || path === "") {
          return "/index.html";
        }

        return path;
      },
    })
  )
  .use("/*", serveStatic({ root: staticRoot }))
  .get("/*", serveStatic({ path: `${staticRoot}/index.html` }));

showRoutes(app, {
  verbose: true,
});

serve(
  {
    fetch: app.fetch,
    port: env.PORT,
  },
  (info) => {
    console.log(
      `[${env.NODE_ENV}] Server is running on http://localhost:${info.port}`
    );
  }
);

export type AppType = typeof app;
