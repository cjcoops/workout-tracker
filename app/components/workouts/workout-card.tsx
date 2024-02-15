import Link from "next/link";
import { Card, CardDescription, CardHeader, CardTitle } from "../ui/card";

export default function WorkoutCard({
  workout,
}: {
  workout: { id: number; name: string; lastCompleted: Date | null };
}) {
  return (
    <Link href={`/workouts/${workout.id}`}>
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
  );
}
