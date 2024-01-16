import Link from "next/link";
import { fetchWorkouts } from "@/app/lib/data";
import { Card, CardHeader, CardTitle } from "@/app/components/ui/card";

export default async function Home() {
  const days = await fetchWorkouts();
  return (
    <main className="p-8">
      <h2>Choose a Workout</h2>
      <ul>
        {days.map((day) => (
          <li key={day.id}>
            <Link href={`workouts/${day.id}`}>
              <Card>
                <CardHeader>
                  <CardTitle>{day.name}</CardTitle>
                </CardHeader>
              </Card>
            </Link>
          </li>
        ))}
      </ul>
    </main>
  );
}