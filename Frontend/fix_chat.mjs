import fs from 'fs';
let content = fs.readFileSync('src/routes/app/copilot.lazy.tsx', 'utf-8');

// Update user bubble from teal to light blue
content = content.replace(
  'bg-[#E0F2F1] text-[#1A1A2E]',
  'bg-blue-100 text-blue-900'
);

content = content.replace(
  'bg-[#0D9488] text-white',
  'bg-blue-600 text-white'
);

content = content.replace(
  'from-[#2563EB] to-[#0D9488]',
  'from-[#0F4C81] to-[#0284C7]'
);

fs.writeFileSync('src/routes/app/copilot.lazy.tsx', content, 'utf-8');
console.log('Fixed chat colors in copilot');
