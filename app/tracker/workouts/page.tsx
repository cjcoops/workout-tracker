import Link from "next/link";
import { fetchIncompleteSessions, fetchWorkouts } from "@/lib/data";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import WorkoutCard from "@/components/workouts/workout-card";

export default async function Page() {
  const workouts = await fetchWorkouts();
  return (
    <div className="grid gap-6">
      <h2 className="text-2xl font-bold">Workouts</h2>
      <Link href="/tracker/workouts/new">
        <Button className="w-full">Create New Workout</Button>
      </Link>
      <div className="flex flex-col gap-2">
        <p className="text-gray-500 dark:text-gray-400">
          Choose a workout to start your session
        </p>
      </div>
      <div className="flex flex-col gap-4">
        {workouts.map((workout) => (
          <WorkoutCard key={workout.id} workout={workout} />
        ))}
      </div>
    </div>
  );
}
