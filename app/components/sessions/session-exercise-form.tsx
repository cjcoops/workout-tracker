"use client";

import { SessionExerciseView } from "@/lib/definitions";
import { Label } from "../ui/label";
import { Input } from "../ui/input";
import { Textarea } from "../ui/textarea";
import { Button } from "../ui/button";
import { updateSessionExercise } from "@/lib/actions";
import { useFormState } from "react-dom";

export default function SessionExercise(sessionExercise: SessionExerciseView) {
  const updateSessionExerciseWithId = updateSessionExercise.bind(
    null,
    sessionExercise.id,
  );

  return (
    <form key={sessionExercise.id} action={updateSessionExerciseWithId}>
      <h3 className="mb-2 text-xl font-bold">{sessionExercise.name}</h3>
      <p className="mb-10 text-lg text-gray-600 dark:text-gray-400">
        {sessionExercise.description}
      </p>
      <div className="mx-auto w-full max-w-md">
        <div className="flex flex-col space-y-4">
          <div className="grid gap-1.5">
            <Label htmlFor="reps">Reps</Label>
            <Input
              id="reps"
              placeholder="Enter number of reps"
              type="number"
              name="reps"
            />
          </div>
          <div className="grid gap-1.5">
            <Label htmlFor="weight">Weight</Label>
            <Input
              id="weight"
              placeholder="Enter weight"
              type="number"
              name="weight"
            />
          </div>
          <div className="grid gap-1.5">
            <Label htmlFor="notes">Notes</Label>
            <Textarea id="notes" placeholder="Enter notes" name="notes" />
          </div>
          <Button className="w-full" type="submit">
            Mark as Complete
          </Button>
        </div>
      </div>
    </form>
  );
}
