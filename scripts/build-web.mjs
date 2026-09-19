import { cp, mkdir, rm } from "node:fs/promises";
import { existsSync } from "node:fs";

const output = new URL("../www/", import.meta.url);
const files = [
  "index.html",
  "academy-v1.js",
  "manifest.webmanifest",
  "icon.svg",
  "sw.js"
];

await rm(output, { recursive: true, force: true });
await mkdir(output, { recursive: true });

for (const file of files) {
  if (!existsSync(new URL("../" + file, import.meta.url))) {
    throw new Error("Missing web asset: " + file);
  }
  await cp(new URL("../" + file, import.meta.url), new URL("../www/" + file, import.meta.url));
}

console.log("KAIZO web bundle ready in www/");
