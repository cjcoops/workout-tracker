import { fetchExerciseHistory, fetchSessionById } from "@/lib/data";
import SessionExerciseForm from "@/components/sessions/session-exercise-form";
import { CompleteSession } from "@/components/sessions/buttons";
import { ExerciseHistory } from "@/components/sessions/exercise-history";

export default async function Page({ params }: { params: { id: number } }) {
  const id = params.id;
  const session = await fetchSessionById(id);

  return (
    <div className="flex flex-col gap-8 bg-gray-100 p-4 dark:bg-gray-900">
      <h2 className="text-2xl font-bold">{session.workout.name}</h2>
      {session.sessionExercises.map((sessionExercise) => (
        <div key={sessionExercise.id}>
          <h3 className="mb-2 text-xl font-bold">
            {sessionExercise.exercise.name}
          </h3>
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
