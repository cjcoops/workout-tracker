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

const db = drizzle(sql);

export async function createSession(workoutId: number) {
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

const schema = z.object({
  reps: z.coerce.number(),
  weight: z.string(),
  notes: z.string(),
});

export async function updateSessionExercise(
  sessionExerciseId: number,
  prevState: any,
  formData: FormData,
) {
  const validatedFields = schema.safeParse({
    reps: formData.get("reps"),
    weight: formData.get("weight"),
    notes: formData.get("notes"),
  });

  if (!validatedFields.success) {
    console.log(validatedFields.error.flatten().fieldErrors);

    return {
      errors: validatedFields.error.flatten().fieldErrors,
    };
  }

  console.log(validatedFields.data);

  try {
    await db
      .update(SessionsExercisesTable)
      .set({ ...validatedFields.data, isComplete: true })
      .where(eq(SessionsExercisesTable.id, sessionExerciseId));
  } catch (error) {
    return { message: "Database Error: Failed to Update Session Exercise." };
  }

  revalidatePath("/sessions/2");
}
