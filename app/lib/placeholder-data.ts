import { Exercise } from "./definitions";
import { Workout } from "./definitions";

export const workouts: Omit<Workout, "createdAt" | "updatedAt">[] = [
  {
    id: 1,
    name: "Vol 44 - Day 1",
    warmup: `1. Tall heel sit hands clasped, neck nods (5x) and turns (5x each side)
    2. Half kneeling wall hip rotations (6x each side)
    3. Single leg glut bridge (5x each side with a 2 second pause at the top)
    4. Spiderman lunge with ER ISO Hold (20-30s each side)
    5. Side lying hip abduction (10x each side)`,
    cooldown: `1. Standing quad stretch (45s each side)
    2. Overhead tricep stretch (45s each side)
    3. Bench straight arm t-spine extension (45s in bottom position)`,
  },
  {
    id: 2,
    name: "Vol 44 - Day 2",
    warmup: `1. Tall heel sit hands clasped, neck nods (5x) and turns (5x each side)
    2. Half kneeling wall hip rotations (6x each side)
    3. Single leg glut bridge (5x each side with a 2 second pause at the top)
    4. Spiderman lunge with ER ISO Hold (20-30s each side)`,
    cooldown: ``,
  },
  {
    id: 3,
    name: "Vol 44 - Day 3",
    warmup: `1. Tall heel sit hands clasped, neck nods (5x) and turns (5x each side)
    2. Half kneeling wall hip rotations (6x each side)
    3. Single leg glut bridge (5x each side with a 2 second pause at the top)
    4. Spiderman lunge with ER ISO Hold (20-30s each side)`,
    cooldown: ``,
  },
  {
    id: 4,
    name: "Vol 44 - Day 4",
    warmup: `1. Tall heel sit hands clasped, neck nods (5x) and turns (5x each side)
    2. Half kneeling wall hip rotations (6x each side)
    3. Single leg glut bridge (5x each side with a 2 second pause at the top)
    4. Spiderman lunge with ER ISO Hold (20-30s each side)`,
    cooldown: ``,
  },
];

export const exercises: Omit<Exercise, "createdAt" | "updatedAt">[] = [
  {
    id: 1,
    workoutId: workouts[0].id,
    name: "A. Squat Jump",
    description: "3 set of 5 reps, 30 seconds between sets",
  },
  {
    id: 2,
    workoutId: workouts[0].id,
    name: "B1. Goblet Squats",
    description: "4 sets of 6 at a 7 RPE. Superset with B2",
  },
  {
    id: 3,
    workoutId: workouts[0].id,
    name: "B2. 1DB Seated External Rotation",
    description: "3 sets of 10 each side at a 6-7 RPE",
  },
];
