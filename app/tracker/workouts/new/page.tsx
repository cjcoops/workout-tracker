import { CreateForm } from "@/components/workouts/create-form";

export default async function Page() {
  return (
    <div className="flex flex-col">
      <h1 className="mb-4 text-2xl font-bold">Create a new workout</h1>
      <CreateForm />
    </div>
  );
}
