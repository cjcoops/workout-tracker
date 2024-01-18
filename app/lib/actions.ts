"use server";

import { z } from "zod";
import { db } from "@vercel/postgres";
import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";
import { Session } from "./definitions";
import { log } from "console";

export async function createSession(workoutId: string) {
  const client = await db.connect();

  let sessionId = "";

  try {
    const data = await client.sql<Session>`
    INSERT INTO sessions (workout_id)
    VALUES (${workoutId})
    RETURNING id
  `;

    sessionId = data.rows[0].id;

    log("Session ID:", sessionId);

    await client.sql`
    INSERT INTO session_exercises (session_id, exercise_id)
    SELECT ${sessionId}, id 
    FROM exercises 
    WHERE workout_id = ${workoutId}
  `;
  } catch (error) {
    return {
      message: "Database Error: Failed to Create Session.",
    };
  }

  redirect(`/sessions/${sessionId}`);
}