import fs from 'fs';
let content = fs.readFileSync('src/routes/app/docs-ai.lazy.tsx', 'utf-8');
content = content.replace(
  '<div className="dark flex h-screen flex-col bg-[#070B19] text-slate-900 overflow-hidden">',
  '<div className="flex h-screen flex-col bg-slate-50 text-slate-900 overflow-hidden">'
);
fs.writeFileSync('src/routes/app/docs-ai.lazy.tsx', content, 'utf-8');
console.log('Fixed docs-ai.lazy.tsx');
