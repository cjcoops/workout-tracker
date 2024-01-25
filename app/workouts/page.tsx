import Link from "next/link";
import { fetchIncompleteSessions, fetchWorkouts } from "@/lib/data";
import { Button } from "@/components/ui/button";
import { log } from "console";

export default async function Page() {
  const workouts = await fetchWorkouts();
  const incompleteSessions = await fetchIncompleteSessions();
  log(incompleteSessions);
  return (
    <div className="flex h-screen flex-col">
      <header className="flex h-16 items-center border-b px-4 md:px-6">
        <Link className="flex items-center gap-2" href="#">
          <MountainIcon className="h-6 w-6" />
          <span className="text-lg font-semibold">Workout Tracker</span>
        </Link>
      </header>
      <main className="flex-1 overflow-y-auto p-4 md:p-6">
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
                className="group relative rounded-lg border border-gray-200 bg-white p-4 shadow-sm transition-colors hover:bg-gray-100 dark:border-gray-800 dark:border-gray-800 dark:bg-gray-950 dark:hover:bg-gray-800"
              >
                <Link
                  className="absolute inset-0"
                  href={`sessions/${session.id}`}
                />
                <h3 className="text-lg font-semibold">
                  {session.workout.name}
                </h3>
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
      </main>
    </div>
  );
}

function MountainIcon(props: React.HTMLAttributes<HTMLOrSVGElement>) {
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
      <path d="m8 3 4 8 5-5 5 15H2L8 3z" />
    </svg>
  );
}
