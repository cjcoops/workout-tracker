import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Button } from "@/components/ui/button";
import { fetchWorkoutById } from "@/lib/data";

export default async function Page({ params }: { params: { id: number } }) {
  const workout = await fetchWorkoutById(params.id);

  return (
    <div className="flex flex-col p-4">
      <h1 className="mb-4 text-2xl font-bold">Create/Edit Workout</h1>
      <div className="grid gap-4">
        <div className="grid gap-1.5">
          <Label htmlFor="workout-name">Workout Name</Label>
          <Input id="workout-name" placeholder="Workout Name" />
        </div>
        <div className="grid gap-1.5">
          <Label htmlFor="warmups">Warmups</Label>
          <Textarea id="warmups" placeholder="Describe your warmups here." />
        </div>
        <div className="grid gap-4">
          <h2 className="text-xl font-bold">Exercises</h2>
          <div className="grid gap-4">
            {workout.exercises.map((exercise) => (
              <div className="grid gap-1.5" key={exercise.id}>
                <Label htmlFor="exercise-name-1">Exercise Name</Label>
                <Input id="exercise-name-1" placeholder="Exercise Name" />
                <Label htmlFor="exercise-description-1">
                  Exercise Description
                </Label>
                <Textarea
                  id="exercise-description-1"
                  placeholder="Describe the exercise here."
                />
                <div className="flex justify-between">
                  <Button className="w-max" variant="secondary" size="sm">
                    Add here
                  </Button>
                  <Button className="w-max" variant="destructive" size="sm">
                    Delete
                  </Button>
                </div>
              </div>
            ))}
          </div>
        </div>
        <div className="grid gap-1.5">
          <Label htmlFor="cooldown">Cooldown</Label>
          <Textarea id="cooldown" placeholder="Describe your cooldown here." />
        </div>
        <div className="flex justify-end">
          <Button>Save Workout</Button>
        </div>
      </div>
    </div>
  );
}
