import * as React from "react";

import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import Link from "next/link";
import { Menu } from "lucide-react";
import LogoutButton from "./logout-button";

export function NavMenu() {
  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button variant="ghost" size="icon">
          <Menu />
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent className="w-56">
        <Link href="/tracker/workouts/new">
          <DropdownMenuItem>Create Workout</DropdownMenuItem>
        </Link>
        <Link href="/tracker/workouts">
          <DropdownMenuItem>All Workouts</DropdownMenuItem>
        </Link>
        <Link href="/tracker/sessions">
          <DropdownMenuItem>Workout History</DropdownMenuItem>
        </Link>

        <DropdownMenuSeparator />
        <DropdownMenuItem>
          <LogoutButton />
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  );
}
