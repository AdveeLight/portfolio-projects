/**
 * build-index.js
 * Runs at deploy time on Netlify.
 * Scans /projects/ for all .json files (except index.json itself),
 * sorts them by the "order" field, and writes /projects/index.json.
 *
 * This means you NEVER need to manually update index.json —
 * every time you publish a project via the CMS, Netlify re-runs this
 * and your portfolio updates automatically.
 */

const fs   = require('fs');
const path = require('path');

const projectsDir = path.join(__dirname, 'projects');

// Read all json files except index.json
const files = fs.readdirSync(projectsDir)
  .filter(f => f.endsWith('.json') && f !== 'index.json');

// Read each file and parse the order field for sorting
const sorted = files
  .map(filename => {
    try {
      const data = JSON.parse(fs.readFileSync(path.join(projectsDir, filename), 'utf8'));
      return { filename, order: data.order ?? 99 };
    } catch {
      return { filename, order: 99 };
    }
  })
  .sort((a, b) => a.order - b.order)
  .map(item => item.filename);

// Write the index
const indexPath = path.join(projectsDir, 'index.json');
fs.writeFileSync(indexPath, JSON.stringify(sorted, null, 2));

console.log(`✓ projects/index.json updated with ${sorted.length} project(s):`);
sorted.forEach((f, i) => console.log(`  ${i + 1}. ${f}`));
