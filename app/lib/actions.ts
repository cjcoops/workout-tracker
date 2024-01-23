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
  WorkoutsTable,
} from "./schema";
import { eq } from "drizzle-orm";
import { NewExercise, NewWorkout } from "./definitions";

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
  sessionId: z.coerce.number(),
  sessionExerciseId: z.coerce.number(),
});

export async function updateSessionExercise(
  prevState: any,
  formData: FormData,
) {
  const validatedFields = schema.safeParse({
    reps: formData.get("reps"),
    weight: formData.get("weight"),
    notes: formData.get("notes"),
    sessionId: formData.get("sessionId"),
    sessionExerciseId: formData.get("sessionExerciseId"),
  });

  if (!validatedFields.success) {
    console.log(validatedFields.error.flatten().fieldErrors);

    return {
      errors: validatedFields.error.flatten().fieldErrors,
    };
  }

  const { reps, weight, notes, sessionId, sessionExerciseId } =
    validatedFields.data;

  try {
    await db
      .update(SessionsExercisesTable)
      .set({ reps, weight, notes, isComplete: true })
      .where(eq(SessionsExercisesTable.id, sessionExerciseId));
  } catch (error) {
    return { message: "Database Error: Failed to Update Session Exercise." };
  }

  revalidatePath(`/sessions/${sessionId}`);
}

const FormSchema = z.object({
  id: z.string(),
  customerId: z.string({
    invalid_type_error: "Please select a customer.",
  }),
  amount: z.coerce
    .number()
    .gt(0, { message: "Please enter an amount greater than $0." }),
  status: z.enum(["pending", "paid"], {
    invalid_type_error: "Please select an invoice `status.",
  }),
  date: z.string(),
});

const CreateInvoice = FormSchema.omit({ id: true, date: true });
const UpdateInvoice = FormSchema.omit({ id: true, date: true });

export type State = {
  errors?: {
    customerId?: string[];
    amount?: string[];
    status?: string[];
  };
  message?: string | null;
};

const NewWorkoutSchema = z.object({
  name: z.string(),
  warmup: z.string(),
  cooldown: z.string(),
});

const NewExerciseSchema = z.object({
  name: z.string(),
  description: z.string(),
});

export async function createWorkout(prevState: any, formData: FormData) {
  // TODO: Proper error handling
  const validatedWorkout = NewWorkoutSchema.safeParse({
    name: formData.get("name"),
    warmup: formData.get("warmup"),
    cooldown: formData.get("cooldown"),
  });

  if (!validatedWorkout.success) {
    return {
      errors: validatedWorkout.error.flatten().fieldErrors,
      message: "Missing Fields. Failed to create workout",
    };
  }

  const exerciseNames = formData.getAll("exerciseName");
  const exerciseDescriptions = formData.getAll("exerciseDescription");

  const exercises: { name: string; description: string }[] = [];

  exerciseNames.forEach((name, index) => {
    exercises.push({
      name: name.toString(),
      description: exerciseDescriptions[index].toString(),
    });
  });

  const validatedExercises = z.array(NewExerciseSchema).safeParse(exercises);

  if (!validatedExercises.success) {
    return {
      errors: validatedExercises.error.flatten().fieldErrors,
      message: "Missing Fields. Failed to create workout",
    };
  }

  try {
    const workoutId = await db
      .insert(WorkoutsTable)
      .values(validatedWorkout.data)
      .returning()
      .then((data) => data[0].id);

    await db
      .insert(ExercisesTable)
      .values(
        validatedExercises.data.map((exercise) => ({ ...exercise, workoutId })),
      );
  } catch (error) {
    return { message: "Database Error: Failed to Create Workout" };
  }

  revalidatePath("/workouts");
  redirect("/workouts");
}
