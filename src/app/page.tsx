import Link from "next/link";
import { fetchWorkouts } from "./lib/data";
import { Card, CardHeader, CardTitle } from "@/components/ui/card";

export default async function Home() {
  const days = await fetchWorkouts();
  return (
    <main className="p-8">
      <h2>Choose a Workout</h2>
      <ul>
        {days.map((day) => (
          <li key={day.id}>
            <Link href={`/day/${day.id}`}>
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
