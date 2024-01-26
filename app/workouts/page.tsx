import Link from "next/link";
import { fetchIncompleteSessions, fetchWorkouts } from "@/lib/data";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";

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

      <div className="flex flex-col gap-4">
        {incompleteSessions.map((session) => (
          <Link key={session.id} href={`/sessions/${session.id}`}>
            <Card className="transition-colors hover:bg-gray-100 dark:border-gray-800 dark:bg-gray-950 dark:hover:bg-gray-800">
              <CardHeader className="p-4">
                <CardTitle className="text-lg">
                  {session.workout.name}
                </CardTitle>
                <CardDescription>
                  {`Started on ${session.workout.createdAt?.toDateString()}`}
                </CardDescription>
              </CardHeader>
            </Card>
          </Link>
        ))}
      </div>
      <div className="flex flex-col gap-2">
        <h2 className="text-2xl font-bold">Workouts</h2>
        <p className="text-gray-500 dark:text-gray-400">
          Choose a workout to start your session
        </p>
      </div>
      <div className="flex flex-col gap-4">
        {workouts.map((workout) => (
          <Link key={workout.id} href={`/workouts/${workout.id}`}>
            <Card className="transition-colors hover:bg-gray-100 dark:border-gray-800 dark:bg-gray-950 dark:hover:bg-gray-800">
              <CardHeader className="p-4">
                <CardTitle className="text-lg">{workout.name}</CardTitle>
                {workout.lastCompleted ? (
                  <CardDescription>
                    {`Last completed on ${workout.lastCompleted.toDateString()}`}
                  </CardDescription>
                ) : null}
              </CardHeader>
            </Card>
          </Link>
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
