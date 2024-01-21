import { fetchSessionById } from "@/lib/data";
import SessionExerciseForm from "@/components/sessions/session-exercise-form";

export default async function Page({ params }: { params: { id: number } }) {
  const id = params.id;
  const data = await fetchSessionById(id);

  return (
    <div className="flex flex-col  gap-8 bg-gray-100 p-4 dark:bg-gray-900">
      <h2 className="text-2xl font-bold">{data.name}</h2>
      {data.exercises.map((exercise) => (
        <SessionExerciseForm key={exercise.id} {...exercise} />
      ))}
    </div>
  );
}
