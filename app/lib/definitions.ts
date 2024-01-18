export type Workout = {
  id: string;
  name: string;
  warmup: string;
  cooldown: string;
};

export type Exercise = {
  id: string;
  name: string;
  description: string;
};

export type Session = {
  id: string;
  workout_id: string;
};

export type SessionExercise = {
  id: string;
  // session_id: string;
  // exercise_id: string;
  name: string;
  description: string;
  reps: number;
  weight: string;
  notes: string;
  is_complete: boolean;
};
