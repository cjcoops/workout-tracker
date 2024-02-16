import Link from "next/link";
import {
  Card,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { fetchIncompleteSessions, fetchWorkouts } from "@/lib/data";
import WorkoutCard from "../../components/workouts/workout-card";
import SessionCard from "../../components/sessions/session-card";

export default async function Suggestions() {
  const workouts = await fetchWorkouts();
  const incompleteSessions = await fetchIncompleteSessions();
  return (
    <>
      <div className="flex flex-col gap-2">
        <p className="text-gray-500 dark:text-gray-300">
          Continue with an incomplete workout
        </p>
      </div>
      {incompleteSessions.length ? (
        <div className="flex flex-col gap-4">
          {incompleteSessions.map((session) => (
            <SessionCard key={session.id} session={session} />
          ))}
        </div>
      ) : null}
      <div className="flex flex-col gap-2">
        <p className="text-gray-500 dark:text-gray-300">Begin a new workout</p>
      </div>
      <div className="flex flex-col gap-4">
        {workouts.map((workout) => (
          <WorkoutCard key={workout.id} workout={workout} />
        ))}
      </div>
    </>
  );
}
