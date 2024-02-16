import Link from "next/link";
import {
  Card,
  CardHeader,
  CardTitle,
  CardDescription,
} from "@/components/ui/card";
import { BadgeCheck, ChevronRight, TrafficCone } from "lucide-react";

interface SessionCardProps {
  session: {
    id: number;
    createdAt: Date | null;
    updatedAt: Date | null;
    isComplete: boolean | null;
    workout: {
      name: string;
    };
  };
}

const SessionCard: React.FC<SessionCardProps> = ({ session }) => {
  return (
    <Link key={session.id} href={`/sessions/${session.id}`}>
      <Card className="transition-colors hover:bg-gray-100 dark:border-gray-800 dark:bg-gray-950 dark:hover:bg-gray-800">
        <CardHeader className="flex flex-row items-center p-4">
          <div className="flex-1">
            <div className="flex gap-3">
              {session.isComplete ? (
                <BadgeCheck className="text-primary" />
              ) : (
                <TrafficCone className="text-orange-300" />
              )}
              <CardTitle className="text-lg">{session.workout.name}</CardTitle>
            </div>
            <CardDescription>
              {session.isComplete
                ? `Completed on ${session.updatedAt?.toDateString()}`
                : `Started on ${session.createdAt?.toDateString()}`}
            </CardDescription>
          </div>
          <ChevronRight className="!mt-0 text-primary" />
        </CardHeader>
      </Card>
    </Link>
  );
};

export default SessionCard;
