import { drizzle } from "drizzle-orm/vercel-postgres";
import { migrate } from "drizzle-orm/vercel-postgres/migrator";

import { sql } from "@vercel/postgres";

async function main() {
  const db = drizzle(sql);

  await migrate(db, { migrationsFolder: "drizzle" });

  await sql.end();
}

main().catch((err) => {
  console.error(
    "An error occurred while attempting to migrate the database:",
    err,
  );
});
