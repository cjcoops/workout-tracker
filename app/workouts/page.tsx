import Link from "next/link";
import { fetchIncompleteSessions, fetchWorkouts } from "@/lib/data";
import { Button } from "@/components/ui/button";

export default async function Page() {
  const workouts = await fetchWorkouts();
  const incompleteSessions = await fetchIncompleteSessions();
  return (
    <div className="grid gap-6">
      <div className="flex flex-col gap-2">
        <h2 className="text-2xl font-bold">Active Sessions</h2>
        <p className="text-gray-500 dark:text-gray-400">
          Continue an active session
        </p>
      </div>
      <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4">
        {incompleteSessions.map((session) => (
          <div
            key={session.id}
            className="group relative rounded-lg border border-gray-200 bg-white p-4 shadow-sm transition-colors hover:bg-gray-100  dark:border-gray-800 dark:bg-gray-950 dark:hover:bg-gray-800"
          >
            <Link
              className="absolute inset-0"
              href={`sessions/${session.id}`}
            />
            <h3 className="text-lg font-semibold">{session.workout.name}</h3>
            <p className="text-gray-500 dark:text-gray-400">
              {`Started on ${session.workout.createdAt?.toDateString()}`}
            </p>
          </div>
        ))}
      </div>
      <div className="flex flex-col gap-2">
        <h2 className="text-2xl font-bold">Workouts</h2>
        <p className="text-gray-500 dark:text-gray-400">
          Choose a workout to start your session
        </p>
      </div>
      <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4">
        {workouts.map((workout) => (
          <div
            key={workout.id}
            className="group relative rounded-lg border border-gray-200 bg-white p-4 shadow-sm transition-colors hover:bg-gray-100 dark:border-gray-800 dark:border-gray-800 dark:bg-gray-950 dark:hover:bg-gray-800"
          >
            <Link
              className="absolute inset-0"
              href={`workouts/${workout.id}`}
            />
            <h3 className="text-lg font-semibold">{workout.name}</h3>
            <p className="text-gray-500 dark:text-gray-400">
              {workout.lastCompleted
                ? `Last completed on ${workout.lastCompleted.toDateString()}`
                : null}
            </p>
          </div>
        ))}
      </div>
      <div className="flex justify-end">
        <Link href="/workouts/new">
          <Button variant="outline">Create Workout</Button>
        </Link>
      </div>
    </div>
  );
}
