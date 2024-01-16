export default function Exercise({
  exercise,
}: {
  exercise: { name: string; description: string };
}) {
  return (
    <div className="flex items-center gap-4">
      <DumbbellIcon className="h-6 w-6" />
      <div className="flex flex-col">
        <h2 className="font-semibold">{exercise.name}</h2>
        <p className="text-sm text-gray-500 dark:text-gray-400">
          {exercise.description}
        </p>
      </div>
    </div>
  );
}

function DumbbellIcon(props: React.HTMLAttributes<HTMLOrSVGElement>) {
  return (
    <svg
      {...props}
      xmlns="http://www.w3.org/2000/svg"
      width="24"
      height="24"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <path d="m6.5 6.5 11 11" />
      <path d="m21 21-1-1" />
      <path d="m3 3 1 1" />
      <path d="m18 22 4-4" />
      <path d="m2 6 4-4" />
      <path d="m3 10 7-7" />
      <path d="m14 21 7-7" />
    </svg>
  );
}
