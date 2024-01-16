import { fetchWorkoutById } from "@/app/lib/data";
import { log } from "console";
import { Button } from "@/app/components/ui/button";

export default async function Page({ params }: { params: { id: string } }) {
  const id = params.id;
  const workout = await fetchWorkoutById(id);
  log(workout);
  return (
    <main>
      <div className="flex flex-col gap-4 p-4">
        <h1 className="text-2xl font-bold">Workout Exercises</h1>
        <div className="rounded-md bg-gray-100 p-4 dark:bg-gray-800">
          <h2 className="mb-2 text-xl font-semibold">Warmup Exercises</h2>
          <div className="grid gap-4">
            <div className="flex items-center gap-4">
              <HopIcon className="h-6 w-6" />
              <div className="flex flex-col">
                <h3 className="font-semibold">Jumping Jacks</h3>
                <p className="text-sm text-gray-500 dark:text-gray-400">
                  A full body exercise that increases your heart rate and
                  prepares your muscles for workout.
                </p>
              </div>
            </div>
            <div className="flex items-center gap-4">
              <KeyIcon className="h-6 w-6" />
              <div className="flex flex-col">
                <h3 className="font-semibold">High Knees</h3>
                <p className="text-sm text-gray-500 dark:text-gray-400">
                  A cardio-intensive exercise that strengthens your core and
                  improves your agility.
                </p>
              </div>
            </div>
            <div className="flex items-center gap-4">
              <CircleIcon className="h-6 w-6" />
              <div className="flex flex-col">
                <h3 className="font-semibold">Arm Circles</h3>
                <p className="text-sm text-gray-500 dark:text-gray-400">
                  A simple exercise to warm up your arms and shoulders.
                </p>
              </div>
            </div>
          </div>
        </div>
        <div className="mt-4 grid gap-4">
          <div className="flex items-center gap-4">
            <ActivityIcon className="h-6 w-6" />
            <div className="flex flex-col">
              <h2 className="font-semibold">Cardio: Running</h2>
              <p className="text-sm text-gray-500 dark:text-gray-400">
                A great exercise for cardiovascular health and lower body
                strength.
              </p>
            </div>
          </div>
          <div className="flex items-center gap-4">
            <DumbbellIcon className="h-6 w-6" />
            <div className="flex flex-col">
              <h2 className="font-semibold">Strength: Weight Lifting</h2>
              <p className="text-sm text-gray-500 dark:text-gray-400">
                Build muscle mass and strength in all major muscle groups.
              </p>
            </div>
          </div>
          <div className="flex items-center gap-4">
            <ActivityIcon className="h-6 w-6" />
            <div className="flex flex-col">
              <h2 className="font-semibold">Flexibility: Yoga</h2>
              <p className="text-sm text-gray-500 dark:text-gray-400">
                Improve flexibility, balance, and body awareness.
              </p>
            </div>
          </div>
        </div>

        <Button className="mt-4">Start Workout</Button>
      </div>
    </main>
  );
}

function CircleIcon(props) {
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
      <circle cx="12" cy="12" r="10" />
    </svg>
  );
}

function DumbbellIcon(props) {
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

function HopIcon(props) {
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
      <path d="M17.5 5.5C19 7 20.5 9 21 11c-2.5.5-5 .5-8.5-1" />
      <path d="M5.5 17.5C7 19 9 20.5 11 21c.5-2.5.5-5-1-8.5" />
      <path d="M16.5 11.5c1 2 1 3.5 1 6-2.5 0-4 0-6-1" />
      <path d="M20 11.5c1 1.5 2 3.5 2 4.5-1.5.5-3 0-4.5-.5" />
      <path d="M11.5 20c1.5 1 3.5 2 4.5 2 .5-1.5 0-3-.5-4.5" />
      <path d="M20.5 16.5c1 2 1.5 3.5 1.5 5.5-2 0-3.5-.5-5.5-1.5" />
      <path d="M4.783 4.782C8.493 1.072 14.5 1 18 5c-1 1-4.5 2-6.5 1.5 1 1.5 1 4 .5 5.5-1.5.5-4 .5-5.5-.5C7 13.5 6 17 5 18c-4-3.5-3.927-9.508-.217-13.218Z" />
      <path d="M4.5 4.5 3 3c-.184-.185-.184-.816 0-1" />
    </svg>
  );
}

function KeyIcon(props) {
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
      <circle cx="7.5" cy="15.5" r="5.5" />
      <path d="m21 2-9.6 9.6" />
      <path d="m15.5 7.5 3 3L22 7l-3-3" />
    </svg>
  );
}

function ActivityIcon(props) {
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
      <path d="M22 12h-4l-3 9L9 3l-3 9H2" />
    </svg>
  );
}
