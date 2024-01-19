import {
  pgTable,
  serial,
  text,
  timestamp,
  uniqueIndex,
} from "drizzle-orm/pg-core";
import { InferSelectModel, InferInsertModel } from "drizzle-orm";
import { sql } from "@vercel/postgres";
import { drizzle } from "drizzle-orm/vercel-postgres";

export const WorkoutsTable = pgTable("workouts", {
  id: serial("id").primaryKey(),
  name: text("name").notNull(),
  warmup: text("warmup").notNull(),
  cooldown: text("cooldown").notNull(),
});

export type Workout = InferSelectModel<typeof WorkoutsTable>;
export type NewWorkout = InferInsertModel<typeof WorkoutsTable>;

// Connect to Vercel Postgres
export const db = drizzle(sql);
