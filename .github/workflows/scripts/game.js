const fs = require("fs");

const cols = 20;
const rows = 10;
const cell = 30;

let chicken = [{ x: 5, y: 5 }];
let direction = { x: 1, y: 0 };

let worms = generateWorms(8);
let score = 0;

// حركة بسيطة (random snake-like)
for (let step = 0; step < 40; step++) {
  moveChicken();

  // check eating worm
  worms = worms.filter(w => {
    if (w.x === chicken[0].x && w.y === chicken[0].y) {
      score++;
      return false;
    }
    return true;
  });

  if (worms.length === 0) worms = generateWorms(8);
}

function moveChicken() {
  const head = { ...chicken[0] };

  // تغيير عشوائي بسيط في الاتجاه
  const dirs = [
    { x: 1, y: 0 },
    { x: -1, y: 0 },
    { x: 0, y: 1 },
    { x: 0, y: -1 }
  ];

  direction = dirs[Math.floor(Math.random() * dirs.length)];

  const newHead = {
    x: Math.max(0, Math.min(cols - 1, head.x + direction.x)),
    y: Math.max(0, Math.min(rows - 1, head.y + direction.y))
  };

  chicken.unshift(newHead);
  chicken = chicken.slice(0, 6); // طول الدجاجة (زي snake)
}

function generateWorms(n) {
  const arr = [];
  for (let i = 0; i < n; i++) {
    arr.push({
      x: Math.floor(Math.random() * cols),
      y: Math.floor(Math.random() * rows)
    });
  }
  return arr;
}

// ===== SVG =====

let svg = `
<svg width="${cols * cell}" height="${rows * cell}" xmlns="http://www.w3.org/2000/svg">

  <rect width="100%" height="100%" fill="#0d1117"/>

  <!-- grid -->
  ${Array.from({ length: cols * rows })
    .map((_, i) => {
      const x = (i % cols) * cell;
      const y = Math.floor(i / cols) * cell;
      return `<rect x="${x}" y="${y}" width="30" height="30" fill="none" stroke="#1f2937"/>`;
    })
    .join("")}

  <!-- worms -->
  ${worms
    .map(
      w =>
        `<rect x="${w.x * cell}" y="${w.y * cell}" width="30" height="30" fill="#00ff88"/>`
    )
    .join("")}

  <!-- chicken -->
  ${chicken
    .map(
      (c, i) =>
        `<rect x="${c.x * cell}" y="${c.y * cell}" width="30" height="30"
        fill="${i === 0 ? "#ffd700" : "#ffcc00"}"/>`
    )
    .join("")}

  <!-- score -->
  <text x="10" y="20" fill="white" font-size="14">
    🐔 Score: ${score}
  </text>

</svg>
`;

fs.mkdirSync("dist", { recursive: true });
fs.writeFileSync("dist/chicken.svg", svg);

console.log("Chicken Snake generated!");
