"use client";

import { useState } from "react";
import { Button } from "../ui/button";
import { Input } from "../ui/input";
import { Label } from "../ui/label";
import { Textarea } from "../ui/textarea";
import { useFormState } from "react-dom";
import { createWorkout } from "@/lib/actions";

export function CreateForm() {
  const [exercises, setExercises] = useState([{ name: "", description: "" }]);
  const [state, dispatch] = useFormState(createWorkout, null);

  const handleAddExercise = (index: number) => {
    const updatedExercises = [...exercises];
    updatedExercises.splice(index + 1, 0, { name: "", description: "" });
    setExercises(updatedExercises);
  };

  const handleRemoveExercise = (index: number) => {
    const updatedExercises = [...exercises];
    updatedExercises.splice(index, 1);
    setExercises(updatedExercises);
  };

  const handleChange = (
    index: number,
    key: "name" | "description",
    value: string,
  ) => {
    const updatedExercises = [...exercises];
    updatedExercises[index][key] = value;
    setExercises(updatedExercises);
  };

  return (
    <form action={dispatch}>
      <div className="grid gap-4">
        <div className="grid gap-1.5">
          <Label htmlFor="workout-name">Workout Name</Label>
          <Input id="workout-name" placeholder="Workout Name" name="name" />
        </div>
        <div className="grid gap-1.5">
          <Label htmlFor="warmups">Warmup</Label>
          <Textarea
            id="warmups"
            placeholder="Describe your warmup here."
            name="warmup"
          />
        </div>
        <div className="grid gap-4">
          <h2 className="text-xl font-bold">Exercises</h2>
          <div className="grid gap-4">
            {exercises.map((exercise, index) => (
              <div className="grid gap-1.5" key={index}>
                <Label htmlFor={`exercise-name-${index}`}>Exercise Name</Label>
                <Input
                  id={`exercise-name-${index}`}
                  placeholder="Exercise Name"
                  name="exerciseName"
                  onChange={(e) => handleChange(index, "name", e.target.value)}
                  required
                />
                <Label htmlFor={`exercise-description-${index}`}>
                  Exercise Description
                </Label>
                <Textarea
                  id={`exercise-description-${index}`}
                  placeholder="Describe the exercise here."
                  name="exerciseDescription"
                  onChange={(e) =>
                    handleChange(index, "description", e.target.value)
                  }
                  required
                />
                <div className="flex justify-between">
                  <Button
                    className="w-max"
                    variant="secondary"
                    size="sm"
                    onClick={() => handleAddExercise(index)}
                    type="button"
                  >
                    Add here
                  </Button>
                  <Button
                    className="w-max"
                    variant="destructive"
                    size="sm"
                    onClick={() => handleRemoveExercise(index)}
                    type="button"
                  >
                    Delete
                  </Button>
                </div>
              </div>
            ))}
          </div>
        </div>
        <div className="grid gap-1.5">
          <Label htmlFor="cooldown">Cooldown</Label>
          <Textarea
            id="cooldown"
            placeholder="Describe your cooldown here."
            name="cooldown"
          />
        </div>
        <div className="flex justify-end">
          <Button>Save Workout</Button>
        </div>
      </div>
    </form>
  );
}
