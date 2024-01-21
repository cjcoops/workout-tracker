import { fetchWorkoutById } from "@/lib/data";
import { log } from "console";
import { Button } from "@/components/ui/button";
import Exercise from "@/components/workouts/exercise";
import { createSession } from "@/lib/actions";
import Link from "next/link";

export default async function Page({ params }: { params: { id: number } }) {
  const id = params.id;
  const workout = await fetchWorkoutById(id);

  const warmpupSteps = workout.warmup.trim().split("\n");

  const createSessionWithWorkoutId = createSession.bind(null, id);

  return (
    <main>
      <div className="flex flex-col gap-4 p-4">
        <div className="flex items-center justify-between">
          <h1 className="text-2xl font-bold">{workout.name}</h1>
          <Link
            className="flex items-center gap-2"
            href={`/workouts/${id}/edit`}
          >
            <Button className="rounded-full bg-gray-500 p-2 text-white">
              <FileEditIcon className="h-6 w-6" />
            </Button>
          </Link>
        </div>
        <div className="rounded-md bg-gray-100 p-4 dark:bg-gray-800">
          <h2 className="mb-2 text-xl font-semibold">Warmup Exercises</h2>
          <div className="grid gap-4">
            {warmpupSteps.map((step) => (
              <div className="flex items-center gap-4" key={step}>
                <ActivityIcon className="h-6 w-6" />
                <p className="text-sm text-gray-500 dark:text-gray-400">
                  {step}
                </p>
              </div>
            ))}
          </div>
        </div>
        <div className="mt-4 grid gap-4">
          {workout.exercises.map((exercise) => (
            <Exercise key={exercise.id} exercise={exercise} />
          ))}
        </div>

        <form action={createSessionWithWorkoutId}>
          <Button className="mt-4" type="submit">
            Start Workout
          </Button>
        </form>
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

function FileEditIcon(props: React.HTMLAttributes<HTMLOrSVGElement>) {
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
      <path d="M4 13.5V4a2 2 0 0 1 2-2h8.5L20 7.5V20a2 2 0 0 1-2 2h-5.5" />
      <polyline points="14 2 14 8 20 8" />
      <path d="M10.42 12.61a2.1 2.1 0 1 1 2.97 2.97L7.95 21 4 22l.99-3.95 5.43-5.44Z" />
    </svg>
  );
}
