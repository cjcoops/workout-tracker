import Link from "next/link";
import {
  Card,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { ChevronRight } from "lucide-react";

export default function WorkoutCard({
  workout,
}: {
  workout: { id: number; name: string; lastCompleted: Date | null };
}) {
  return (
    <Link href={`/workouts/${workout.id}`}>
      <Card className="transition-colors hover:bg-gray-100 dark:border-gray-800 dark:bg-gray-950 dark:hover:bg-gray-800">
        <CardHeader className="flex flex-row items-center p-4">
          <div className="flex-1">
            <CardTitle className="text-lg">{workout.name}</CardTitle>
            {workout.lastCompleted ? (
              <CardDescription>
                {`Last completed on ${workout.lastCompleted.toDateString()}`}
              </CardDescription>
            ) : null}
          </div>
          <ChevronRight className="!mt-0 text-primary" />
        </CardHeader>
      </Card>
    </Link>
  );
}
