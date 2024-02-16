import { signOut } from "../../auth";

export default function LogoutButton() {
  return (
    <form
      action={async () => {
        "use server";
        await signOut();
      }}
    >
      <button>
        <div>Log Out</div>
      </button>
    </form>
  );
}
