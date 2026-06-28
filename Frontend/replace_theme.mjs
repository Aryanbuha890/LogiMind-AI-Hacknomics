import fs from 'fs';
import path from 'path';

function walk(dir, fileList = []) {
  const files = fs.readdirSync(dir);
  for (const file of files) {
    const stat = fs.statSync(path.join(dir, file));
    if (stat.isDirectory()) {
      if (file !== 'node_modules' && file !== '.git') {
        walk(path.join(dir, file), fileList);
      }
    } else if (file.endsWith('.tsx') || file.endsWith('.ts')) {
      fileList.push(path.join(dir, file));
    }
  }
  return fileList;
}

const bgMap = {
  'bg-[#05060F]': 'bg-slate-50',
  'bg-[#07091a]': 'bg-slate-50',
  'bg-[#070913]': 'bg-slate-50',
  'bg-[#090f22]': 'bg-slate-50',
  'bg-[#0B1A33]': 'bg-slate-50',
  'bg-[#0a1124]': 'bg-white',
  'bg-[#0f1730]': 'bg-white',
  'bg-[#1a1a24]': 'bg-white',
  'bg-[#0B1024]': 'bg-white',
  'bg-[#080A16]': 'bg-white',
  'bg-[#050B1A]': 'bg-white',
  'bg-[#0c0d16]': 'bg-white',
  'bg-[#050A1A]': 'bg-white',
  'bg-[#0A0E1F]': 'bg-white',
  'bg-[#0a1128]': 'bg-white',
  'bg-[#0b1223]': 'bg-white',
  'bg-[#0d162d]': 'bg-white',
  'bg-[#0e162d]': 'bg-white',
  'bg-[#0f1733]': 'bg-white',
  'bg-[#0f1a38]': 'bg-white',
  'bg-[#060b18]': 'bg-white',
  'bg-[#1A1A2E]': 'bg-white',
  'bg-[#0F172A]': 'bg-slate-50',
  'bg-slate-900': 'bg-white',
  'bg-slate-800': 'bg-white',
  'bg-slate-950': 'bg-slate-50',
  'bg-slate-800/50': 'bg-slate-100',
  'bg-white/5': 'bg-slate-100',
  'bg-white/10': 'bg-slate-100',
  'bg-white/[0.02]': 'bg-slate-50',
  'bg-white/[0.03]': 'bg-slate-100',
  'bg-white/[0.04]': 'bg-slate-100',
  'bg-white/[0.05]': 'bg-slate-100',
  'bg-white/[0.06]': 'bg-white',
  'bg-white/[0.08]': 'bg-slate-100',
  'bg-white/[0.01]': 'bg-transparent',
};

const textMap = {
  'text-slate-100': 'text-slate-900',
  'text-slate-200': 'text-slate-800',
  'text-slate-300': 'text-slate-700',
  'text-slate-400': 'text-slate-600',
  'text-white/80': 'text-slate-700',
  'text-white/75': 'text-slate-700',
  'text-white/70': 'text-slate-700',
  'text-white/65': 'text-slate-600',
  'text-white/60': 'text-slate-600',
  'text-white/55': 'text-slate-600',
  'text-white/50': 'text-slate-500',
  'text-white/45': 'text-slate-500',
  'text-white/40': 'text-slate-500',
  'text-white/35': 'text-slate-500',
  'text-white/30': 'text-slate-500',
  'text-white/20': 'text-slate-400',
  'text-[#c8d4e8]': 'text-slate-600',
  'text-[#05060F]': 'text-white', // Reverse since white bg uses dark text, dark buttons should use white text
};

const borderMap = {
  'border-white/10': 'border-slate-200',
  'border-white/5': 'border-slate-200',
  'border-white/8': 'border-slate-200',
  'border-white/15': 'border-slate-200',
  'border-white/20': 'border-slate-200',
  'border-white/30': 'border-slate-200',
  'border-white/50': 'border-slate-300',
  'border-slate-800': 'border-slate-200',
  'border-slate-700': 'border-slate-200',
  'divide-white/10': 'divide-slate-200',
  'divide-slate-800': 'divide-slate-200',
};

const hoverBgMap = {
  'hover:bg-slate-800': 'hover:bg-slate-100',
  'hover:bg-slate-800/50': 'hover:bg-slate-100/50',
  'hover:bg-white/5': 'hover:bg-slate-100',
  'hover:bg-white/10': 'hover:bg-slate-100',
  'hover:bg-white/20': 'hover:bg-slate-200',
  'hover:bg-white/[0.08]': 'hover:bg-slate-100',
};

const files = walk('src');

files.forEach(file => {
  let content = fs.readFileSync(file, 'utf-8');
  let original = content;

  // Replace backgrounds
  for (const [key, value] of Object.entries(bgMap)) {
    content = content.split(key).join(value);
  }

  // Replace texts
  for (const [key, value] of Object.entries(textMap)) {
    content = content.split(key).join(value);
  }

  // Replace borders
  for (const [key, value] of Object.entries(borderMap)) {
    content = content.split(key).join(value);
  }

  // Replace hover bgs
  for (const [key, value] of Object.entries(hoverBgMap)) {
    content = content.split(key).join(value);
  }

  const lines = content.split('\n');
  const newLines = lines.map(line => {
    if (line.includes('bg-blue') || line.includes('bg-primary') || line.includes('bg-teal') || line.includes('bg-[#0d9488]') || line.includes('linear-gradient') || line.includes('from-') || line.includes('bg-[#2563eb]')) {
      return line; 
    }
    return line.replace(/(?<!\S)text-white(?!\/)/g, 'text-slate-900');
  });
  content = newLines.join('\n');

  // Fix shadow colors
  content = content.replace(/shadow-\[0_20px_50px_rgba\(0,0,0,0\.5\)\]/g, 'shadow-lg');
  content = content.replace(/shadow-\[0_20px_45px_rgba\(0,0,0,0\.6\)\]/g, 'shadow-lg');
  content = content.replace(/shadow-2xl shadow-black\/50/g, 'shadow-xl shadow-slate-200/50');
  content = content.replace(/shadow-\[0_0_15px_rgba\(56,189,248,0\.15\)\]/g, 'shadow-md shadow-sky-100');

  // Check specific hex colors left
  content = content.replace(/bg-\[#0b1223\]/gi, 'bg-white');
  content = content.replace(/bg-\[#090f22\]/gi, 'bg-slate-50');
  content = content.replace(/bg-\[#0B1120\]/gi, 'bg-slate-50');
  
  if (content !== original) {
    fs.writeFileSync(file, content, 'utf-8');
  }
});
console.log('Done mapping tailwind classes.');
