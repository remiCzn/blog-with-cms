import z from "zod";

const envSchema = z.object({
  DATABASE_URL: z.string(),
  PORT: z.coerce.number(),
  NODE_ENV: z.enum(["development", "production"]).default("development"),
});

const envParsed = envSchema.safeParse(process.env);

if (!envParsed.success) {
  throw new Error(`Invalid environment variables: ${envParsed.error.message}`);
}

export const env = envParsed.data;
