import fs from 'fs';

const files = ['src/routes/index.lazy.tsx', 'src/components/StartupSections.tsx', 'src/components/Footer.tsx'];

files.forEach(file => {
  const content = fs.readFileSync(file, 'utf-8');
  // Match things like text-slate-900, text-slate-800/95, bg-white, bg-white/90, bg-slate-50
  // which are NOT followed immediately by dark: (using a naive check)
  const matches = content.match(/\b(text-slate-[\d]+(?:\/\d+)?|bg-white(?:\/\d+)?|bg-slate-[\d]+(?:\/\d+)?)\b/g);
  if (matches) {
    // Let's manually filter ones that don't have a corresponding dark: in the same line or nearby string
    // A simpler way is just to log all unique ones to see what we missed in our map
    const unique = [...new Set(matches)];
    console.log(file, unique);
  }
});
