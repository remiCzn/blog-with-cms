import { Hono } from "hono";

const publicRouter = new Hono().get("/", (c) => c.text("Public Home"));

export default publicRouter;
export type PublicRouterType = typeof publicRouter;
