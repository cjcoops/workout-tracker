"use server";

import { z } from "zod";
import { sql } from "@vercel/postgres";
import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";
import { log } from "console";
import { drizzle } from "drizzle-orm/vercel-postgres";
import {
  ExercisesTable,
  SessionsExercisesTable,
  SessionsTable,
} from "./schema";
import { eq } from "drizzle-orm";

export async function createSession(workoutId: number) {
  const db = drizzle(sql);

  let sessionId: number;

  try {
    const insertedSession = await db
      .insert(SessionsTable)
      .values({
        workoutId,
      })
      .returning();

    sessionId = insertedSession[0].id;

    const exercises = await db
      .select()
      .from(ExercisesTable)
      .where(eq(ExercisesTable.workoutId, workoutId));

    await db
      .insert(SessionsExercisesTable)
      .values(
        exercises.map((exercise) => ({ sessionId, exerciseId: exercise.id })),
      );
  } catch (error) {
    return {
      message: "Database Error: Failed to Create Session.",
    };
  }

  redirect(`/sessions/${sessionId}`);
}

export async function updateSessionExercise() {}
