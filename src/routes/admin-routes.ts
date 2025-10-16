import { auth } from "../lib/auth";
import { createRouter } from "../utils/createApp";

const adminRouter = createRouter()
  .use(async (c, next) => {
    const user = c.get("user");
    if (!user) {
      return c.text("Unauthorized", 401);
    }
    return next();
  })
  .get("/models", async (c) => {
    const db = c.get("db");
    const models = await db.query.contentModel.findMany({
      columns: { id: true, name: true, slug: true },
    });
    return c.json(models);
  })
  .get("/", (c) => c.text("Admin Home"));
// .post(
//   ...typedRouteHandler(
//     "/",
//     async (c) => {
//       const db = c.get("db");
//       const body = c.req.valid("json");
//       await db.insert(contentModel).values({
//         name: body.name,
//         slug: body.slug,
//       });
//       return c.text("Created");
//     },
//     z.object({
//       name: z.string(),
//       slug: z.string(),
//     })
//   )
// );

adminRouter;

export default adminRouter;
export type AdminRouterType = typeof adminRouter;
