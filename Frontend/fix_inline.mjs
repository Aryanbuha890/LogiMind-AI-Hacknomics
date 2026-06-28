import fs from 'fs';
let content = fs.readFileSync('src/routes/index.lazy.tsx', 'utf-8');

// Replace static hsla in style block with CSS variable usage
content = content.replace(
  /background-color: hsla\(240, 15%, 98%, 0\.9\);/,
  'background-color: var(--garud-card-bg);'
);
content = content.replace(
  /box-shadow: 0px -16px 24px 0px rgba\(0, 0, 0, 0\.05\) inset;/,
  'box-shadow: var(--garud-card-shadow);'
);

// Add the variables to the top of the <style> block
const styleInject = `
        :root {
          --garud-card-bg: hsla(240, 15%, 98%, 0.9);
          --garud-card-shadow: 0px -16px 24px 0px rgba(0, 0, 0, 0.05) inset;
          --garud-radial-bg: hsla(240, 15%, 98%, 1);
          --eco-inactive-text: #475569;
          --eco-inactive-bg: #F8FAFC;
          --eco-inactive-border: #E2E8F0;
        }
        .dark {
          --garud-card-bg: hsla(240, 15%, 9%, 0.9);
          --garud-card-shadow: 0px -16px 24px 0px rgba(255, 255, 255, 0.15) inset;
          --garud-radial-bg: hsla(240, 15%, 9%, 1);
          --eco-inactive-text: rgba(255,255,255,0.7);
          --eco-inactive-bg: rgba(255, 255, 255, 0.05);
          --eco-inactive-border: rgba(255, 255, 255, 0.1);
        }
`;
content = content.replace(
  /<style>{`/,
  '<style>{`' + styleInject
);

// Replace hsla inside the inline style backgroundImage
content = content.replace(
  /hsla\(240, 15%, 98%, 1\)/g,
  'var(--garud-radial-bg)'
);

content = content.replace(/color: isActive \? "#fff" : "#475569"/g, 'color: isActive ? "#fff" : "var(--eco-inactive-text)"');
content = content.replace(/backgroundColor: isActive \? c\.color : "#F8FAFC"/g, 'backgroundColor: isActive ? c.color : "var(--eco-inactive-bg)"');
content = content.replace(/borderColor: isActive \? c\.color : "#E2E8F0"/g, 'borderColor: isActive ? c.color : "var(--eco-inactive-border)"');

fs.writeFileSync('src/routes/index.lazy.tsx', content, 'utf-8');
console.log('Fixed inline hsla and ecosystem colors');
