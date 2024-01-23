import { sql } from "@vercel/postgres";
import { drizzle } from "drizzle-orm/vercel-postgres";
import {
  ExercisesTable,
  SessionsExercisesTable,
  SessionsTable,
  WorkoutsTable,
} from "./schema";
import * as schema from "./schema";

import { eq } from "drizzle-orm";
import { log } from "console";

// TODO: Use no store from next/cache

const db = drizzle(sql, { schema });

export async function fetchWorkouts() {
  try {
    // TODO: don't need to return all columns
    const result = await db.select().from(WorkoutsTable);
    return result;
  } catch (error) {
    console.error("Database Error:", error);
    throw new Error("Failed to fetch workouts data.");
  }
}

export async function fetchWorkoutById(workoutId: number) {
  try {
    const workout = await db.query.WorkoutsTable.findFirst({
      with: {
        exercises: true,
      },
      where: eq(WorkoutsTable.id, workoutId),
    });

    return workout;
  } catch (error) {
    console.error("Database Error:", error);
    throw new Error("Failed to fetch workout.");
  }
}

export async function fetchSessionById(sessionId: number) {
  try {
    const workoutId = await db
      .select()
      .from(SessionsTable)
      .where(eq(SessionsTable.id, sessionId))
      .then((data) => {
        return data[0].workoutId;
      });

    const [workout, exercises] = await Promise.all([
      db.select().from(WorkoutsTable).where(eq(WorkoutsTable.id, workoutId)),
      db
        .select()
        .from(SessionsExercisesTable)
        .innerJoin(
          ExercisesTable,
          eq(ExercisesTable.id, SessionsExercisesTable.exerciseId),
        )
        .where(eq(SessionsExercisesTable.sessionId, sessionId)),
    ]);

    return {
      id: workout[0].id,
      name: workout[0].name,
      warmup: workout[0].warmup,
      cooldown: workout[0].cooldown,
      exercises: exercises.map((row) => {
        return {
          id: row.sessions_exercises.id,
          sessionId,
          name: row.exercises.name,
          description: row.exercises.description,
          reps: row.sessions_exercises.reps,
          weight: row.sessions_exercises.weight,
          notes: row.sessions_exercises.notes,
          isComplete: row.sessions_exercises.isComplete,
        };
      }),
    };
  } catch (error) {
    console.error("Database Error:", error);
    throw new Error("Failed to fetch session.");
  }
}
