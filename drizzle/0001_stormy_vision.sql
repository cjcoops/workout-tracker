CREATE TABLE IF NOT EXISTS "exercises" (
	"id" serial PRIMARY KEY NOT NULL,
	"workout_id" serial NOT NULL,
	"name" text NOT NULL,
	"description" text NOT NULL
);
