import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Button } from "@/components/ui/button";
import { CreateForm } from "@/components/workouts/create-form";

export default async function Page() {
  const exercises = [
    {
      name: undefined,
      description: undefined,
    },
  ];

  return (
    <div className="flex flex-col p-4">
      <h1 className="mb-4 text-2xl font-bold">Create Workout</h1>
      <CreateForm />
    </div>
  );
}
