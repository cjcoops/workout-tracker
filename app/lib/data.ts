import { sql } from "@vercel/postgres";
import { drizzle } from "drizzle-orm/vercel-postgres";
import { ExercisesTable, SessionsTable, WorkoutsTable } from "./schema";
import * as schema from "./schema";

import { eq } from "drizzle-orm";
import { log } from "console";
import { SessionExercise } from "./definitions";

// TODO: Use no store from next/cache

const db = drizzle(sql, { schema });

export async function fetchWorkouts() {
  try {
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

    if (!workout) {
      throw new Error("Workout not found");
    }

    return workout;
  } catch (error) {
    console.error("Database Error:", error);
    throw new Error("Failed to fetch workout.");
  }
}

export async function fetchSessionById(sessionId: number) {
  try {
    const session = await db.query.SessionsTable.findFirst({
      where: eq(SessionsTable.id, sessionId),
      with: {
        sessionExercises: {
          with: {
            exercise: true,
          },
          orderBy: (sessionExercises, { asc }) => [asc(sessionExercises.id)],
        },
        workout: true,
      },
    });

    if (!session) {
      throw new Error("Session not found");
    }

    return session;
  } catch (error) {
    console.error("Database Error:", error);
    throw new Error("Failed to fetch session.");
  }
}

function stringifySessionExerciseResults(sessionExercise: SessionExercise) {
  const results: string[] = [];

  if (sessionExercise.reps) {
    results.push(`${sessionExercise.reps} reps`);
  }

  if (sessionExercise.weight) {
    results.push(`@ ${sessionExercise.weight}`);
  }

  if (sessionExercise.notes) {
    results.push(`${sessionExercise.notes}`);
  }

  return results.join(" | ");
}

export async function fetchExerciseHistory(exerciseId: number) {
  try {
    const result = await db.query.SessionsExercisesTable.findMany({
      where: (sessionExercises, { eq, and }) =>
        and(
          eq(sessionExercises.exerciseId, exerciseId),
          eq(sessionExercises.isComplete, true),
          // TODO: Don't return this session exercise, only return session exercises completed before this one, order
        ),
      limit: 3,
    });

    return result.map((sessionExercise) =>
      stringifySessionExerciseResults(sessionExercise),
    );
  } catch (error) {
    console.error("Database Error:", error);
    throw new Error("Failed to fetch exercise history.");
  }
}
