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
    <div className="grid gap-6">
      <div>
        <h2 className="text-2xl">Welcome!</h2>
      </div>

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
