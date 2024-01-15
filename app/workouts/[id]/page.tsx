import { fetchWorkoutById } from "@/app/lib/data";
import { log } from "console";

export default async function Page({ params }: { params: { id: string } }) {
  const id = params.id;
  const workout = await fetchWorkoutById(id);
  log(workout);
  return <main>This is a workout</main>;
}
