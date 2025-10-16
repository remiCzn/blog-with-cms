import { createRouter } from "../utils/createApp";

const adminRouter = createRouter()
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

export default adminRouter;
export type AdminRouterType = typeof adminRouter;
