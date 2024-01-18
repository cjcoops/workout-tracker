const { db } = require("@vercel/postgres");
const { workouts, exercises } = require("../app/lib/placeholder-data.js");

async function seedWorkouts(client) {
  try {
    await client.sql`CREATE EXTENSION IF NOT EXISTS "uuid-ossp"`;
    const createTable = await client.sql`
      CREATE TABLE IF NOT EXISTS workouts (
        id UUID DEFAULT uuid_generate_v4() PRIMARY KEY,
        name VARCHAR(50) NOT NULL,
        warmup TEXT,
        cooldown TEXT
      );
    `;

    console.log(`Created "workouts" table`);

    const insertedworkouts = await Promise.all(
      workouts.map(async (workout) => {
        return client.sql`
        INSERT INTO workouts (id, name, warmup, cooldown)
        VALUES (${workout.id}, ${workout.name}, ${workout.warmup}, ${workout.cooldown})
        ON CONFLICT (id) DO NOTHING;
      `;
      }),
    );

    console.log(`Seeded ${insertedworkouts.length} workouts`);

    return {
      createTable,
      workouts: insertedworkouts,
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
      exercises: insertedExercises,
    };
  } catch (error) {
    console.error("Error seeding exercises:", error);
    throw error;
  }
}

async function seedSessions(client) {
  try {
    const createTable = await client.sql`
      CREATE TABLE IF NOT EXISTS sessions (
        id UUID DEFAULT uuid_generate_v4() PRIMARY KEY,
        workout_id UUID NOT NULL
      );
    `;

    console.log(`Created "sessions" table`);

    return {
      createTable,
    };
  } catch (error) {
    console.error("Error seeding sessions:", error);
    throw error;
  }
}

async function seedSessionExercises(client) {
  try {
    const createTable = await client.sql`
      CREATE TABLE IF NOT EXISTS session_exercises (
        id UUID DEFAULT uuid_generate_v4() PRIMARY KEY,
        session_id UUID NOT NULL,
        exercise_id UUID NOT NULL,
        weight VARCHAR(50) NULL,
        notes TEXT NULL,
        reps INT NULL,
        is_complete BOOLEAN DEFAULT false
      );
    `;

    console.log(`Created "session exercises" table`);

    return {
      createTable,
    };
  } catch (error) {
    console.error("Error seeding session exercises:", error);
    throw error;
  }
}

async function main() {
  const client = await db.connect();

  await seedWorkouts(client);
  await seedExercises(client);
  await seedSessions(client);
  await seedSessionExercises(client);

  await client.end();
}

main().catch((err) => {
  console.error(
    "An error occurred while attempting to seed the database:",
    err,
  );
});
