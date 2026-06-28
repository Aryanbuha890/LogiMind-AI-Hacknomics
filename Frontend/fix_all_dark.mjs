import fs from 'fs';
import path from 'path';

const map = {
  'bg-white/90': 'dark:bg-[#060814]/90',
  'bg-white/95': 'dark:bg-[#060814]/95',
  'bg-white': 'dark:bg-[#060814]',
  'bg-slate-50/85': 'dark:bg-[#020205]/85',
  'bg-slate-50': 'dark:bg-[#020205]',
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

const keys = Object.keys(map).sort((a,b) => b.length - a.length);

function processFile(filePath) {
  if (!fs.existsSync(filePath)) return;
  let content = fs.readFileSync(filePath, 'utf-8');

  // Reset first
  Object.values(map).forEach(darkClass => {
    content = content.split(' ' + darkClass).join('');
  });

  // Apply
  keys.forEach(lightClass => {
    const escapedClass = lightClass.replace(/\//g, '\\/');
    const regex = new RegExp('(["\' \\`\\n])' + escapedClass + '(?=["\' \\`\\n])', 'g');
    content = content.replace(regex, (match, prefix) => {
      return prefix + lightClass + ' ' + map[lightClass];
    });
  });

  fs.writeFileSync(filePath, content, 'utf-8');
  console.log('Fixed', filePath);
}

const files = [
  'src/routes/index.lazy.tsx',
  'src/components/Footer.tsx',
  'src/components/StartupSections.tsx'
];

files.forEach(processFile);

// Now for styles.css custom components
let css = fs.readFileSync('src/styles.css', 'utf-8');
const darkOverrides = `
.dark .platform-card {
  background: linear-gradient(180deg, rgba(255,255,255,0.03) 0%, rgba(255,255,255,0.01) 100%);
  border-color: rgba(255, 255, 255, 0.05);
}
.dark .platform-card:hover {
  border-color: rgba(255, 255, 255, 0.2);
}
.dark .platform-card::after {
  background: linear-gradient(105deg, transparent 40%, rgba(255,255,255,0.03) 45%, rgba(255, 255, 255, 0.1) 50%, rgba(255,255,255,0.03) 55%, transparent 60%);
}
.dark .platform-card-title {
  color: #F8FAFC;
}
.dark .platform-card-desc {
  color: #94A3B8;
}
.dark .platform-card-index {
  color: rgba(255, 255, 255, 0.05);
}
`;

if (!css.includes('.dark .platform-card-title')) {
  css += '\n' + darkOverrides;
  fs.writeFileSync('src/styles.css', css, 'utf-8');
  console.log('Added platform-card dark overrides');
}

