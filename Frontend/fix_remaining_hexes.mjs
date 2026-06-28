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

const files = walk('src');
files.forEach(file => {
  let content = fs.readFileSync(file, 'utf-8');
  let original = content;

  content = content.replace(/bg-\[#0A0D1F\]/g, 'bg-white');
  content = content.replace(/bg-\[#070B19\]/g, 'bg-white');
  content = content.replace(/bg-\[#070b19\]/g, 'bg-white');
  content = content.replace(/bg-\[#05060f\]/g, 'bg-white');
  content = content.replace(/bg-\[#0f2a24\]/g, 'bg-emerald-50');
  content = content.replace(/bg-\[#153a30\]/g, 'bg-emerald-100');
  content = content.replace(/text-\[#cbd5e1\]/g, 'text-slate-600');
  content = content.replace(/text-slate-200/g, 'text-slate-800');
  
  if (content !== original) {
    fs.writeFileSync(file, content, 'utf-8');
  }
});
console.log('Fixed remaining hexes');
