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
    <div className="mb-12 flex items-center justify-between">
      <div className="flex items-center gap-4">
        <div className="relative h-20 w-20">
          <Image src="/Img-Metric-logo.png" alt="ImgMetric" fill className="" />
        </div>
        <div>
          <h1 className="bg-gradient-to-r from-teal-600 to-cyan-600 bg-clip-text text-4xl font-bold text-transparent dark:from-teal-400 dark:to-cyan-400">
            ImgMetric
          </h1>
          <p className="text-slate-600 dark:text-slate-400">
            Smart image analysis & optimization
          </p>
        </div>
      </div>

      <button
        onClick={toggleDarkMode}
        className="rounded-lg border border-slate-200 bg-white p-3 transition-colors hover:border-teal-500 dark:border-slate-700 dark:bg-slate-800 dark:hover:border-teal-400"
        aria-label="Toggle dark mode"
      >
        {isDark ? (
          <Sun className="h-5 w-5 text-yellow-500" />
        ) : (
          <Moon className="h-5 w-5 text-slate-600" />
        )}
      </button>
    </div>
  );
}

export default Header;
