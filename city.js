const fs = require("fs");

const username = process.env.GITHUB_USERNAME;

// Fake simple logic (MVP)
// لاحقًا نبدله بـ GitHub API real contributions
const commits = Math.floor(Math.random() * 50) + 1;

function getBuilding(level) {
  if (level <= 5) return "🌱";
  if (level <= 15) return "🏠";
  if (level <= 30) return "🏢";
  return "🏙️";
}

// Create a simple grid city
let city = "";
const size = 5;

for (let i = 0; i < size; i++) {
  let row = "";
  for (let j = 0; j < size; j++) {
    const level = commits - (i * size + j);
    row += getBuilding(level) + " ";
  }
  city += row.trim() + "\n";
}

// Wrap in SVG (simple visual)
const svg = `
<svg width="500" height="300" xmlns="http://www.w3.org/2000/svg">
  <rect width="100%" height="100%" fill="#0f172a"/>

  <text x="20" y="40" fill="white" font-size="18">
    ${username}'s City Builder
  </text>

  <text x="20" y="100" fill="#38bdf8" font-size="20" font-family="monospace">
    ${city.replace(/\n/g, " ")}
  </text>

</svg>
`;

fs.writeFileSync("city.svg", svg);

console.log("City generated!");
