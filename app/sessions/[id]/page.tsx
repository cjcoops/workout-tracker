import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";

export default function Page() {
  return (
    <div className="flex h-screen flex-col items-center justify-center bg-gray-100 p-4 dark:bg-gray-900">
      <h1 className="mb-2 text-4xl font-bold">Push Ups</h1>
      <p className="mb-10 text-lg text-gray-600 dark:text-gray-400">
        A basic push up is an effective way to strengthen the chest and arm
        muscles and can be easily scaled as you get stronger.
      </p>
      <div className="mx-auto w-full max-w-md">
        <div className="flex flex-col space-y-4">
          <div className="grid gap-1.5">
            <Label htmlFor="reps">Reps</Label>
            <Input id="reps" placeholder="Enter number of reps" type="number" />
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
        <div className="mt-10 flex justify-between">
          <Button variant="outline">Previous Exercise</Button>
          <Button variant="outline">Next Exercise</Button>
        </div>
      </div>
    </div>
  );
}
