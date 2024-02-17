import { ExercisesTable, SessionsExercisesTable } from "./schema";
import { WorkoutsTable } from "./schema";

import { InferInsertModel, InferSelectModel } from "drizzle-orm";

export type Workout = InferSelectModel<typeof WorkoutsTable>;
export type NewWorkout = InferInsertModel<typeof WorkoutsTable>;
export type Exercise = InferSelectModel<typeof ExercisesTable>;
export type NewExercise = InferInsertModel<typeof ExercisesTable>;
export type SessionExercise = InferSelectModel<typeof SessionsExercisesTable>;

export type SessionExerciseView = Omit<SessionExercise, "exerciseId"> &
  Pick<Exercise, "name" | "description">;

// Define User type explicitly rather than inferring due to https://github.com/drizzle-team/drizzle-orm/issues/663
export type User = {
  id: string;
  name: string;
  email: string;
  password: string;
};
