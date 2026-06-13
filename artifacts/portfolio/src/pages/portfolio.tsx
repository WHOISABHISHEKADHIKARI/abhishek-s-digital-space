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
            I am a Nepal-based agritech entrepreneur and tech community leader. I scaled Himalaya Krishi from 25 to 220+ livestock using digital farm management, while simultaneously co-founding DEV Community Nepal to bridge rural tech talent with central ecosystems. Whether I'm building SEO-driven digital growth systems at Hashtag Web Solutions or mentoring hundreds of students, my focus is on sustainable impact and technological empowerment.
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
          <div className="grid md:grid-cols-2 gap-6">
            {profileData.projects.map((cat: any, i: number) => (
              <div key={i} className="p-6 rounded-2xl bg-card border shadow-sm">
                <h3 className="font-bold text-lg mb-4 text-foreground">{cat.category}</h3>
                <div className="space-y-3">
                  {cat.items.map((item: any, j: number) => (
                    <a key={j} href={item.url} target="_blank" rel="noreferrer" className="flex items-center justify-between group p-3 rounded-lg hover:bg-muted/50 transition-colors">
                      <span className="font-medium">{item.name}</span>
                      <ExternalLink size={16} className="text-muted-foreground opacity-0 group-hover:opacity-100 transition-opacity" />
                    </a>
                  ))}
                </div>
              </div>
            ))}
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
