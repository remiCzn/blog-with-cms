import type { Context, MiddlewareHandler } from "hono";
import { Hono } from "hono";
import db from "../lib/db";
import { zValidator } from "@hono/zod-validator";
import * as z from "zod";
import { auth } from "../lib/auth";

export type AuthType = {
  Variables: {
    db: typeof db;
    user: typeof auth.$Infer.Session.user | null;
    session: typeof auth.$Infer.Session.session | null;
  };
};

export function createRouter(): Hono<AuthType>;
export function createRouter<TReturn>(
  callback: (r: Hono<AuthType>) => TReturn
): TReturn;
export function createRouter(
  callback: (r: Hono<AuthType>) => unknown = (r) => r
) {
  const r = new Hono<AuthType>({
    strict: false,
  });

  return callback(r);
}

type JsonInputSchema<TSchema extends z.ZodType> = {
  in: {
    json: z.input<TSchema>;
  };
  out: {
    json: z.infer<TSchema>;
  };
};

export const typedRouteHandler = <
  TSchema extends z.ZodType,
  TPath extends string = "/"
>(
  path: TPath,
  fn: (
    c: Context<AuthType, TPath, JsonInputSchema<TSchema>>
  ) => Response | Promise<Response>,
  schema: TSchema
): [
  string,
  MiddlewareHandler,
  (c: Context) => Response | Promise<Response>
] => {
  const validator = zValidator("json", schema);
  return [path, validator, fn] as const;
};

export default function createApp() {
  const app = createRouter();

  return app;
}
