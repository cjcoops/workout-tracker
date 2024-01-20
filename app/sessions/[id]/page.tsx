import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { fetchSessionById } from "@/lib/data";
import { Session } from "inspector";
import SessionExerciseForm from "@/components/sessions/session-exercise-form";

export default async function Page({ params }: { params: { id: number } }) {
  const id = params.id;
  const data = await fetchSessionById(id);

  return (
    <div className="flex flex-col items-center justify-center gap-8 bg-gray-100 p-4 dark:bg-gray-900">
      <h2 className="text-2xl font-bold">{data.name}</h2>
      {data.exercises.map((exercise) => (
        <SessionExerciseForm key={exercise.id} {...exercise} />
      ))}
    </div>
  );
}
