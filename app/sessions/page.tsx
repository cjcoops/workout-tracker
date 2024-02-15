import SessionCard from "@/components/sessions/session-card";
import { fetchAllSessions } from "@/lib/data";

export default async function Page() {
  const sessions = await fetchAllSessions();
  return (
    <div className="grid gap-6">
      <h2 className="text-2xl font-bold">Workout History</h2>

      <div className="flex flex-col gap-2">
        <p className="text-gray-500 dark:text-gray-400">
          Choose a workout to view your results.
        </p>
      </div>
      <div className="flex flex-col gap-4">
        {sessions.map((session) => (
          <SessionCard key={session.id} session={session} />
        ))}
      </div>
    </div>
  );
}
