import { auth } from "./lib/auth";
import adminRouter from "./routes/admin-routes";
import publicRouter from "./routes/public-routes";
import { createRouter } from "./utils/createApp";

const api = createRouter()
  .use("/*", async (c, next) => {
    const session = await auth.api.getSession({ headers: c.req.raw.headers });
    if (!session) {
      c.set("user", null);
      c.set("session", null);
      return next();
    }
    c.set("user", session.user);
    c.set("session", session.session);
    return next();
  })
  .route("/admin", adminRouter)
  .route("/public", publicRouter);

api.on(["POST", "GET"], "/auth/*", (c) => auth.handler(c.req.raw));

export default api;
export type ApiRouterType = typeof api;
