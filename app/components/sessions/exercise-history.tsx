import { fetchExerciseHistory } from "@/lib/data";
import { log } from "console";

export async function ExerciseHistory({ exerciseId }: { exerciseId: number }) {
  const history = await fetchExerciseHistory(exerciseId);
  log(history);
  return <div></div>;
}
