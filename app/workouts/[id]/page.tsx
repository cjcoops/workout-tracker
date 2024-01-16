import { fetchWorkoutById } from "@/lib/data";
import { log } from "console";
import { Button } from "@/components/ui/button";
import Exercise from "@/components/workouts/exercise";

export default async function Page({ params }: { params: { id: string } }) {
  const id = params.id;
  const workout = await fetchWorkoutById(id);
  log(workout);
  return (
    <main>
      <div className="flex flex-col gap-4 p-4">
        <h1 className="text-2xl font-bold">{workout.name}</h1>
        <div className="rounded-md bg-gray-100 p-4 dark:bg-gray-800">
          <h2 className="mb-2 text-xl font-semibold">Warmup Exercises</h2>
          <div className="grid gap-4">
            <div className="flex items-center gap-4">
              <ActivityIcon className="h-6 w-6" />
              <div className="flex flex-col">
                <h3 className="font-semibold">Jumping Jacks</h3>
                <p className="text-sm text-gray-500 dark:text-gray-400">
                  A full body exercise that increases your heart rate and
                  prepares your muscles for workout.
                </p>
              </div>
            </div>
            <div className="flex items-center gap-4">
              <ActivityIcon className="h-6 w-6" />
              <div className="flex flex-col">
                <h3 className="font-semibold">High Knees</h3>
                <p className="text-sm text-gray-500 dark:text-gray-400">
                  A cardio-intensive exercise that strengthens your core and
                  improves your agility.
                </p>
              </div>
            </div>
            <div className="flex items-center gap-4">
              <ActivityIcon className="h-6 w-6" />
              <div className="flex flex-col">
                <h3 className="font-semibold">Arm Circles</h3>
                <p className="text-sm text-gray-500 dark:text-gray-400">
                  A simple exercise to warm up your arms and shoulders.
                </p>
              </div>
            </div>
          </div>
        </div>
        <div className="mt-4 grid gap-4">
          {workout.exercises.map((exercise) => (
            <Exercise key={exercise.id} exercise={exercise} />
          ))}
        </div>

        <Button className="mt-4">Start Workout</Button>
      </div>
    </main>
  );
}

function ActivityIcon(props: React.HTMLAttributes<HTMLOrSVGElement>) {
  return (
    <svg
      {...props}
      xmlns="http://www.w3.org/2000/svg"
      width="24"
      height="24"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <path d="M22 12h-4l-3 9L9 3l-3 9H2" />
    </svg>
  );
}
