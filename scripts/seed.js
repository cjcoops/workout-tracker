const { db } = require("@vercel/postgres");
const {
  programs,
  days,
  exercises,
} = require("../src/app/lib/placeholder-data.js");

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

async function seedDays(client) {
  try {
    await client.sql`CREATE EXTENSION IF NOT EXISTS "uuid-ossp"`;
    const createTable = await client.sql`
      CREATE TABLE IF NOT EXISTS days (
        id UUID DEFAULT uuid_generate_v4() PRIMARY KEY,
        program_id UUID NOT NULL,
        name VARCHAR(50) NOT NULL
      );
    `;

    console.log(`Created "days" table`);

    const insertedDays = await Promise.all(
      days.map(async (day) => {
        return client.sql`
        INSERT INTO days (id, program_id, name)
        VALUES (${day.id}, ${day.progam_id} ,${day.name})
        ON CONFLICT (id) DO NOTHING;
      `;
      }),
    );

    console.log(`Seeded ${insertedDays.length} days`);

    return {
      createTable,
      programs: insertedDays,
    };
  } catch (error) {
    console.error("Error seeding days:", error);
    throw error;
  }
}

async function seedExercises(client) {
  try {
    await client.sql`CREATE EXTENSION IF NOT EXISTS "uuid-ossp"`;
    const createTable = await client.sql`
      CREATE TABLE IF NOT EXISTS exercises (
        id UUID DEFAULT uuid_generate_v4() PRIMARY KEY,
        day_id UUID NOT NULL,
        name VARCHAR(50) NOT NULL,
        description TEXT NOT NULL
      );
    `;

    console.log(`Created "exercises" table`);

    const insertedExercises = await Promise.all(
      exercises.map(async (exercise) => {
        return client.sql`
        INSERT INTO exercises (id, day_id, name, description)
        VALUES (${exercise.id}, ${exercise.day_id} ,${exercise.name}, ${exercise.description})
        ON CONFLICT (id) DO NOTHING;
      `;
      }),
    );

    console.log(`Seeded ${insertedExercises.length} exercises`);

    return {
      createTable,
      programs: insertedExercises,
    };
  } catch (error) {
    console.error("Error seeding exercises:", error);
    throw error;
  }
}

async function main() {
  const client = await db.connect();

  await seedPrograms(client);
  await seedDays(client);
  await seedExercises(client);

  await client.end();
}

main().catch((err) => {
  console.error(
    "An error occurred while attempting to seed the database:",
    err,
  );
});
