import { Program } from "../lib/definitions";
import { fetchPrograms } from "../lib/data";

export default async function Page() {
  const programs = await fetchPrograms();
  return (
    <main className="p-8">
      <h2>Choose a program:</h2>
      <ul>
        {programs.map((program: Program) => (
          <li key={program.id}>{program.name}</li>
        ))}
      </ul>
    </main>
  );
}
