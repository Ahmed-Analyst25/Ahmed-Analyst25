const fs = require("fs");

// (MVP) هنستخدم random دلوقتي
// بعدين نربطه بـ GitHub API الحقيقي
const size = 7;

function getBlock(v) {
  if (v < 2) return "🟩"; // أرض
  if (v < 4) return "🏠"; // بيت
  if (v < 7) return "🏢"; // مبنى
  return "🏙️"; // برج
}

let grid = "";

for (let i = 0; i < size; i++) {
  let row = "";
  for (let j = 0; j < size; j++) {
    const value = Math.floor(Math.random() * 10);
    row += getBlock(value);
  }
  grid += row + "\n";
}

fs.writeFileSync("city.txt", grid);

console.log("City grid generated");
