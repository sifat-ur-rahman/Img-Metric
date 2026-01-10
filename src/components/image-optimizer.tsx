"use client";

import { useState, useEffect } from "react";
import Footer from "./Footer";
import EmptyState from "./EmptyState";
import ImagesGrid from "./ImagesGrid";
import Header from "./Header";
import UploadArea from "./UploadArea";

export default function ImageOptimizer() {
  const [images, setImages] = useState<ImageData[]>([]);

  const [isDark, setIsDark] = useState(false);

  useEffect(() => {
    const isDarkMode = document.documentElement.classList.contains("dark");
    setIsDark(isDarkMode);
  }, []);

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-blue-50 to-slate-100 dark:from-slate-950 dark:via-slate-900 dark:to-slate-950 transition-colors">
      <div className="max-w-7xl mx-auto px-4 py-12">
        {/* Header with Theme Toggle */}
        <Header isDark={isDark} setIsDark={setIsDark} />

        {/* Subtitle */}
        <div className="mb-10">
          <p className="text-slate-600 dark:text-slate-400 text-lg">
            Analyze, compress, and optimize your images for web performance
          </p>
        </div>

        {/* Upload Area */}
        <UploadArea setImages={setImages} />

        {/* Images Grid */}
        {images.length > 0 && (
          <ImagesGrid images={images} setImages={setImages} />
        )}

        {/* Empty State */}
        {images.length === 0 && <EmptyState />}
      </div>

      <Footer />
    </div>
  );
}
