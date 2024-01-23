import { completeSession } from "@/lib/actions";
import { Button } from "../ui/button";

export function CompleteSession({ sessionId }: { sessionId: number }) {
  const completeSessionWithId = completeSession.bind(null, sessionId);
  return (
    <form action={completeSessionWithId}>
      <Button className="w-full" type="submit">
        Complete Session
      </Button>
    </form>
  );
}
