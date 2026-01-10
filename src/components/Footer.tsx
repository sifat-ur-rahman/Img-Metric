import React from "react";

function Footer() {
  return (
    <footer className="mt-16 border-t border-slate-200 dark:border-slate-700 bg-slate-50 dark:bg-slate-800/50">
      <div className="max-w-7xl mx-auto px-4 py-8">
        <div className="flex flex-col md:flex-row items-center justify-between gap-6">
          <div>
            <p className="text-slate-700 dark:text-slate-300 font-semibold mb-1">
              ImgMetric
            </p>
            <p className="text-sm text-slate-600 dark:text-slate-400">
              Intelligent image optimization for modern web applications
            </p>
          </div>
          <div className="text-center md:text-right">
            <p className="text-sm text-slate-600 dark:text-slate-400">
              Developed with care by{" "}
              <span className="font-semibold text-slate-900 dark:text-slate-100">
                Sifat
              </span>
            </p>
            <p className="text-xs text-slate-500 dark:text-slate-500 mt-1">
              © 2026 ImgMetric. All rights reserved.
            </p>
          </div>
        </div>
      </div>
    </footer>
  );
}

export default Footer;
