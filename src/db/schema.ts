import {
  boolean,
  integer,
  json,
  pgEnum,
  pgTable,
  text,
  timestamp,
  uuid,
} from "drizzle-orm/pg-core";

export const contentModel = pgTable("ContentModel", {
  id: uuid().primaryKey().notNull().defaultRandom(),
  name: text().notNull(),
  slug: text().notNull().unique(),
  createdAt: timestamp().notNull().defaultNow(),
  updatedAt: timestamp()
    .notNull()
    .defaultNow()
    .$onUpdate(() => new Date()),
});

export const fieldType = pgEnum("FieldType", ["TEXT", "NUMBER", "BOOLEAN"]);

export const field = pgTable("Field", {
  id: uuid().primaryKey().notNull().defaultRandom(),
  name: text().notNull(),
  label: text().notNull(),
  type: fieldType().notNull(),
  required: boolean().notNull().default(false),
  order: integer().notNull().default(0),

  model: uuid()
    .notNull()
    .references(() => contentModel.id, { onDelete: "cascade" }),
});

export const row = pgTable("Row", {
  id: uuid().primaryKey().notNull().defaultRandom(),
  model: uuid()
    .notNull()
    .references(() => contentModel.id, { onDelete: "cascade" }),

  createdAt: timestamp().notNull().defaultNow(),
  updatedAt: timestamp()
    .notNull()
    .defaultNow()
    .$onUpdate(() => new Date()),
});

export const rowValue = pgTable("RowValue", {
  id: uuid().primaryKey().notNull().defaultRandom(),
  field: uuid()
    .notNull()
    .references(() => field.id, { onDelete: "cascade" }),
  row: uuid()
    .notNull()
    .references(() => row.id, { onDelete: "cascade" }),
  value: json(),
});

export const user = pgTable("user", {
  id: text("id").primaryKey(),
  name: text("name").notNull(),
  email: text("email").notNull().unique(),
  emailVerified: boolean("email_verified").default(false).notNull(),
  image: text("image"),
  createdAt: timestamp("created_at").defaultNow().notNull(),
  updatedAt: timestamp("updated_at")
    .defaultNow()
    .$onUpdate(() => /* @__PURE__ */ new Date())
    .notNull(),
});

export const session = pgTable("session", {
  id: text("id").primaryKey(),
  expiresAt: timestamp("expires_at").notNull(),
  token: text("token").notNull().unique(),
  createdAt: timestamp("created_at").defaultNow().notNull(),
  updatedAt: timestamp("updated_at")
    .$onUpdate(() => /* @__PURE__ */ new Date())
    .notNull(),
  ipAddress: text("ip_address"),
  userAgent: text("user_agent"),
  userId: text("user_id")
    .notNull()
    .references(() => user.id, { onDelete: "cascade" }),
});

export const account = pgTable("account", {
  id: text("id").primaryKey(),
  accountId: text("account_id").notNull(),
  providerId: text("provider_id").notNull(),
  userId: text("user_id")
    .notNull()
    .references(() => user.id, { onDelete: "cascade" }),
  accessToken: text("access_token"),
  refreshToken: text("refresh_token"),
  idToken: text("id_token"),
  accessTokenExpiresAt: timestamp("access_token_expires_at"),
  refreshTokenExpiresAt: timestamp("refresh_token_expires_at"),
  scope: text("scope"),
  password: text("password"),
  createdAt: timestamp("created_at").defaultNow().notNull(),
  updatedAt: timestamp("updated_at")
    .$onUpdate(() => /* @__PURE__ */ new Date())
    .notNull(),
});

export const verification = pgTable("verification", {
  id: text("id").primaryKey(),
  identifier: text("identifier").notNull(),
  value: text("value").notNull(),
  expiresAt: timestamp("expires_at").notNull(),
  createdAt: timestamp("created_at").defaultNow().notNull(),
  updatedAt: timestamp("updated_at")
    .defaultNow()
    .$onUpdate(() => /* @__PURE__ */ new Date())
    .notNull(),
});
