import { fetchWorkoutById } from "@/lib/data";
import { Button } from "@/components/ui/button";
import Exercise from "@/components/workouts/exercise";
import { createSession } from "@/lib/actions";

export default async function Page({ params }: { params: { id: number } }) {
  const id = params.id;
  const workout = await fetchWorkoutById(id);

  const warmupSteps = workout.warmup.trim().split("\n");
  const cooldownSteps = workout.cooldown.trim().split("\n");

  const createSessionWithWorkoutId = createSession.bind(null, id);

  return (
    <div className="flex flex-col gap-4">
      <div className="flex items-center justify-between">
        <h1 className="text-2xl font-bold">{workout.name}</h1>
      </div>
      <form action={createSessionWithWorkoutId}>
        <Button className="w-full" type="submit">
          Start Workout
        </Button>
      </form>
      <div className="rounded-md bg-gray-100 p-4 dark:bg-gray-800">
        <div className="grid gap-4">
          <h2 className=" text-xl font-semibold">🔥 Warmup</h2>
          {warmupSteps.map((step) => (
            <div className="flex items-center gap-4" key={step}>
              <p className="text-sm text-gray-500 dark:text-gray-400">{step}</p>
            </div>
          ))}
        </div>
      </div>
      <div className="rounded-md p-4 dark:bg-gray-800">
        <div className="grid gap-4">
          <h2 className=" text-xl font-semibold">🏃 Exercises</h2>
          {workout.exercises.map((exercise) => (
            <Exercise key={exercise.id} exercise={exercise} />
          ))}
        </div>
      </div>
      <div className="rounded-md bg-gray-100 p-4 dark:bg-gray-800">
        <div className="grid gap-4">
          <h2 className=" text-xl font-semibold">❄️ Cooldown</h2>
          {cooldownSteps.map((step) => (
            <div className="flex items-center gap-4" key={step}>
              <p className="text-sm text-gray-500 dark:text-gray-400">{step}</p>
            </div>
          ))}
        </div>
      </div>

      <form action={createSessionWithWorkoutId}>
        <Button className=" w-full" type="submit">
          Start Workout
        </Button>
      </form>
    </div>
  );
}
