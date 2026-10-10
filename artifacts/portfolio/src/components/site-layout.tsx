import { useEffect, useState, type ReactNode } from "react";
import { Mail, Menu, Moon, Sun, X } from "lucide-react";
import { FOOTER_LINKS, NAV_LINKS } from "@/lib/site";

function useTheme() {
  const [dark, setDark] = useState(false);

  useEffect(() => {
    const saved = localStorage.getItem("theme");
    const initial = saved === "dark";
    setDark(initial);
    document.documentElement.classList.toggle("dark", initial);
  }, []);

  const toggle = () => {
    setDark((prev) => {
      const next = !prev;
      document.documentElement.classList.toggle("dark", next);
      localStorage.setItem("theme", next ? "dark" : "light");
      return next;
    });
  };

  return { dark, toggle };
}

export default function SiteLayout({ children }: { children: ReactNode }) {
  const { dark, toggle } = useTheme();
  const [menuOpen, setMenuOpen] = useState(false);

  return (
    <div className="min-h-screen bg-background text-foreground noise-overlay">
      <a
        href="#main"
        className="fixed left-3 top-3 z-skip -translate-y-24 rounded-md bg-primary px-4 py-2 text-primary-foreground transition focus:translate-y-0"
      >
        Skip to content
      </a>

      <header className="sticky top-0 z-nav border-b bg-background/90 backdrop-blur-xl">
        <div className="mx-auto flex h-16 max-w-7xl items-center justify-between px-5 md:px-8">
          <a href="/" className="font-heading text-lg font-bold tracking-tight" aria-label="Abhishek Adhikari — home">
            Abhishek Adhikari<span className="text-primary">.</span>
          </a>

          <nav aria-label="Primary navigation" className="hidden items-center gap-1 lg:flex">
            {NAV_LINKS.map((link) => (
              <a
                key={link.href}
                href={link.href}
                className="rounded-md px-3 py-2 text-sm font-medium text-muted-foreground transition hover:bg-muted/60 hover:text-foreground"
              >
                {link.label}
              </a>
            ))}
            <button
              onClick={toggle}
              aria-label={dark ? "Switch to light mode" : "Switch to dark mode"}
              className="ml-1 rounded-md border p-2 text-muted-foreground transition hover:bg-muted hover:text-foreground"
            >
              {dark ? <Sun size={17} /> : <Moon size={17} />}
            </button>
          </nav>

          <div className="flex items-center gap-2 lg:hidden">
            <button
              onClick={toggle}
              aria-label={dark ? "Switch to light mode" : "Switch to dark mode"}
              className="rounded-md border p-2"
            >
              {dark ? <Sun size={17} /> : <Moon size={17} />}
            </button>
            <button
              onClick={() => setMenuOpen((v) => !v)}
              aria-expanded={menuOpen}
              aria-label={menuOpen ? "Close menu" : "Open menu"}
              className="rounded-md border p-2"
            >
              {menuOpen ? <X size={19} /> : <Menu size={19} />}
            </button>
          </div>
        </div>

        {menuOpen && (
          <nav aria-label="Mobile navigation" className="border-t bg-background px-5 py-4 lg:hidden">
            <div className="mx-auto grid max-w-7xl gap-1">
              {NAV_LINKS.map((link) => (
                <a
                  key={link.href}
                  href={link.href}
                  onClick={() => setMenuOpen(false)}
                  className="rounded-md px-3 py-2.5 text-sm font-medium text-muted-foreground hover:bg-muted/60 hover:text-foreground"
                >
                  {link.label}
                </a>
              ))}
            </div>
          </nav>
        )}
      </header>

      <main id="main">{children}</main>

      <footer className="border-t bg-card/60">
        <div className="mx-auto grid max-w-7xl gap-10 px-5 py-14 md:px-8 lg:grid-cols-[1.2fr_2fr]">
          <div>
            <div className="font-heading text-lg font-bold">Abhishek Adhikari</div>
            <p className="mt-2 max-w-sm text-sm text-muted-foreground">
              AI trainer, prompt engineering practitioner, open-source contributor and agritech entrepreneur from Hetauda, Nepal.
            </p>
            <a
              href="mailto:abhishekadhikari1254@gmail.com"
              className="mt-4 inline-flex items-center gap-2 text-sm font-medium text-primary hover:underline"
            >
              <Mail size={15} /> abhishekadhikari1254@gmail.com
            </a>
          </div>
          <nav aria-label="Footer navigation" className="grid grid-cols-2 gap-x-6 gap-y-2 sm:grid-cols-3">
            {FOOTER_LINKS.map((link) => (
              <a
                key={link.href}
                href={link.href}
                className="text-sm text-muted-foreground transition hover:text-foreground"
              >
                {link.label}
              </a>
            ))}
          </nav>
        </div>
        <div className="border-t">
          <div className="mx-auto flex max-w-7xl flex-col justify-between gap-2 px-5 py-5 text-xs text-muted-foreground sm:flex-row md:px-8">
            <p>© {new Date().getFullYear()} Abhishek Adhikari · Nepal</p>
            <p>AI training, prompt engineering and open-source AI skills.</p>
          </div>
        </div>
      </footer>
    </div>
  );
}
