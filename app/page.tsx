import { fetchIncompleteSessions, fetchWorkouts } from "@/lib/data";

import { Suspense } from "react";
import Suggestions from "./components/home/suggestions";

export default async function Page() {
  const workouts = await fetchWorkouts();
  const incompleteSessions = await fetchIncompleteSessions();
  return (
    <div className="grid  gap-6">
      <div className="">
        <h2 className="text-2xl font-bold">Welcome back, Chris</h2>
      </div>

      <Suspense fallback={<div>Loading...</div>}>
        <Suggestions />
      </Suspense>
    </div>
  );
}
