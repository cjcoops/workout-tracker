import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { fetchSessionById } from "@/lib/data";

export default async function Page({ params }: { params: { id: number } }) {
  const id = params.id;
  const data = await fetchSessionById(id);

  return (
    <div className="flex flex-col items-center justify-center gap-8 bg-gray-100 p-4 dark:bg-gray-900">
      <h2 className="text-2xl font-bold">{data.name}</h2>
      {data.exercises.map((exercise) => (
        <form key={exercise.id}>
          <h3 className="mb-2 text-xl font-bold">{exercise.name}</h3>
          <p className="mb-10 text-lg text-gray-600 dark:text-gray-400">
            {exercise.description}
          </p>
          <div className="mx-auto w-full max-w-md">
            <div className="flex flex-col space-y-4">
              <div className="grid gap-1.5">
                <Label htmlFor="reps">Reps</Label>
                <Input
                  id="reps"
                  placeholder="Enter number of reps"
                  type="number"
                />
              </div>
              <div className="grid gap-1.5">
                <Label htmlFor="weight">Weight</Label>
                <Input id="weight" placeholder="Enter weight" type="number" />
              </div>
              <div className="grid gap-1.5">
                <Label htmlFor="notes">Notes</Label>
                <Textarea id="notes" placeholder="Enter notes" />
              </div>
              <Button className="w-full">Mark as Complete</Button>
            </div>
          </div>
        </form>
      ))}
    </div>
  );
}
