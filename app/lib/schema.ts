import { sql } from "@vercel/postgres";
import { boolean, integer, pgTable, serial, text } from "drizzle-orm/pg-core";
import { drizzle } from "drizzle-orm/vercel-postgres";

export const db = drizzle(sql);

export const WorkoutsTable = pgTable("workouts", {
  id: serial("id").primaryKey(),
  name: text("name").notNull(),
  warmup: text("warmup").notNull(),
  cooldown: text("cooldown").notNull(),
});

export const ExercisesTable = pgTable("exercises", {
  id: serial("id").primaryKey(),
  workoutId: serial("workoutId").notNull(),
  name: text("name").notNull(),
  description: text("description").notNull(),
});

export const SessionsTable = pgTable("sessions", {
  id: serial("id").primaryKey(),
  workoutId: serial("workoutId").notNull(),
});

export const SessionsExercisesTable = pgTable("sessions_exercises", {
  id: serial("id").primaryKey(),
  sessionId: serial("sessionId").notNull(),
  exerciseId: serial("exerciseId").notNull(),
  weight: text("weight"),
  reps: integer("reps"),
  notes: text("notes"),
  isComplete: boolean("isComplete").notNull().default(false),
});
