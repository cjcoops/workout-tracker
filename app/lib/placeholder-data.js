const workouts = [
  {
    id: "5dd9cd5f-3331-4823-958d-41bf97b5733b",
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
    id: "522f479c-2922-4120-8f0b-838f929ebb48",
    name: "Vol 44 - Day 2",
    warmup: `1. Tall heel sit hands clasped, neck nods (5x) and turns (5x each side)
    2. Half kneeling wall hip rotations (6x each side)
    3. Single leg glut bridge (5x each side with a 2 second pause at the top)
    4. Spiderman lunge with ER ISO Hold (20-30s each side)`,
    cooldown: ``,
  },
  {
    id: "97c30dac-a141-4b06-b84f-cfae3c90613b",
    name: "Vol 44 - Day 3",
    warmup: `1. Tall heel sit hands clasped, neck nods (5x) and turns (5x each side)
    2. Half kneeling wall hip rotations (6x each side)
    3. Single leg glut bridge (5x each side with a 2 second pause at the top)
    4. Spiderman lunge with ER ISO Hold (20-30s each side)`,
    cooldown: ``,
  },
  {
    id: "198af334-8913-4b92-915f-a4e49e2bd9a9",
    name: "Vol 44 - Day 4",
    warmup: `1. Tall heel sit hands clasped, neck nods (5x) and turns (5x each side)
    2. Half kneeling wall hip rotations (6x each side)
    3. Single leg glut bridge (5x each side with a 2 second pause at the top)
    4. Spiderman lunge with ER ISO Hold (20-30s each side)`,
    cooldown: ``,
  },
];

const exercises = [
  {
    id: "f62f295e-99ca-459f-ac50-5e7c46ad29ba",
    workout_id: workouts[0].id,
    name: "A. Squat Jump",
    description: "3 set of 5 reps, 30 seconds between sets",
  },
  {
    id: "d11b3927-7127-461a-8480-224c20bd799b",
    workout_id: workouts[0].id,
    name: "B1. Goblet Squats",
    description: "4 sets of 6 at a 7 RPE. Superset with B2",
  },
  {
    id: "8ba163e3-9cb4-4fe0-8a9e-3212c8f1b3e3",
    workout_id: workouts[0].id,
    name: "B2. 1DB Seated External Rotation",
    description: "3 sets of 10 each side at a 6-7 RPE",
  },
];

module.exports = {
  workouts,
  exercises,
};
