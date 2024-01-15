const { db } = require("@vercel/postgres");
const { workouts, exercises } = require("../src/app/lib/placeholder-data.js");

async function seedWorkouts(client) {
  try {
    await client.sql`CREATE EXTENSION IF NOT EXISTS "uuid-ossp"`;
    const createTable = await client.sql`
      CREATE TABLE IF NOT EXISTS workouts (
        id UUID DEFAULT uuid_generate_v4() PRIMARY KEY,
        name VARCHAR(50) NOT NULL
      );
    `;

    console.log(`Created "workouts" table`);

    const insertedworkouts = await Promise.all(
      workouts.map(async (workout) => {
        return client.sql`
        INSERT INTO workouts (id, name)
        VALUES (${workout.id}, ${workout.name})
        ON CONFLICT (id) DO NOTHING;
      `;
      }),
    );

    console.log(`Seeded ${insertedworkouts.length} workouts`);

    return {
      createTable,
      programs: insertedworkouts,
    };
  } catch (error) {
    console.error("Error seeding workouts:", error);
    throw error;
  }
}

async function seedExercises(client) {
  try {
    await client.sql`CREATE EXTENSION IF NOT EXISTS "uuid-ossp"`;
    const createTable = await client.sql`
      CREATE TABLE IF NOT EXISTS exercises (
        id UUID DEFAULT uuid_generate_v4() PRIMARY KEY,
        workout_id UUID NOT NULL,
        name VARCHAR(50) NOT NULL,
        description TEXT NOT NULL
      );
    `;

    console.log(`Created "exercises" table`);

    const insertedExercises = await Promise.all(
      exercises.map(async (exercise) => {
        return client.sql`
        INSERT INTO exercises (id, workout_id, name, description)
        VALUES (${exercise.id}, ${exercise.workout_id} ,${exercise.name}, ${exercise.description})
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

  await seedWorkouts(client);
  await seedExercises(client);

  await client.end();
}

main().catch((err) => {
  console.error(
    "An error occurred while attempting to seed the database:",
    err,
  );
});
