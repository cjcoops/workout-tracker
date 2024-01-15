import { sql } from "@vercel/postgres";
import { Exercise, Workout } from "./definitions";

// TODO: Use no store from next/cache

export async function fetchWorkouts() {
  try {
    const data = await sql<Workout>`
        SELECT id, name from workouts
    `;
    return data.rows.map((row) => {
      return {
        id: row.id,
        name: row.name,
      };
    });
  } catch (error) {
    console.error("Database Error:", error);
    throw new Error("Failed to fetch workouts data.");
  }
}

export async function fetchWorkoutById(id: string) {
  try {
    const [workout, exercises] = await Promise.all([
      sql<Workout>`SELECT id, name from workouts WHERE id = ${id}`,
      sql<Exercise>`
          SELECT id, name, description from exercises
          WHERE workout_id = ${id}
        `,
    ]);

    return {
      id: workout.rows[0].id,
      name: workout.rows[0].name,
      exercises: exercises.rows.map((row) => {
        return {
          id: row.id,
          name: row.name,
          description: row.description,
        };
      }),
    };
  } catch (error) {
    console.error("Database Error:", error);
    throw new Error("Failed to fetch workout.");
  }
}
