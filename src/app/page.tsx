import Link from "next/link";
import { fetchDays } from "./lib/data";
import { Card, CardHeader, CardTitle } from "@/components/ui/card";

export default async function Home() {
  const days = await fetchDays();
  return (
    <main className="p-8">
      <h2>Choose a Workout</h2>
      <ul>
        {days.map((day) => (
          <li key={day.id}>
            <Link href={`/day/${day.id}`}>
              <Card>
                <CardHeader>
                  <CardTitle>{day.displayName}</CardTitle>
                </CardHeader>
              </Card>
            </Link>
          </li>
        ))}
      </ul>

      <Link href="/programs">View Programs</Link>
    </main>
  );
}
