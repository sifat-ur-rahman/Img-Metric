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

interface ImageData {
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

  const getScoreColor = (score: number) => {
    if (score >= 80) return "from-emerald-400 to-teal-500";
    if (score >= 60) return "from-blue-400 to-cyan-500";
    if (score >= 40) return "from-yellow-400 to-orange-500";
    return "from-red-400 to-rose-500";
  };

  const getScoreLabel = (score: number) => {
    if (score >= 80)
      return {
        label: "Excellent",
        color:
          "text-emerald-600 bg-emerald-50 dark:text-emerald-400 dark:bg-emerald-950",
      };
    if (score >= 60)
      return {
        label: "Good",
        color: "text-blue-600 bg-blue-50 dark:text-blue-400 dark:bg-blue-950",
      };
    if (score >= 40)
      return {
        label: "Needs Work",
        color:
          "text-orange-600 bg-orange-50 dark:text-orange-400 dark:bg-orange-950",
      };
    return {
      label: "Poor",
      color: "text-rose-600 bg-rose-50 dark:text-rose-400 dark:bg-rose-950",
    };
  };

  const deviceWarning = (img: ImageData) => ({
    mobile: {
      isBad: img.width > 1080 || img.sizeKB > 200,
      text:
        img.width > 1080 || img.sizeKB > 200
          ? "Heavy for mobile"
          : "Mobile friendly",
    },
    desktop: {
      isBad: img.sizeKB > 500,
      text: img.sizeKB > 500 ? "Large image" : "Desktop friendly",
    },
  });

  const compressionTip = (sizeKB: number) => {
    if (sizeKB < 150) return { text: "No compression needed", type: "success" };
    if (sizeKB < 300)
      return { text: "Slight compression recommended", type: "warning" };
    return { text: "Strong compression recommended", type: "error" };
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

  // ---------- Compression ----------
  const compressImage = (
    file: File,
    quality = 0.7,
    maxWidth = 1200
  ): Promise<Blob> => {
    const img = document.createElement("img") as HTMLImageElement;
    img.crossOrigin = "anonymous";
    const url = URL.createObjectURL(file);

    return new Promise((resolve) => {
      img.onload = () => {
        const scale = Math.min(1, maxWidth / img.width);
        const canvas = document.createElement("canvas");

        canvas.width = img.width * scale;
        canvas.height = img.height * scale;

        const ctx = canvas.getContext("2d")!;
        ctx.drawImage(img, 0, 0, canvas.width, canvas.height);

        canvas.toBlob((blob) => blob && resolve(blob), "image/jpeg", quality);
      };

      img.src = url;
    });
  };

  const downloadOptimized = async (img: ImageData) => {
    const compressed = await compressImage(img.file);
    const url = URL.createObjectURL(compressed);

    const a = document.createElement("a");
    a.href = url;
    a.download = `optimized-${img.file.name}`;
    a.click();
  };

  const removeImage = (id: string) => {
    setImages((prev) => prev.filter((img) => img.id !== id));
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
          <div className="space-y-6">
            <h2 className="text-2xl font-bold text-slate-900 dark:text-slate-100">
              Analyzed Images ({images.length})
            </h2>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {images.map((img) => {
                const warn = deviceWarning(img);
                const scoreInfo = getScoreLabel(img.score);
                const tipInfo = compressionTip(img.sizeKB);

                return (
                  <div
                    key={img.id}
                    className="group rounded-2xl border border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-800 overflow-hidden hover:shadow-xl dark:hover:shadow-2xl transition-all duration-300 transform hover:-translate-y-1"
                  >
                    {/* Image Preview with Overlay */}
                    <div className="relative h-56 bg-gradient-to-br from-slate-100 to-slate-200 dark:from-slate-700 dark:to-slate-800 flex items-center justify-center overflow-hidden">
                      <img
                        src={img.preview || "/placeholder.svg"}
                        alt="preview"
                        className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-300"
                      />
                      <div className="absolute inset-0 bg-gradient-to-t from-black/30 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>

                      {/* Delete Button */}
                      <button
                        onClick={() => removeImage(img.id)}
                        className="absolute top-3 right-3 p-2 bg-red-500 hover:bg-red-600 text-white rounded-lg transition-all transform hover:scale-110 active:scale-95 shadow-lg"
                      >
                        <Trash2 className="w-4 h-4" />
                      </button>

                      {/* Format Badge */}
                      <div className="absolute top-3 left-3 px-3 py-1 bg-white/90 dark:bg-slate-900/90 text-slate-900 dark:text-slate-100 text-xs font-bold rounded-lg backdrop-blur-sm">
                        {img.format}
                      </div>
                    </div>

                    {/* Content */}
                    <div className="p-6">
                      {/* File Info */}
                      <div className="mb-5">
                        <p className="text-sm font-semibold text-slate-700 dark:text-slate-300 truncate mb-2">
                          {img.file.name}
                        </p>
                        <div className="flex items-center justify-between text-xs text-slate-600 dark:text-slate-400">
                          <span className="flex items-center gap-1">
                            <ImageIcon className="w-3 h-3" />
                            {img.width}×{img.height}
                          </span>
                          <span className="font-semibold">{img.sizeKB} KB</span>
                        </div>
                      </div>

                      {/* Score */}
                      <div className="mb-5">
                        <div className="flex items-center justify-between mb-2">
                          <span className="text-sm font-semibold text-slate-700 dark:text-slate-300">
                            Optimization Score
                          </span>
                          <span
                            className={`px-3 py-1 rounded-full text-xs font-bold ${scoreInfo.color}`}
                          >
                            {scoreInfo.label}
                          </span>
                        </div>
                        <div className="relative w-full h-3 bg-slate-200 dark:bg-slate-700 rounded-full overflow-hidden">
                          <div
                            className={`h-full bg-gradient-to-r ${getScoreColor(
                              img.score
                            )} transition-all duration-500 shadow-lg`}
                            style={{ width: `${Math.min(img.score, 100)}%` }}
                          ></div>
                        </div>
                        <p className="text-xs text-slate-600 dark:text-slate-400 mt-2 font-medium">
                          Score: {img.score}/100
                        </p>
                      </div>

                      {/* Device Compatibility */}
                      <div className="grid grid-cols-2 gap-3 mb-5">
                        <div
                          className={`flex items-center gap-2 p-3 rounded-lg border transition-all ${
                            warn.mobile.isBad
                              ? "bg-orange-50 dark:bg-orange-950/30 border-orange-200 dark:border-orange-800"
                              : "bg-emerald-50 dark:bg-emerald-950/30 border-emerald-200 dark:border-emerald-800"
                          }`}
                        >
                          <Smartphone
                            className={`w-4 h-4 flex-shrink-0 ${
                              warn.mobile.isBad
                                ? "text-orange-600 dark:text-orange-400"
                                : "text-emerald-600 dark:text-emerald-400"
                            }`}
                          />
                          <span
                            className={`text-xs font-semibold ${
                              warn.mobile.isBad
                                ? "text-orange-700 dark:text-orange-300"
                                : "text-emerald-700 dark:text-emerald-300"
                            }`}
                          >
                            {warn.mobile.text}
                          </span>
                        </div>

                        <div
                          className={`flex items-center gap-2 p-3 rounded-lg border transition-all ${
                            warn.desktop.isBad
                              ? "bg-orange-50 dark:bg-orange-950/30 border-orange-200 dark:border-orange-800"
                              : "bg-emerald-50 dark:bg-emerald-950/30 border-emerald-200 dark:border-emerald-800"
                          }`}
                        >
                          <Monitor
                            className={`w-4 h-4 flex-shrink-0 ${
                              warn.desktop.isBad
                                ? "text-orange-600 dark:text-orange-400"
                                : "text-emerald-600 dark:text-emerald-400"
                            }`}
                          />
                          <span
                            className={`text-xs font-semibold ${
                              warn.desktop.isBad
                                ? "text-orange-700 dark:text-orange-300"
                                : "text-emerald-700 dark:text-emerald-300"
                            }`}
                          >
                            {warn.desktop.text}
                          </span>
                        </div>
                      </div>

                      {/* Compression Tip */}
                      <div
                        className={`flex items-start gap-3 p-3 rounded-lg mb-5 border ${
                          tipInfo.type === "success"
                            ? "bg-emerald-50 dark:bg-emerald-950/30 border-emerald-200 dark:border-emerald-800"
                            : tipInfo.type === "warning"
                            ? "bg-yellow-50 dark:bg-yellow-950/30 border-yellow-200 dark:border-yellow-800"
                            : "bg-red-50 dark:bg-red-950/30 border-red-200 dark:border-red-800"
                        }`}
                      >
                        <Zap
                          className={`w-4 h-4 flex-shrink-0 mt-0.5 ${
                            tipInfo.type === "success"
                              ? "text-emerald-600 dark:text-emerald-400"
                              : tipInfo.type === "warning"
                              ? "text-yellow-600 dark:text-yellow-400"
                              : "text-red-600 dark:text-red-400"
                          }`}
                        />
                        <span
                          className={`text-sm font-medium ${
                            tipInfo.type === "success"
                              ? "text-emerald-700 dark:text-emerald-300"
                              : tipInfo.type === "warning"
                              ? "text-yellow-700 dark:text-yellow-300"
                              : "text-red-700 dark:text-red-300"
                          }`}
                        >
                          {tipInfo.text}
                        </span>
                      </div>

                      {/* Download Button */}
                      <button
                        onClick={() => downloadOptimized(img)}
                        className="w-full flex items-center justify-center gap-2 px-4 py-3 bg-gradient-to-r from-teal-500 to-cyan-500 hover:from-teal-600 hover:to-cyan-600 dark:from-teal-600 dark:to-cyan-600 dark:hover:from-teal-700 dark:hover:to-cyan-700 text-white font-semibold rounded-lg transition-all transform hover:scale-105 active:scale-95 shadow-lg"
                      >
                        <Download className="w-4 h-4" />
                        Download Optimized
                      </button>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        )}

        {/* Empty State */}
        {images.length === 0 && (
          <div className="text-center py-20">
            <div className="inline-flex items-center justify-center w-16 h-16 rounded-full bg-gradient-to-br from-slate-200 to-slate-300 dark:from-slate-700 dark:to-slate-800 mb-4">
              <ImageIcon className="w-8 h-8 text-slate-500 dark:text-slate-400" />
            </div>
            <p className="text-slate-600 dark:text-slate-400 text-lg font-medium">
              Start by uploading images to analyze and optimize them
            </p>
          </div>
        )}
      </div>

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
    </div>
  );
}
