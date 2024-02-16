"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { useFormState } from "react-dom";
import { createWorkout } from "@/lib/actions";
import { Plus, Trash } from "lucide-react";

export function CreateForm() {
  const [exercises, setExercises] = useState([{ name: "", description: "" }]);
  const [state, dispatch] = useFormState(createWorkout, null);

  const handleAddExercise = (index: number) => {
    const updatedExercises = [...exercises];
    updatedExercises.splice(index + 1, 0, { name: "", description: "" });
    setExercises(updatedExercises);
  };

  const handleRemoveExercise = (index: number) => {
    if (exercises.length === 1) return;
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
        <div className="grid gap-2">
          <Label htmlFor="workout-name">Workout Name</Label>
          <Input id="workout-name" placeholder="Workout Name" name="name" />
        </div>
        <div className="grid gap-2">
          <Label htmlFor="warmups">🔥 Warmup</Label>
          <Textarea
            id="warmups"
            placeholder="Describe your warmup here."
            name="warmup"
          />
        </div>
        <div className="grid gap-4">
          <h2 className="text-xl font-bold">🏃 Exercises</h2>
          <div className="grid gap-4">
            {exercises.map((exercise, index) => (
              <div
                className="grid gap-5 rounded-md p-3 dark:bg-gray-800 "
                key={index}
              >
                <div className="grid gap-2">
                  <Label htmlFor={`exercise-name-${index}`}>Name</Label>
                  <Input
                    id={`exercise-name-${index}`}
                    placeholder="Exercise Name"
                    name="exerciseName"
                    onChange={(e) =>
                      handleChange(index, "name", e.target.value)
                    }
                    required
                  />
                </div>
                <div className="grid gap-2">
                  <Label htmlFor={`exercise-description-${index}`}>
                    Description
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
                </div>
                <div className="flex justify-between">
                  <Button
                    variant="secondary"
                    size="icon"
                    onClick={() => handleAddExercise(index)}
                    type="button"
                  >
                    <Plus />
                  </Button>
                  <Button
                    variant="destructive"
                    size="icon"
                    onClick={() => handleRemoveExercise(index)}
                    type="button"
                    disabled={exercises.length === 1}
                  >
                    <Trash />
                  </Button>
                </div>
              </div>
            ))}
          </div>
        </div>
        <div className="grid gap-2">
          <Label htmlFor="cooldown">❄️ Cooldown</Label>
          <Textarea
            id="cooldown"
            placeholder="Describe your cooldown here."
            name="cooldown"
          />
        </div>
        <div>
          <Button className="w-full">Save Workout</Button>
        </div>
      </div>
    </form>
  );
}
