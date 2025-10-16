import { drizzle } from "drizzle-orm/node-postgres";
import createLib from "../utils/createLib";
import * as schema from "../db/schema";

const db = createLib(
  () =>
    drizzle({
      connection: {
        connectionString: process.env.DATABASE_URL,
        ssl: false,
      },
      schema,
    }),
  "db"
);

export default db;
