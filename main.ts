// Make the Judge Laugh in One Line — entry program.
//
// Writes one original one-liner to /output/entry.txt, deterministically:
// the same bytes on every run, no network, no secrets, no dependencies.

import { mkdirSync, writeFileSync } from "node:fs";
import { dirname } from "node:path";

const LINE =
  "My neighbor's dog barks at me every morning, so I started barking back — six months later, it's the most consistent friendship I have.";

const MAX_CHARS = 200;

function normalize(line: string): string {
  // Collapse any stray whitespace to single spaces and trim the ends.
  return line.replace(/\s+/g, " ").trim();
}

function main(): void {
  const line = normalize(LINE);
  const chars = [...line].length; // count code points, not UTF-16 units
  if (chars < 1 || chars > MAX_CHARS) {
    throw new Error(`Line must be 1-${MAX_CHARS} characters, got ${chars}.`);
  }

  const outPath = "/output/entry.txt";
  mkdirSync(dirname(outPath), { recursive: true });
  // No trailing newline: the file holds exactly the one line, nothing else.
  writeFileSync(outPath, line, "utf8");
  console.log(`Wrote ${chars} characters to ${outPath}`);
}

main();
