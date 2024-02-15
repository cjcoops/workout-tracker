import Link from "next/link";
import { Card, CardHeader, CardTitle, CardDescription } from "../ui/card";
import { BadgeCheck, TrafficCone } from "lucide-react";

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
        <CardHeader className="p-4">
          <div className="flex justify-between">
            <CardTitle className="text-lg">{session.workout.name}</CardTitle>
            {session.isComplete ? (
              <BadgeCheck className="text-green-200" />
            ) : (
              <TrafficCone className="text-orange-300" />
            )}
          </div>
          <CardDescription>
            {session.isComplete
              ? `Completed on ${session.updatedAt?.toDateString()}`
              : `Started on ${session.createdAt?.toDateString()}`}
          </CardDescription>
        </CardHeader>
      </Card>
    </Link>
  );
};

export default SessionCard;
