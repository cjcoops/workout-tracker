import { ExercisesTable, SessionsExercisesTable } from "./schema";
import { WorkoutsTable } from "./schema";

import { InferSelectModel } from "drizzle-orm";

export type Workout = InferSelectModel<typeof WorkoutsTable>;
export type Exercise = InferSelectModel<typeof ExercisesTable>;
export type SessionExercise = InferSelectModel<typeof SessionsExercisesTable>;

export type SessionExerciseView = Omit<
  SessionExercise,
  "sessionId" | "exerciseId"
> &
  Pick<Exercise, "name" | "description">;
