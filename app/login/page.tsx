"use client";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { authenticate } from "@/lib/actions";
import { useFormState, useFormStatus } from "react-dom";

export default function Page() {
  const [errorMessage, dispatch] = useFormState(authenticate, undefined);

  return (
    <form action={dispatch} className="grid gap-3">
      <div>
        <Label htmlFor="email">Email</Label>
        <Input type="email" name="email" placeholder="Email" required />
      </div>
      <div>
        <Label htmlFor="password">Password</Label>
        <Input
          type="password"
          name="password"
          placeholder="Password"
          required
        />
      </div>
      <LoginButton />
      <div
        className="flex h-8 items-end space-x-1"
        aria-live="polite"
        aria-atomic="true"
      >
        {errorMessage && (
          <>
            <p className="text-sm text-red-500">{errorMessage}</p>
          </>
        )}
      </div>
    </form>
  );
}

function LoginButton() {
  const { pending } = useFormStatus();

  return (
    <Button aria-disabled={pending} type="submit" className="w-full">
      Login
    </Button>
  );
}
