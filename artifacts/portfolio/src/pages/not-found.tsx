import React, { useState, useEffect } from "react";
import { motion } from "motion/react";
import { Home, ArrowLeft, Frown } from "lucide-react";
import ErrorBoundary from "../components/error-boundary";

export default function NotFound() {
  const [isDark, setIsDark] = useState(false);

  useEffect(() => {
    setIsDark(document.documentElement.classList.contains("dark"));
  }, []);

  useEffect(() => {
    const observer = new MutationObserver(() => {
      setIsDark(document.documentElement.classList.contains("dark"));
    });
    observer.observe(document.documentElement, { attributes: true, attributeFilter: ["class"] });
    return () => observer.disconnect();
  }, []);

  return (
    <ErrorBoundary section="404">
    <div className={`min-h-screen flex items-center justify-center p-6 ${isDark ? "bg-[#1a1a1a]" : "bg-[#f3efe6]"}`}>
      <div className="max-w-md w-full text-center">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
        >
          <div className="mb-6 flex justify-center">
            <div className={`w-24 h-24 rounded-full flex items-center justify-center ${isDark ? "bg-white/10" : "bg-[#1a1a1a]/5"}`}>
              <Frown size={48} className={isDark ? "text-white/40" : "text-[#1a1a1a]/40"} />
            </div>
          </div>
          <h1 className={`text-7xl font-bold tracking-tight mb-2 ${isDark ? "text-white" : "text-[#1a1a1a]"}`}>
            404
          </h1>
          <p className={`text-lg mb-2 font-medium ${isDark ? "text-white/70" : "text-[#1a1a1a]/70"}`}>
            Page not found
          </p>
          <p className={`text-sm mb-8 leading-relaxed ${isDark ? "text-white/50" : "text-[#1a1a1a]/50"}`}>
            The page you are looking for does not exist or has been moved.
            <br />
            This portfolio lives on a single page — try navigating from the home page.
          </p>
          <div className="flex items-center justify-center gap-3">
            <a
              href="/"
              className={`inline-flex items-center gap-2 px-5 py-2.5 rounded-lg text-sm font-medium transition-all duration-200 active:scale-[0.97] ${
                isDark
                  ? "bg-white text-[#1a1a1a] hover:bg-white/90"
                  : "bg-[#1a1a1a] text-white hover:bg-[#1a1a1a]/90"
              }`}
            >
              <Home size={16} /> Home
            </a>
            <button
              onClick={() => window.history.back()}
              className={`inline-flex items-center gap-2 px-5 py-2.5 rounded-lg text-sm font-medium transition-all duration-200 active:scale-[0.97] ${
                isDark
                  ? "bg-white/10 text-white hover:bg-white/20"
                  : "bg-[#1a1a1a]/10 text-[#1a1a1a] hover:bg-[#1a1a1a]/20"
              }`}
            >
              <ArrowLeft size={16} /> Go back
            </button>
          </div>
        </motion.div>
      </div>
    </div>
    </ErrorBoundary>
  );
}
