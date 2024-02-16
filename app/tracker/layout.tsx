import { NavMenu } from "@/home/nav-menu";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import Link from "next/link";

export default function Layout({ children }: { children: React.ReactNode }) {
  return (
    <>
      <header className="flex h-16 shrink-0 items-center justify-between  border-b px-4 dark:bg-gray-700 md:px-6">
        <div className="flex gap-2">
          <Avatar>
            <AvatarImage src="https://github.com/shadcn.png" />
            <AvatarFallback>CC</AvatarFallback>
          </Avatar>
          <Link className="flex items-center gap-2" href="/">
            <h1 className="text-lg font-semibold">Workout Tracker</h1>
          </Link>
        </div>
        <NavMenu />
      </header>
      <main className="flex-1 bg-gray-100 p-4 dark:bg-gray-700 md:p-6">
        {children}
      </main>
    </>
  );
}
