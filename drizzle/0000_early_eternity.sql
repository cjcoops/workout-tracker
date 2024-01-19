CREATE TABLE IF NOT EXISTS "workouts" (
	"id" serial PRIMARY KEY NOT NULL,
	"name" text NOT NULL,
	"warmup" text NOT NULL,
	"cooldown" text NOT NULL
);
