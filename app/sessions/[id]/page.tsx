import { fetchSessionById } from "@/lib/data";
import SessionExerciseForm from "@/components/sessions/session-exercise-form";
import { CompleteSession } from "@/components/sessions/buttons";
import { ExerciseHistory } from "@/components/sessions/exercise-history";
import { BadgeCheck } from "lucide-react";

export default async function Page({ params }: { params: { id: number } }) {
  const id = params.id;
  const session = await fetchSessionById(id);

  return (
    <div className="flex flex-col gap-8">
      <h2 className="text-2xl font-bold">{session.workout.name}</h2>
      {session.sessionExercises.map((sessionExercise) => (
        <div
          className="rounded-md bg-gray-100 p-3 dark:bg-gray-800"
          key={sessionExercise.id}
        >
          <div className="flex justify-between">
            <h3 className="mb-2 text-xl font-bold">
              {sessionExercise.exercise.name}
            </h3>
            {sessionExercise.isComplete ? (
              <BadgeCheck className="text-green-200" />
            ) : null}
          </div>
          <p className="mb-4 text-lg text-gray-600 dark:text-gray-400">
            {sessionExercise.exercise.description}
          </p>
          <ExerciseHistory sessionExerciseId={sessionExercise.id} />
          <SessionExerciseForm key={sessionExercise.id} {...sessionExercise} />
        </div>
      ))}
      {session.isComplete ? "" : <CompleteSession sessionId={id} />}
    </div>
  );
}
