import fs from 'fs';

let css = fs.readFileSync('src/styles.css', 'utf-8');

const newRoot = `:root {
  --radius: 0.75rem;

  /* Brand */
  --ink: #0F172A;
  --ink-2: #475569;
  --grid: rgba(15, 76, 129, 0.08);

  --background: #f8fafc;
  --surface: #ffffff;
  --surface-2: #f1f5f9;
  --glass: rgba(255, 255, 255, 0.7);
  --foreground: #0F172A;

  --card: #ffffff;
  --card-foreground: #0F172A;
  --popover: #ffffff;
  --popover-foreground: #0F172A;

  --primary: #0F4C81;
  --primary-foreground: #ffffff;

  --secondary: #0284C7;
  --secondary-foreground: #ffffff;

  --accent: #0284C7;
  --accent-foreground: #ffffff;

  --muted: #f1f5f9;
  --muted-foreground: #475569;

  --destructive: #DC2626;
  --destructive-foreground: #ffffff;
  --success: #16A34A;
  --warning: #F59E0B;

  --border: #e2e8f0;
  --input: #e2e8f0;
  --ring: #0F4C81;

  --electric: #0284C7;
  --violet: #0F4C81;

  /* Charts */
  --chart-1: #0F4C81;
  --chart-2: #0284C7;
  --chart-3: #0F766E;
  --chart-4: #14B8A6;
  --chart-5: #F59E0B;

  /* Sidebar */
  --sidebar: #ffffff;
  --sidebar-foreground: #0F172A;
  --sidebar-primary: #0F4C81;
  --sidebar-primary-foreground: #ffffff;
  --sidebar-accent: rgba(2, 132, 199, 0.1);
  --sidebar-accent-foreground: #0284C7;
  --sidebar-border: #e2e8f0;
  --sidebar-ring: #0284C7;

  --gradient-primary: linear-gradient(135deg, #0284C7, #0F4C81);
  --gradient-aurora:
    radial-gradient(60% 80% at 20% 10%, rgba(2, 132, 199, 0.1), transparent 60%),
    radial-gradient(50% 70% at 90% 20%, rgba(15, 76, 129, 0.05), transparent 60%);
  --gradient-hero:
    radial-gradient(80% 60% at 50% 0%, rgba(2, 132, 199, 0.1), transparent 65%),
    radial-gradient(60% 50% at 50% 30%, rgba(15, 76, 129, 0.05), transparent 70%);
  --shadow-glow:
    0 4px 20px -2px rgba(2, 132, 199, 0.15),
    0 8px 16px -4px rgba(15, 76, 129, 0.1);
  --shadow-card: 0 1px 3px 0 rgba(0, 0, 0, 0.1), 0 1px 2px -1px rgba(0, 0, 0, 0.1);
}`;

css = css.replace(/:root\s*\{[^}]+\}/, newRoot);
css = css.replace(/\.dark\s*\{[^}]+\}/, '');

fs.writeFileSync('src/styles.css', css, 'utf-8');
console.log('Updated styles.css theme blocks');
