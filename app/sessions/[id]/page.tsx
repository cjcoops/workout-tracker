import { fetchSessionById } from "@/lib/data";
import SessionExerciseForm from "@/components/sessions/session-exercise-form";

export default async function Page({ params }: { params: { id: number } }) {
  const id = params.id;
  const session = await fetchSessionById(id);

  return (
    <div className="flex flex-col  gap-8 bg-gray-100 p-4 dark:bg-gray-900">
      <h2 className="text-2xl font-bold">{session.workout.name}</h2>
      {session.sessionExercises.map((sessionExercise) => (
        <SessionExerciseForm key={sessionExercise.id} {...sessionExercise} />
      ))}
    </div>
  );
}
