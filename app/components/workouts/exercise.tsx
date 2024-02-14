export default function Exercise({
  exercise,
}: {
  exercise: { name: string; description: string };
}) {
  return (
    <div className="flex items-center gap-4">
      💪
      <div className="flex flex-col">
        <h2 className="font-semibold">{exercise.name}</h2>
        <p className="text-sm text-gray-500 dark:text-gray-400">
          {exercise.description}
        </p>
      </div>
    </div>
  );
}
