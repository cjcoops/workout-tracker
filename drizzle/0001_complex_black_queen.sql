ALTER TABLE "exercises" ALTER COLUMN "workoutId" SET DATA TYPE integer;--> statement-breakpoint
ALTER TABLE "sessions_exercises" ALTER COLUMN "sessionId" SET DATA TYPE integer;--> statement-breakpoint
ALTER TABLE "sessions_exercises" ALTER COLUMN "exerciseId" SET DATA TYPE integer;--> statement-breakpoint
ALTER TABLE "sessions" ALTER COLUMN "workoutId" SET DATA TYPE integer;