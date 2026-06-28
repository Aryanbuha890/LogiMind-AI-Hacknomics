import fs from 'fs';
let content = fs.readFileSync('src/routes/index.lazy.tsx', 'utf-8');

const navVars = `
        :root {
          --nav-bg: linear-gradient(135deg, rgba(255,255,255,0.72) 0%, rgba(248,250,252,0.62) 45%, rgba(255,255,255,0.72) 100%);
        }
        .dark {
          --nav-bg: linear-gradient(135deg, rgba(2,2,5,0.72) 0%, rgba(2,2,5,0.62) 45%, rgba(2,2,5,0.72) 100%);
        }
`;
content = content.replace(
  /<style>{`/,
  '<style>{`' + navVars
);

const searchStr = `"linear-gradient(135deg, rgba(255,255,255,0.72) 0%, rgba(248,250,252,0.62) 45%, rgba(255,255,255,0.72) 100%)"`;
content = content.replace(searchStr, '"var(--nav-bg)"');

fs.writeFileSync('src/routes/index.lazy.tsx', content, 'utf-8');
console.log('Fixed Nav background');
