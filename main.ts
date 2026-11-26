// One-line joke entry for "Make the Judge Laugh in One Line".
// The joke is composed from two parts — a setup and a punchline —
// joined with an em dash, then written to /output/entry.txt with no
// trailing newline. No dependencies, no network, deterministic.

import { mkdirSync, writeFileSync } from "node:fs";
import { dirname } from "node:path";

const SETUP =
  "My neighbor's dog barks at me every morning, so I started barking back";
const PUNCHLINE =
  "six months later, it's the most consistent friendship I have.";

// Collapse any run of whitespace to a single space and trim the ends,
// so the composed line is always cleanly spaced.
function normalize(text: string): string {
  return text.replace(/\s+/g, " ").trim();
}

// The entry must be a single line of 1-200 characters, counted per
// code point, so a multi-byte character counts exactly once.
function validate(line: string): void {
  const length = [...line].length;
  if (length < 1 || length > 200) {
    throw new Error(`entry must be 1-200 characters, got ${length}`);
  }
  if (line.includes("\n")) {
    throw new Error("entry must be a single line");
  }
}

// Build the final line: normalized setup, em dash, normalized punchline.
function compose(): string {
  return `${normalize(SETUP)} — ${normalize(PUNCHLINE)}`;
}

function main(): void {
  const line = compose();
  validate(line);
  const outPath = "/output/entry.txt";
  mkdirSync(dirname(outPath), { recursive: true });
  writeFileSync(outPath, line, "utf8");
  console.log(`wrote ${[...line].length} characters to ${outPath}`);
}

main();
