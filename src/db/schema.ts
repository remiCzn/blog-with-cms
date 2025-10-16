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
