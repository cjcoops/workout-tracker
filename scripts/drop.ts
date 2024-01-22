import { sql } from "@vercel/postgres";
import { drizzle } from "drizzle-orm/vercel-postgres";
import { sql as drizzleSql } from "drizzle-orm";

async function main() {
  const db = drizzle(sql);

  try {
    await db.execute(drizzleSql`
        DROP TABLE sessions_exercises;
        DROP TABLE sessions;
        DROP TABLE exercises;
        DROP TABLE workouts;
    `);
  } catch (error) {
    console.error("Error dropping tables:", error);
    throw error;
  }

  await sql.end();
}

main().catch((err) => {
  console.error(
    "An error occurred while attempting to drop the databases:",
    err,
  );
});
