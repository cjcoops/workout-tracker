import Link from "next/link";
import { fetchIncompleteSessions, fetchWorkouts } from "@/lib/data";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Suspense } from "react";
import Suggestions from "./components/home/suggestions";

export default async function Page() {
  const workouts = await fetchWorkouts();
  const incompleteSessions = await fetchIncompleteSessions();
  return (
    <div className="grid  gap-6">
      <div className="">
        <h2 className="text-xl">Welcome!</h2>
      </div>

      <Link href={`workouts`}>
        <Card className="transition-colors hover:bg-gray-100 dark:border-gray-800 dark:bg-gray-950 dark:hover:bg-gray-800">
          <CardHeader className="p-4">
            <CardTitle className="text-lg">View all workouts</CardTitle>
          </CardHeader>
        </Card>
      </Link>

      <Link href={`sessions`}>
        <Card className="transition-colors hover:bg-gray-100 dark:border-gray-800 dark:bg-gray-950 dark:hover:bg-gray-800">
          <CardHeader className="p-4">
            <CardTitle className="text-lg">View previous workouts</CardTitle>
          </CardHeader>
        </Card>
      </Link>

      <Suspense fallback={<div>Loading...</div>}>
        <Suggestions />
      </Suspense>

      <div className="flex justify-end">
        <Link href="/workouts/new">
          <Button variant="outline">Create Workout</Button>
        </Link>
      </div>
    </div>
  );
}
