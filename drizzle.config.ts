import type { Config } from "drizzle-kit";
export default {
  schema: "./app/lib/schema.ts",
  out: "./drizzle",
} satisfies Config;
