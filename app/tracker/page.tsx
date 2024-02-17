import Suggestions from "@/home/suggestions";

import { Suspense } from "react";
import { auth } from "../../auth";

export default async function Page() {
  const session = await auth();

  return (
    <div className="grid  gap-6">
      <div className="">
        <h2 className="text-2xl font-bold">
          Welcome back, {session?.user?.name}
        </h2>
      </div>

      <Suspense fallback={<div>Loading...</div>}>
        <Suggestions />
      </Suspense>
    </div>
  );
}
