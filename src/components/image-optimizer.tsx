"use client";

import { useState, useEffect } from "react";
import {
  Upload,
  Download,
  Smartphone,
  Monitor,
  Zap,
  Trash2,
  ImageIcon,
  Moon,
  Sun,
} from "lucide-react";
import Image from "next/image";
import Footer from "./Footer";
import EmptyState from "./EmptyState";
import ImagesGrid from "./ImagesGrid";

export interface ImageData {
  id: string;
  file: File;
  preview: string;
  width: number;
  height: number;
  sizeKB: number;
  format: string;
  score: number;
}

export default function ImageOptimizer() {
  const [images, setImages] = useState<ImageData[]>([]);
  const [isDragging, setIsDragging] = useState(false);
  const [isDark, setIsDark] = useState(false);

  useEffect(() => {
    const isDarkMode = document.documentElement.classList.contains("dark");
    setIsDark(isDarkMode);
  }, []);

  const toggleDarkMode = () => {
    const htmlElement = document.documentElement;
    htmlElement.classList.toggle("dark");
    setIsDark(!isDark);
    localStorage.setItem("theme", isDark ? "light" : "dark");
  };

  // ---------- Helpers ----------
  const calculateScore = (sizeKB: number, width: number) => {
    let score = 100;
    if (sizeKB > 500) score -= 40;
    else if (sizeKB > 300) score -= 25;
    else if (sizeKB > 200) score -= 10;

    if (width > 2000) score -= 15;
    else if (width > 1200) score -= 5;

    return Math.max(score, 10);
  };

  // ---------- Image Upload ----------
  const handleImages = (files: FileList | null | undefined) => {
    if (!files || files.length === 0) return;

    Array.from(files).forEach((file) => {
      if (!file.type.startsWith("image/")) return;

      const img = document.createElement("img") as HTMLImageElement;
      img.crossOrigin = "anonymous";
      const url = URL.createObjectURL(file);

      img.onload = () => {
        const sizeKB = +(file.size / 1024).toFixed(2);
        setImages((prev) => [
          ...prev,
          {
            id: crypto.randomUUID(),
            file,
            preview: url,
            width: img.width,
            height: img.height,
            sizeKB,
            format: file.type.replace("image/", "").toUpperCase(),
            score: calculateScore(sizeKB, img.width),
          },
        ]);
      };

      img.onerror = () => {
        URL.revokeObjectURL(url);
      };

      img.src = url;
    });
  };

  // ---------- UI ----------
  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-blue-50 to-slate-100 dark:from-slate-950 dark:via-slate-900 dark:to-slate-950 transition-colors">
      <div className="max-w-7xl mx-auto px-4 py-12">
        {/* Header with Theme Toggle */}
        <div className="flex items-center justify-between mb-12">
          <div className="flex items-center gap-4">
            <div className="relative w-20 h-20">
              <Image
                src="/Img-Metric-logo.png"
                alt="ImgMetric"
                fill
                className=""
              />
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

        {/* Subtitle */}
        <div className="mb-10">
          <p className="text-slate-600 dark:text-slate-400 text-lg">
            Analyze, compress, and optimize your images for web performance
          </p>
        </div>

        {/* Upload Area */}
        <div
          onDragOver={(e) => {
            e.preventDefault();
            setIsDragging(true);
          }}
          onDragLeave={() => setIsDragging(false)}
          onDrop={(e) => {
            e.preventDefault();
            setIsDragging(false);
            handleImages(e.dataTransfer?.files ?? null);
          }}
          className={`mb-12 relative rounded-2xl border-2 border-dashed p-8 transition-all ${
            isDragging
              ? "border-teal-500 bg-teal-50 dark:bg-teal-950/30"
              : "border-slate-300 dark:border-slate-700 bg-white dark:bg-slate-800 hover:border-teal-400 dark:hover:border-teal-500"
          }`}
        >
          <input
            type="file"
            accept="image/*"
            multiple
            onChange={(e) => handleImages(e.target.files)}
            className="absolute inset-0 opacity-0 cursor-pointer"
          />
          <div className="text-center">
            <div className="inline-flex items-center justify-center w-16 h-16 rounded-full bg-gradient-to-br from-teal-100 to-cyan-100 dark:from-teal-950 dark:to-cyan-950 mb-4">
              <Upload className="w-8 h-8 text-teal-600 dark:text-teal-400" />
            </div>
            <h2 className="text-xl font-semibold text-slate-900 dark:text-slate-100 mb-2">
              Drop your images here
            </h2>
            <p className="text-slate-600 dark:text-slate-400">
              or click to select files
            </p>
            <p className="text-sm text-slate-500 dark:text-slate-500 mt-2">
              Support for JPG, PNG, WebP, and other image formats
            </p>
          </div>
        </div>

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
