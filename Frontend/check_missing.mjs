import fs from 'fs';

const files = ['src/routes/index.lazy.tsx', 'src/components/StartupSections.tsx', 'src/components/Footer.tsx'];

files.forEach(file => {
  const content = fs.readFileSync(file, 'utf-8');
  let missing = [];
  const regex = /\b(text-slate-[\d]+(?:\/\d+)?|bg-white(?:\/\d+)?|bg-slate-[\d]+(?:\/\d+)?)\b/g;
  let match;
  while ((match = regex.exec(content)) !== null) {
    const substr = content.substring(match.index, match.index + 50);
    // If the next 50 chars don't contain 'dark:', it's highly likely missing a dark variant
    if (!substr.includes('dark:')) {
      missing.push(match[1]);
    }
  }
  if (missing.length > 0) {
    console.log(file, [...new Set(missing)]);
  }
});
