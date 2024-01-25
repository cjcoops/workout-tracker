import { sql } from "@vercel/postgres";
import { drizzle } from "drizzle-orm/vercel-postgres";
import { ExercisesTable, SessionsTable, WorkoutsTable } from "./schema";
import * as schema from "./schema";

import { and, eq, max } from "drizzle-orm";
import { log } from "console";
import { SessionExercise } from "./definitions";

// TODO: Use no store from next/cache

const db = drizzle(sql, { schema });

export async function fetchWorkouts() {
  try {
    const subquery = db
      .select({
        lastCompleted: max(SessionsTable.updatedAt).as("lastCompleted"),
        workoutId: SessionsTable.workoutId,
      })
      .from(SessionsTable)
      .groupBy(SessionsTable.workoutId)
      .where(and(eq(SessionsTable.isComplete, true)))
      .as("subquery");

    const result = await db
      .select({
        id: WorkoutsTable.id,
        name: WorkoutsTable.name,
        lastCompleted: subquery.lastCompleted,
      })
      .from(WorkoutsTable)
      .leftJoin(subquery, eq(WorkoutsTable.id, subquery.workoutId));

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

export async function fetchIncompleteSessions() {
  try {
    const result = await db.query.SessionsTable.findMany({
      where: eq(SessionsTable.isComplete, false),
      with: {
        workout: true,
      },
    });

    return result;
  } catch (error) {
    console.error("Database Error:", error);
    throw new Error("Failed to fetch incomplete sessions.");
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

export async function fetchExerciseHistory(sessionExerciseId: number) {
  try {
    const targetSessionExercise =
      await db.query.SessionsExercisesTable.findFirst({
        where: (sessionExercises, { eq }) =>
          eq(sessionExercises.id, sessionExerciseId),
      });

    if (!targetSessionExercise) {
      throw new Error("Session exercise not found");
    }

    const result = await db.query.SessionsExercisesTable.findMany({
      where: (sessionExercises, { eq, and, not }) =>
        and(
          eq(sessionExercises.exerciseId, targetSessionExercise.exerciseId),
          eq(sessionExercises.isComplete, true),
          not(eq(sessionExercises.id, sessionExerciseId)),
        ),
      orderBy: (sessionExercises, { desc }) => [
        desc(sessionExercises.updatedAt),
      ],
      limit: 3,
    });

    return result
      .map((sessionExercise) =>
        stringifySessionExerciseResults(sessionExercise),
      )
      .toReversed();
  } catch (error) {
    console.error("Database Error:", error);
    throw new Error("Failed to fetch exercise history.");
  }
}
