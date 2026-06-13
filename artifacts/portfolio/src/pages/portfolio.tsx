import React, { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { Github, Linkedin, ExternalLink, Moon, Sun, Mail, MapPin } from "lucide-react";
import profileData from "../../../../abhishek_profile.json";

export default function Portfolio() {
  const [isDark, setIsDark] = useState(false);

  useEffect(() => {
    if (isDark) {
      document.documentElement.classList.add("dark");
    } else {
      document.documentElement.classList.remove("dark");
    }
  }, [isDark]);

  return (
    <div className="min-h-screen font-sans">
      {/* Navbar */}
      <nav className="fixed top-0 w-full z-50 bg-background/80 backdrop-blur-md border-b">
        <div className="max-w-6xl mx-auto px-6 h-16 flex items-center justify-between">
          <span className="font-bold text-lg tracking-tight">AA.</span>
          <div className="flex items-center gap-6 text-sm font-medium">
            <a href="#about" className="hover:text-primary transition-colors">About</a>
            <a href="#experience" className="hover:text-primary transition-colors">Experience</a>
            <a href="#projects" className="hover:text-primary transition-colors">Projects</a>
            <button onClick={() => setIsDark(!isDark)} className="p-2 rounded-full hover:bg-muted transition-colors">
              {isDark ? <Sun size={18} /> : <Moon size={18} />}
            </button>
          </div>
        </div>
      </nav>

      {/* Main Content */}
      <main className="max-w-4xl mx-auto px-6 pt-32 pb-24 space-y-32">
        
        {/* Hero */}
        <section id="hero" className="space-y-6 pt-12">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
          >
            <h1 className="text-5xl md:text-7xl font-bold tracking-tighter text-primary">
              {profileData.profile.name}
            </h1>
            <p className="mt-6 text-xl md:text-2xl text-muted-foreground leading-relaxed max-w-2xl">
              Agritech Entrepreneur, Community Builder, and SEO Expert building the intersection of rural roots and digital ecosystems in Nepal.
            </p>
          </motion.div>
          
          <motion.div 
            className="flex gap-4 pt-4"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.2 }}
          >
            <a href={profileData.profile.linkedin} target="_blank" rel="noreferrer" className="flex items-center gap-2 px-4 py-2 bg-primary text-primary-foreground rounded-md hover:bg-primary/90 transition-colors">
              <Linkedin size={18} /> LinkedIn
            </a>
            <a href={profileData.profile.github} target="_blank" rel="noreferrer" className="flex items-center gap-2 px-4 py-2 bg-secondary text-secondary-foreground rounded-md hover:bg-secondary/90 transition-colors">
              <Github size={18} /> GitHub
            </a>
          </motion.div>
        </section>

        {/* About */}
        <section id="about">
          <h2 className="text-sm font-bold tracking-widest uppercase text-primary mb-6">About</h2>
          <p className="text-lg md:text-xl leading-relaxed text-foreground/90">
            I am a Nepal-based agritech entrepreneur and tech community leader. I scaled Himalaya Krishi from 25 to 220+ livestock using digital farm management, while simultaneously co-founding DEV Community Nepal to bridge rural tech talent with central ecosystems. After building SEO-driven digital growth systems at Hashtag Web Solutions and mentoring hundreds of students, my focus remains on sustainable impact and technological empowerment across Nepal.
          </p>
        </section>

        {/* Experience */}
        <section id="experience">
          <h2 className="text-sm font-bold tracking-widest uppercase text-primary mb-8">Experience</h2>
          <div className="space-y-12">
            {profileData.experience.map((exp: any, i: number) => (
              <motion.div 
                key={i}
                initial={{ opacity: 0, x: -20 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                className="relative pl-8 border-l-2 border-muted"
              >
                <div className="absolute w-3 h-3 bg-primary rounded-full -left-[7px] top-2 border-2 border-background" />
                <div className="flex flex-col md:flex-row md:items-baseline justify-between mb-2">
                  <h3 className="text-xl font-semibold">{exp.role}</h3>
                  <span className="text-sm text-muted-foreground font-mono mt-1 md:mt-0">{exp.startDate} - {exp.endDate}</span>
                </div>
                <div className="text-primary font-medium mb-4">{exp.organization} <span className="text-muted-foreground font-normal text-sm ml-2">({exp.type})</span></div>
                <p className="text-foreground/80 mb-4">{exp.summary}</p>
                {exp.impact && (
                  <ul className="list-none space-y-2 text-sm text-muted-foreground">
                    {exp.impact.map((imp: string, j: number) => (
                      <li key={j} className="flex gap-2">
                        <span className="text-primary mt-1">▹</span> {imp}
                      </li>
                    ))}
                  </ul>
                )}
              </motion.div>
            ))}
          </div>
        </section>

        {/* Projects */}
        <section id="projects">
          <h2 className="text-sm font-bold tracking-widest uppercase text-primary mb-8">Projects</h2>
          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-5">
            {profileData.projects.flatMap((cat: any) =>
              cat.items.map((item: any) => ({ ...item, category: cat.category }))
            ).map((item: any, i: number) => {
              const screenshotUrl = `https://api.microlink.io/?url=${encodeURIComponent(item.url)}&screenshot=true&meta=false&embed=screenshot.url`;
              const categoryColors: Record<string, string> = {
                "Personal Brand": "bg-emerald-100 text-emerald-800 dark:bg-emerald-900/40 dark:text-emerald-300",
                "SEO & Tools": "bg-blue-100 text-blue-800 dark:bg-blue-900/40 dark:text-blue-300",
                "Agriculture": "bg-lime-100 text-lime-800 dark:bg-lime-900/40 dark:text-lime-300",
                "Coffee & Training": "bg-amber-100 text-amber-800 dark:bg-amber-900/40 dark:text-amber-300",
                "Business & Corporate": "bg-slate-100 text-slate-700 dark:bg-slate-800 dark:text-slate-300",
              };
              const badgeClass = categoryColors[item.category] ?? "bg-muted text-muted-foreground";
              return (
                <motion.a
                  key={i}
                  href={item.url}
                  target="_blank"
                  rel="noreferrer"
                  data-testid={`card-project-${i}`}
                  className="group relative flex flex-col rounded-2xl overflow-hidden border bg-card shadow-sm hover:shadow-lg transition-shadow duration-300"
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: i * 0.04, duration: 0.4 }}
                >
                  {/* Screenshot image */}
                  <div className="relative w-full aspect-[16/9] bg-muted overflow-hidden">
                    <img
                      src={screenshotUrl}
                      alt={item.name}
                      className="w-full h-full object-cover object-top transition-transform duration-500 group-hover:scale-105"
                      onError={(e) => {
                        const el = e.currentTarget as HTMLImageElement;
                        el.style.display = "none";
                        const parent = el.parentElement;
                        if (parent) {
                          parent.style.background = "linear-gradient(135deg, hsl(var(--primary)/0.15), hsl(var(--primary)/0.05))";
                          const initials = document.createElement("span");
                          initials.textContent = item.name.charAt(0).toUpperCase();
                          initials.className = "absolute inset-0 flex items-center justify-center text-4xl font-bold text-primary/40";
                          parent.appendChild(initials);
                        }
                      }}
                    />
                    {/* Hover overlay */}
                    <div className="absolute inset-0 bg-foreground/0 group-hover:bg-foreground/20 transition-colors duration-300 flex items-center justify-center">
                      <div className="opacity-0 group-hover:opacity-100 transition-opacity duration-300 bg-background/90 rounded-full p-3 shadow-lg">
                        <ExternalLink size={20} className="text-foreground" />
                      </div>
                    </div>
                  </div>
                  {/* Card body */}
                  <div className="flex flex-col gap-2 p-4">
                    <span className={`self-start text-xs font-semibold px-2.5 py-0.5 rounded-full ${badgeClass}`}>
                      {item.category}
                    </span>
                    <span className="font-semibold text-base text-foreground leading-tight">{item.name}</span>
                    <span className="text-xs text-muted-foreground truncate">{item.url.replace(/^https?:\/\//, "")}</span>
                  </div>
                </motion.a>
              );
            })}
          </div>
        </section>

        {/* Volunteering */}
        <section id="volunteering">
          <h2 className="text-sm font-bold tracking-widest uppercase text-primary mb-8">Volunteering & Leadership</h2>
          <div className="grid md:grid-cols-2 gap-6">
            {profileData.volunteering.map((vol: any, i: number) => (
              <div key={i} className="p-6 rounded-2xl bg-card border shadow-sm">
                <div className="text-xs font-mono text-muted-foreground mb-2">{vol.date || vol.startDate}</div>
                <h3 className="font-bold text-lg leading-tight mb-1">{vol.role}</h3>
                <div className="text-primary text-sm mb-4">{vol.organization}</div>
                <p className="text-sm text-muted-foreground">{vol.summary}</p>
              </div>
            ))}
          </div>
        </section>

        {/* Highlights */}
        <section id="highlights">
          <h2 className="text-sm font-bold tracking-widest uppercase text-primary mb-8">Featured Highlights</h2>
          <div className="flex flex-wrap gap-2">
            {profileData.featuredHighlights.map((hl: string, i: number) => (
              <span key={i} className="px-4 py-2 bg-muted text-sm rounded-full font-medium text-foreground/80">
                {hl}
              </span>
            ))}
          </div>
        </section>

        {/* Recommendations */}
        <section id="recommendations">
          <h2 className="text-sm font-bold tracking-widest uppercase text-primary mb-8">Recommendations</h2>
          <div className="grid md:grid-cols-2 gap-6">
            {profileData.recommendations.map((rec: any, i: number) => (
              <div key={i} className="p-6 rounded-2xl bg-muted/30 border border-muted">
                <p className="italic text-sm text-foreground/80 mb-6">"{rec.excerpt}"</p>
                <div>
                  <div className="font-bold text-sm">{rec.name}</div>
                  <div className="text-xs text-muted-foreground mt-1 line-clamp-1">{rec.title}</div>
                </div>
              </div>
            ))}
          </div>
        </section>

      </main>

      {/* Footer */}
      <footer className="border-t bg-card py-12">
        <div className="max-w-4xl mx-auto px-6 flex flex-col md:flex-row justify-between items-center gap-6">
          <div className="text-center md:text-left">
            <div className="font-bold text-lg mb-1">{profileData.profile.name}</div>
            <div className="text-sm text-muted-foreground">Building the future of Nepal's tech and agriculture.</div>
          </div>
          <div className="flex gap-4">
            <a href={profileData.profile.linkedin} className="text-muted-foreground hover:text-primary transition-colors"><Linkedin size={20} /></a>
            <a href={profileData.profile.github} className="text-muted-foreground hover:text-primary transition-colors"><Github size={20} /></a>
            <a href={profileData.profile.website} className="text-muted-foreground hover:text-primary transition-colors"><ExternalLink size={20} /></a>
          </div>
        </div>
      </footer>
    </div>
  );
}
