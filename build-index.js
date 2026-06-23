// Runs automatically on every Netlify deploy (see netlify.toml build command).
// Scans the /projects folder for *.json files (every project the CMS has
// published) and regenerates index.json so the site always lists exactly
// what's actually in the folder — no manual step required.

const fs = require("fs");
const path = require("path");

const projectsDir = path.join(__dirname, "projects");

if (!fs.existsSync(projectsDir)) {
  console.log("No /projects folder found — skipping index build.");
  process.exit(0);
}

const ids = fs
  .readdirSync(projectsDir)
  .filter((f) => f.endsWith(".json") && f !== "index.json")
  .map((f) => f.replace(/\.json$/, ""))
  .sort();

fs.writeFileSync(
  path.join(projectsDir, "index.json"),
  JSON.stringify(ids, null, 2)
);

console.log(`projects/index.json regenerated with ${ids.length} project(s):`, ids);
