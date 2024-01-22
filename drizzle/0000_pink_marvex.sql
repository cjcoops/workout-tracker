CREATE TABLE IF NOT EXISTS "exercises" (
	"id" serial PRIMARY KEY NOT NULL,
	"workoutId" serial NOT NULL,
	"name" text NOT NULL,
	"description" text NOT NULL
);
--> statement-breakpoint
CREATE TABLE IF NOT EXISTS "sessions_exercises" (
	"id" serial PRIMARY KEY NOT NULL,
	"sessionId" serial NOT NULL,
	"exerciseId" serial NOT NULL,
	"weight" text,
	"reps" integer,
	"notes" text,
	"isComplete" boolean DEFAULT false NOT NULL
);
--> statement-breakpoint
CREATE TABLE IF NOT EXISTS "sessions" (
	"id" serial PRIMARY KEY NOT NULL,
	"workoutId" serial NOT NULL
);
--> statement-breakpoint
CREATE TABLE IF NOT EXISTS "workouts" (
	"id" serial PRIMARY KEY NOT NULL,
	"name" text NOT NULL,
	"warmup" text NOT NULL,
	"cooldown" text NOT NULL
);
