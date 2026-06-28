import fs from 'fs';
let content = fs.readFileSync('src/routes/index.lazy.tsx', 'utf-8');

// Replace inline colors for ecosystem cards
content = content.replace(
  'color: isActive ? "#fff" : "rgba(255,255,255,0.7)"',
  'color: isActive ? "#fff" : "#475569"'
);
content = content.replace(
  'backgroundColor: isActive ? c.color : "rgba(255, 255, 255, 0.05)"',
  'backgroundColor: isActive ? c.color : "#F8FAFC"'
);
content = content.replace(
  'borderColor: isActive ? c.color : "rgba(255, 255, 255, 0.1)"',
  'borderColor: isActive ? c.color : "#E2E8F0"'
);
content = content.replace(
  'borderColor: isActive ? c.color : "rgba(255,255,255,0.08)"',
  'borderColor: isActive ? c.color : "#E2E8F0"'
);

// Platform section inline fixes (around line 3093, 3268, etc.)
content = content.replace(
  'background-color: hsla(240, 15%, 9%, 0.9);',
  'background-color: hsla(240, 15%, 98%, 0.9);'
);
content = content.replace(
  'box-shadow: 0px -16px 24px 0px rgba(255, 255, 255, 0.15) inset;',
  'box-shadow: 0px -16px 24px 0px rgba(0, 0, 0, 0.05) inset;'
);
content = content.replace(
  'rgba(255, 255, 255, 0.05),\n                                      rgba(255, 255, 255, 0.01)',
  'rgba(0, 0, 0, 0.03),\n                                      rgba(0, 0, 0, 0.01)'
);

fs.writeFileSync('src/routes/index.lazy.tsx', content, 'utf-8');
console.log('Fixed index.lazy.tsx inline styles');
