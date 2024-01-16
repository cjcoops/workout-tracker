const { db } = require("@vercel/postgres");

async function main() {
  const client = await db.connect();

  try {
    await client.sql`
        DROP TABLE exercises;
        DROP TABLE workouts;
    `;
  } catch (error) {
    console.error("Error dropping tables:", error);
    throw error;
  }

  await client.end();
}

main().catch((err) => {
  console.error(
    "An error occurred while attempting to drop the databases:",
    err,
  );
});
