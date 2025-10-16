import adminRouter from "./routes/admin-routes";
import publicRouter from "./routes/public-routes";
import { createRouter } from "./utils/createApp";

const api = createRouter()
  .route("/admin", adminRouter)
  .route("/public", publicRouter);

export default api;
export type ApiRouterType = typeof api;
