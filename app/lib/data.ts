import { sql } from "@vercel/postgres";
import { Exercise, Session, SessionExercise, Workout } from "./definitions";
import { log } from "console";
import { drizzle } from "drizzle-orm/vercel-postgres";
import { WorkoutsTable } from "./schema";

// TODO: Use no store from next/cache

export const db = drizzle(sql);

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

export async function fetchWorkoutById(workoutId: string) {
  try {
    const [workout, exercises] = await Promise.all([
      sql<Workout>`SELECT id, name, warmup, cooldown from workouts WHERE id = ${workoutId}`,
      sql<Exercise>`
          SELECT id, name, description from exercises
          WHERE workout_id = ${workoutId}
        `,
    ]);

    return {
      id: workout.rows[0].id,
      name: workout.rows[0].name,
      warmup: workout.rows[0].warmup,
      cooldown: workout.rows[0].cooldown,
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

export async function fetchSessionById(sessionId: string) {
  try {
    const workoutId = await sql<Session>`
      SELECT workout_id from sessions
      WHERE id = ${sessionId}
    `.then((data) => {
      log(data);
      return data.rows[0].workout_id;
    });

    const [workout, exercises] = await Promise.all([
      sql<Workout>`SELECT id, name, warmup, cooldown from workouts WHERE id = ${workoutId}`,
      sql<SessionExercise>`
          SELECT session_exercises.id, reps, weight, notes, is_complete, name, description from session_exercises
          INNER JOIN exercises ON session_exercises.exercise_id = exercises.id
          WHERE session_exercises.session_id = ${sessionId}
        `,
    ]);

    return {
      id: workout.rows[0].id,
      name: workout.rows[0].name,
      warmup: workout.rows[0].warmup,
      cooldown: workout.rows[0].cooldown,
      exercises: exercises.rows.map((row) => {
        return {
          id: row.id,
          name: row.name,
          description: row.description,
          reps: row.reps,
          weight: row.weight,
          notes: row.notes,
          isComplete: row.is_complete,
        };
      }),
    };
  } catch (error) {
    console.error("Database Error:", error);
    throw new Error("Failed to fetch session.");
  }
}
