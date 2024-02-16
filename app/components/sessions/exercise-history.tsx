import { fetchExerciseHistory } from "@/lib/data";
import { log } from "console";
import {
  Collapsible,
  CollapsibleContent,
  CollapsibleTrigger,
} from "@/components/ui/collapsible";
import { ChevronDown } from "lucide-react";

export async function ExerciseHistory({
  sessionExerciseId,
}: {
  sessionExerciseId: number;
}) {
  const history = await fetchExerciseHistory(sessionExerciseId);

  if (history.length === 0) {
    return null;
  }

  return (
    <Collapsible className="mb-4 space-y-2">
      <CollapsibleTrigger className="flex">
        <h4 className="text-sm font-semibold">View Exercise History</h4>
        <ChevronDown />
      </CollapsibleTrigger>
      <CollapsibleContent className="space-y-2 ">
        {history.map((historyItem, index) => (
          <div
            key={index}
            className="rounded-md border border-gray-900 bg-gray-700 px-4 py-2 font-mono text-sm shadow-sm"
          >
            {historyItem}
          </div>
        ))}
      </CollapsibleContent>
    </Collapsible>
  );
}
