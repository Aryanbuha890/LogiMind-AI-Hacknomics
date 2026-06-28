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
  
  // Replace hardcoded stroke/fill in charts
  content = content.replace(/stroke="#334155"/g, 'stroke="#e2e8f0"');
  content = content.replace(/stroke="#1e293b"/g, 'stroke="#cbd5e1"');
  content = content.replace(/stroke="rgba\(255, 255, 255, 0\.1\)"/g, 'stroke="#e2e8f0"');
  content = content.replace(/stroke="rgba\(255,255,255,0\.1\)"/g, 'stroke="#e2e8f0"');
  content = content.replace(/stroke="rgba\(255, 255, 255, 0\.05\)"/g, 'stroke="#f1f5f9"');
  content = content.replace(/fill="#0F172A"/g, 'fill="#ffffff"');
  content = content.replace(/fill="#1e293b"/g, 'fill="#f8fafc"');
  
  // Custom tooltips styling
  content = content.replace(/color: "#f8fafc"/g, 'color: "#0f172a"');
  content = content.replace(/backgroundColor: "#0f172a"/g, 'backgroundColor: "#ffffff"');
  content = content.replace(/backgroundColor: "#0B1120"/g, 'backgroundColor: "#ffffff"');
  content = content.replace(/borderColor: "#1e293b"/g, 'borderColor: "#e2e8f0"');
  
  // Map Components (MapComponent.tsx usually has a style prop for mapbox)
  content = content.replace(/mapStyle="mapbox:\/\/styles\/mapbox\/dark-v11"/g, 'mapStyle="mapbox://styles/mapbox/light-v11"');

  if (content !== original) {
    fs.writeFileSync(file, content, 'utf-8');
  }
});
console.log('Fixed chart hardcoded colors.');
