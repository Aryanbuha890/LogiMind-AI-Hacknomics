import { readFileSync, writeFileSync } from "fs";

const file = "src/routes/index.tsx";
const raw = readFileSync(file, "utf8");
const lines = raw.split(/\r?\n/);

// Delete lines 2786 to 4441 (1-indexed), i.e. indices 2785..4440
const keep = [...lines.slice(0, 2785), ...lines.slice(4441)];
writeFileSync(file, keep.join("\r\n"), "utf8");
console.log(`Done. File now has ${keep.length} lines.`);
