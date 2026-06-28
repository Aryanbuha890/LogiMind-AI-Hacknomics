import fs from 'fs';
let content = fs.readFileSync('src/components/AppSidebar.tsx', 'utf-8');

content = content.replace(
  '"bg-gradient-to-r from-white/15 via-white/10 to-transparent text-white shadow-[inset_0_1px_0_rgba(255,255,255,0.1)]"',
  '"bg-blue-50 text-blue-700 font-semibold shadow-sm border border-blue-100"'
);

content = content.replace(
  '"text-slate-700 hover:bg-slate-100 hover:text-white"',
  '"text-slate-600 hover:bg-slate-100 hover:text-blue-600"'
);

content = content.replace(
  '"bg-slate-100 text-cyan-300 ring-1 ring-white/15"',
  '"bg-blue-100 text-blue-700"'
);

content = content.replace(
  '"text-slate-600 group-hover:bg-slate-100 group-hover:text-white/90"',
  '"text-slate-500 group-hover:text-blue-600"'
);

content = content.replace(
  'text-white/90 overflow-hidden"',
  'text-slate-900 overflow-hidden"'
);

content = content.replace(
  'hover:bg-slate-100 hover:text-white"',
  'hover:bg-slate-100 hover:text-blue-600"'
);

fs.writeFileSync('src/components/AppSidebar.tsx', content, 'utf-8');
console.log('Updated AppSidebar');
