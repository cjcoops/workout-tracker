import { sql } from "@vercel/postgres";
import { Workout } from "./definitions";

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
    throw new Error("Failed to fetch workout data.");
  }
}
