import fs from 'fs';
let content = fs.readFileSync('src/routes/index.lazy.tsx', 'utf-8');

const navDefStr = 'function Nav() {';
const navDefReplacement = `
function Nav() {
  const [theme, setTheme] = useState(
    typeof window !== 'undefined' && document.documentElement.classList.contains('dark') ? 'dark' : 'light'
  );

  const toggleTheme = () => {
    if (theme === 'light') {
      document.documentElement.classList.add('dark');
      setTheme('dark');
    } else {
      document.documentElement.classList.remove('dark');
      setTheme('light');
    }
  };
`;

content = content.replace(navDefStr, navDefReplacement);

const toggleButton = `
          <button
            onClick={toggleTheme}
            className="flex h-9 w-9 items-center justify-center rounded-full border border-slate-200 dark:border-white/10 bg-white dark:bg-[#020205] text-slate-700 dark:text-slate-300 hover:text-blue-700 hover:bg-blue-50 dark:hover:bg-blue-500/20 transition cursor-pointer group shadow-sm mr-1"
            aria-label="Toggle Theme"
            title="Toggle Theme"
          >
            {theme === "light" ? (
              <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="lucide lucide-moon transition-all group-hover:-rotate-12"><path d="M12 3a6 6 0 0 0 9 9 9 9 0 1 1-9-9Z"/></svg>
            ) : (
              <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="lucide lucide-sun transition-all group-hover:rotate-45"><circle cx="12" cy="12" r="4"/><path d="M12 2v2"/><path d="M12 20v2"/><path d="m4.93 4.93 1.41 1.41"/><path d="m17.66 17.66 1.41 1.41"/><path d="M2 12h2"/><path d="M20 12h2"/><path d="m6.34 17.66-1.41 1.41"/><path d="m19.07 4.93-1.41 1.41"/></svg>
            )}
          </button>
          <Link
            to="/auth/login"
            className="hidden md:inline-flex`;

// Use regex to replace the first Link with className="hidden md:inline-flex
content = content.replace(/<Link\s+to="\/auth\/login"\s+className="hidden md:inline-flex/, toggleButton);

fs.writeFileSync('src/routes/index.lazy.tsx', content, 'utf-8');
console.log('Added Theme toggle button');
