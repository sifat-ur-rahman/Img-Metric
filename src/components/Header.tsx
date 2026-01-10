import { Moon, Sun } from "lucide-react";
import Image from "next/image";
import React from "react";

function Header({
  isDark,
  setIsDark,
}: {
  isDark: boolean;
  setIsDark: React.Dispatch<React.SetStateAction<boolean>>;
}) {
  const toggleDarkMode = () => {
    const htmlElement = document.documentElement;
    htmlElement.classList.toggle("dark");
    setIsDark(!isDark);
    localStorage.setItem("theme", isDark ? "light" : "dark");
  };
  return (
    <div className="flex items-center justify-between mb-12">
      <div className="flex items-center gap-4">
        <div className="relative w-20 h-20">
          <Image src="/Img-Metric-logo.png" alt="ImgMetric" fill className="" />
        </div>
        <div>
          <h1 className="text-4xl font-bold bg-gradient-to-r from-teal-600 to-cyan-600 dark:from-teal-400 dark:to-cyan-400 bg-clip-text text-transparent">
            ImgMetric
          </h1>
          <p className="text-slate-600 dark:text-slate-400">
            Smart image analysis & optimization
          </p>
        </div>
      </div>

      <button
        onClick={toggleDarkMode}
        className="p-3 rounded-lg bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700 hover:border-teal-500 dark:hover:border-teal-400 transition-colors"
        aria-label="Toggle dark mode"
      >
        {isDark ? (
          <Sun className="w-5 h-5 text-yellow-500" />
        ) : (
          <Moon className="w-5 h-5 text-slate-600" />
        )}
      </button>
    </div>
  );
}

export default Header;
