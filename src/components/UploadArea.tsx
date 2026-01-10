import { Upload } from "lucide-react";
import React, { useState } from "react";

function UploadArea({
  setImages,
}: {
  setImages: React.Dispatch<React.SetStateAction<any[]>>;
}) {
  const [isDragging, setIsDragging] = useState(false);

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

  const calculateScore = (sizeKB: number, width: number) => {
    let score = 100;
    if (sizeKB > 500) score -= 40;
    else if (sizeKB > 300) score -= 25;
    else if (sizeKB > 200) score -= 10;

    if (width > 2000) score -= 15;
    else if (width > 1200) score -= 5;

    return Math.max(score, 10);
  };

  return (
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
  );
}

export default UploadArea;
