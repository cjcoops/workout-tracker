import { signOut } from "@/auth";

export default function LogoutButton() {
  return (
    <form
      action={async () => {
        "use server";
        await signOut();
      }}
    >
      <button>
        <div>Sign Out</div>
      </button>
    </form>
  );
}
