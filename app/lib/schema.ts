import { sql } from "@vercel/postgres";
import { relations } from "drizzle-orm";
import { boolean, integer, pgTable, serial, text } from "drizzle-orm/pg-core";
import { drizzle } from "drizzle-orm/vercel-postgres";

export const db = drizzle(sql);

export const WorkoutsTable = pgTable("workouts", {
  id: serial("id").primaryKey(),
  name: text("name").notNull(),
  warmup: text("warmup").notNull(),
  cooldown: text("cooldown").notNull(),
});

export const workoutsRelations = relations(WorkoutsTable, ({ many }) => ({
  exercises: many(ExercisesTable),
  sessions: many(SessionsTable),
}));

export const ExercisesTable = pgTable("exercises", {
  id: serial("id").primaryKey(),
  workoutId: integer("workoutId").notNull(),
  name: text("name").notNull(),
  description: text("description").notNull(),
});

export const exercisesRelations = relations(ExercisesTable, ({ one }) => ({
  workout: one(WorkoutsTable, {
    fields: [ExercisesTable.workoutId],
    references: [WorkoutsTable.id],
  }),
}));

export const SessionsTable = pgTable("sessions", {
  id: serial("id").primaryKey(),
  workoutId: integer("workoutId").notNull(),
  isComplete: boolean("isComplete").default(false),
});

export const sessionsRelations = relations(SessionsTable, ({ one, many }) => ({
  workout: one(WorkoutsTable, {
    fields: [SessionsTable.workoutId],
    references: [WorkoutsTable.id],
  }),
  sessionExercises: many(SessionsExercisesTable),
}));

export const SessionsExercisesTable = pgTable("sessions_exercises", {
  id: serial("id").primaryKey(),
  sessionId: integer("sessionId").notNull(),
  exerciseId: integer("exerciseId").notNull(),
  weight: text("weight").default(""),
  reps: integer("reps").default(0),
  notes: text("notes").default(""),
  isComplete: boolean("isComplete").notNull().default(false),
});

export const sessionExercisesRelations = relations(
  SessionsExercisesTable,
  ({ one }) => ({
    session: one(SessionsTable, {
      fields: [SessionsExercisesTable.sessionId],
      references: [SessionsTable.id],
    }),
    exercise: one(ExercisesTable, {
      fields: [SessionsExercisesTable.exerciseId],
      references: [ExercisesTable.id],
    }),
  }),
);
