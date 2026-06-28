import fs from 'fs';
let content = fs.readFileSync('src/routes/index.lazy.tsx', 'utf-8');

const map = {
  'bg-white/90': 'dark:bg-[#060814]/90',
  'bg-white/95': 'dark:bg-[#060814]/95',
  'bg-white': 'dark:bg-[#060814]',
  'bg-slate-50': 'dark:bg-[#020205]',
  'bg-slate-50/85': 'dark:bg-[#020205]/85',
  'text-slate-900': 'dark:text-white',
  'text-slate-800/90': 'dark:text-white/90',
  'text-slate-800': 'dark:text-white/95',
  'text-slate-700': 'dark:text-slate-300',
  'text-slate-600': 'dark:text-slate-400',
  'text-slate-500': 'dark:text-slate-400',
  'border-slate-200': 'dark:border-white/10',
  'border-slate-300': 'dark:border-white/20',
  'bg-slate-200': 'dark:bg-white/10',
  'bg-slate-100': 'dark:bg-white/5'
};

// Remove any existing dark classes from our map to reset
Object.values(map).forEach(darkClass => {
  content = content.split(' ' + darkClass).join('');
});

// Process them in length order (longest first)
const keys = Object.keys(map).sort((a,b) => b.length - a.length);

keys.forEach(lightClass => {
  const escapedClass = lightClass.replace(/\//g, '\\/');
  const regex = new RegExp('(["\' \\`\\n])' + escapedClass + '(?=["\' \\`\\n])', 'g');
  content = content.replace(regex, (match, prefix) => {
    return prefix + lightClass + ' ' + map[lightClass];
  });
});

fs.writeFileSync('src/routes/index.lazy.tsx', content, 'utf-8');
console.log('Foolproof replacement done');
