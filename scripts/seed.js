const { db } = require("@vercel/postgres");
const { programs } = require("../src/app/lib/placeholder-data.js");

async function seedPrograms(client) {
  try {
    await client.sql`CREATE EXTENSION IF NOT EXISTS "uuid-ossp"`;
    // Create the "programs" table if it doesn't exist
    const createTable = await client.sql`
      CREATE TABLE IF NOT EXISTS programs (
        id UUID DEFAULT uuid_generate_v4() PRIMARY KEY,
        name VARCHAR(50) NOT NULL
      );
    `;

    console.log(`Created "programs" table`);

    // Insert data into the "programs" table
    const insertedPrograms = await Promise.all(
      programs.map(async (user) => {
        return client.sql`
        INSERT INTO programs (id, name)
        VALUES (${user.id}, ${user.name})
        ON CONFLICT (id) DO NOTHING;
      `;
      }),
    );

    console.log(`Seeded ${insertedPrograms.length} programs`);

    return {
      createTable,
      programs: insertedPrograms,
    };
  } catch (error) {
    console.error("Error seeding programs:", error);
    throw error;
  }
}

async function main() {
  const client = await db.connect();

  await seedPrograms(client);

  await client.end();
}

main().catch((err) => {
  console.error(
    "An error occurred while attempting to seed the database:",
    err,
  );
});
