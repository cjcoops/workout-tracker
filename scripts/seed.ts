import { VercelClient, VercelPoolClient, createClient } from "@vercel/postgres";

import { exercises, workouts } from "../app/lib/placeholder-data";
import {
  Exercise,
  ExercisesTable,
  Workout,
  WorkoutsTable,
  db,
} from "@/lib/schema";

async function seedWorkouts() {
  try {
    const insertedWorkouts: Workout[] = await db
      .insert(WorkoutsTable)
      .values(workouts)
      .returning()
      .onConflictDoNothing();

    console.log(`Seeded ${insertedWorkouts.length} workouts`);

    return {
      insertedWorkouts,
    };
  } catch (error) {
    console.error("Error seeding workouts:", error);
    throw error;
  }
}

async function seedExercises() {
  try {
    const insertedExercises: Exercise[] = await db
      .insert(ExercisesTable)
      .values(exercises)
      .returning()
      .onConflictDoNothing();

    console.log(`Seeded ${insertedExercises.length} exercises`);

    return {
      insertedExercises,
    };
  } catch (error) {
    console.error("Error seeding exercises:", error);
    throw error;
  }
}

async function main() {
  await seedWorkouts();
  await seedExercises();
}

main().catch((err) => {
  console.error(
    "An error occurred while attempting to seed the database:",
    err,
  );
});
