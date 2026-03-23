import Link from "next/link";
import React from "react";

function Footer() {
  return (
    <footer className="mt-16 border-t border-slate-200 bg-slate-50 dark:border-slate-700 dark:bg-slate-800/50">
      <div className="mx-auto max-w-7xl px-4 py-8">
        <div className="flex flex-col items-center justify-between gap-6 md:flex-row">
          <div>
            <p className="mb-1 font-semibold text-slate-700 dark:text-slate-300">
              ImgMetric
            </p>
            <p className="text-sm text-slate-600 dark:text-slate-400">
              Intelligent image optimization for modern web applications
            </p>
          </div>
          <div className="text-center md:text-right">
            <p className="text-sm text-slate-600 dark:text-slate-400">
              Developed with care by{" "}
              <Link
                target="_blank"
                href="https://sifat-ur-rahman.vercel.app/"
                className="font-semibold text-slate-900 dark:text-slate-100"
              >
                Sifat
              </Link>
            </p>
            <p className="mt-1 text-xs text-slate-500 dark:text-slate-500">
              © {new Date().getFullYear()} ImgMetric. All rights reserved.
            </p>
          </div>
        </div>
      </div>
    </footer>
  );
}

export default Footer;
