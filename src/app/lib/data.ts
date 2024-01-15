import { sql } from "@vercel/postgres";
import { Day, Program } from "./definitions";

// TODO: Use no store from next/cache

export async function fetchPrograms() {
  try {
    const data = await sql<Program>`SELECT * from programs`;
    return data.rows;
  } catch (error) {
    console.error("Database Error:", error);
    throw new Error("Failed to fetch program data.");
  }
}

export async function fetchDays() {
  try {
    const data = await sql<Day>`
        SELECT days.id, days.name AS day_name, programs.name AS program_name from days
        JOIN programs ON days.program_id = programs.id
    `;
    return data.rows.map((row) => {
      return {
        id: row.id,
        dayName: row.day_name,
        programName: row.program_name,
        displayName: `${row.program_name} - ${row.day_name}`,
      };
    });
  } catch (error) {
    console.error("Database Error:", error);
    throw new Error("Failed to fetch day data.");
  }
}
