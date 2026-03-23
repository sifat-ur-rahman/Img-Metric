import {
  Download,
  ImageIcon,
  Monitor,
  Smartphone,
  Trash2,
  Zap,
} from "lucide-react";
import { ImageData } from "../lib/tpye";

function ImagesGrid({ images, setImages }: any) {
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
  const getScoreColor = (score: number) => {
    if (score >= 80) return "from-emerald-400 to-teal-500";
    if (score >= 60) return "from-blue-400 to-cyan-500";
    if (score >= 40) return "from-yellow-400 to-orange-500";
    return "from-red-400 to-rose-500";
  };
  // ---------- Compression ----------
  const compressImage = (
    file: File,
    quality = 0.7,
    maxWidth = 1200,
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
    setImages((prev: any) => prev.filter((img: any) => img.id !== id));
  };

  return (
    <div className="space-y-6">
      <h2 className="text-2xl font-bold text-slate-900 dark:text-slate-100">
        Analyzed Images ({images.length})
      </h2>

      <div className="grid grid-cols-1 gap-6 md:grid-cols-2">
        {images.map((img: any) => {
          const warn = deviceWarning(img);
          const scoreInfo = getScoreLabel(img.score);
          const tipInfo = compressionTip(img.sizeKB);

          return (
            <div
              key={img.id}
              className="group transform overflow-hidden rounded-2xl border border-slate-200 bg-white transition-all duration-300 hover:-translate-y-1 hover:shadow-xl dark:border-slate-700 dark:bg-slate-800 dark:hover:shadow-2xl"
            >
              {/* Image Preview with Overlay */}
              <div className="relative flex h-56 items-center justify-center overflow-hidden bg-gradient-to-br from-slate-100 to-slate-200 dark:from-slate-700 dark:to-slate-800">
                <img
                  src={img.preview || "/placeholder.svg"}
                  alt="preview"
                  className="h-full w-full object-cover transition-transform duration-300 group-hover:scale-110"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/30 to-transparent opacity-0 transition-opacity duration-300 group-hover:opacity-100"></div>

                {/* Delete Button */}
                <button
                  onClick={() => removeImage(img.id)}
                  className="absolute top-3 right-3 transform rounded-lg bg-red-500 p-2 text-white shadow-lg transition-all hover:scale-110 hover:bg-red-600 active:scale-95"
                >
                  <Trash2 className="h-4 w-4" />
                </button>

                {/* Format Badge */}
                <div className="absolute top-3 left-3 rounded-lg bg-white/90 px-3 py-1 text-xs font-bold text-slate-900 backdrop-blur-sm dark:bg-slate-900/90 dark:text-slate-100">
                  {img.format}
                </div>
              </div>

              {/* Content */}
              <div className="p-6">
                {/* File Info */}
                <div className="mb-5">
                  <p className="mb-2 truncate text-sm font-semibold text-slate-700 dark:text-slate-300">
                    {img.file.name}
                  </p>
                  <div className="flex items-center justify-between text-xs text-slate-600 dark:text-slate-400">
                    <span className="flex items-center gap-1">
                      <ImageIcon className="h-3 w-3" />
                      {img.width}×{img.height}
                    </span>
                    <span className="font-semibold">{img.sizeKB} KB</span>
                  </div>
                </div>

                {/* Score */}
                <div className="mb-5">
                  <div className="mb-2 flex items-center justify-between">
                    <span className="text-sm font-semibold text-slate-700 dark:text-slate-300">
                      Optimization Score
                    </span>
                    <span
                      className={`rounded-full px-3 py-1 text-xs font-bold ${scoreInfo.color}`}
                    >
                      {scoreInfo.label}
                    </span>
                  </div>
                  <div className="relative h-3 w-full overflow-hidden rounded-full bg-slate-200 dark:bg-slate-700">
                    <div
                      className={`h-full bg-gradient-to-r ${getScoreColor(
                        img.score,
                      )} shadow-lg transition-all duration-500`}
                      style={{ width: `${Math.min(img.score, 100)}%` }}
                    ></div>
                  </div>
                  <p className="mt-2 text-xs font-medium text-slate-600 dark:text-slate-400">
                    Score: {img.score}/100
                  </p>
                </div>

                {/* Device Compatibility */}
                <div className="mb-5 grid grid-cols-2 gap-3">
                  <div
                    className={`flex items-center gap-2 rounded-lg border p-3 transition-all ${
                      warn.mobile.isBad
                        ? "border-orange-200 bg-orange-50 dark:border-orange-800 dark:bg-orange-950/30"
                        : "border-emerald-200 bg-emerald-50 dark:border-emerald-800 dark:bg-emerald-950/30"
                    }`}
                  >
                    <Smartphone
                      className={`h-4 w-4 flex-shrink-0 ${
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
                    className={`flex items-center gap-2 rounded-lg border p-3 transition-all ${
                      warn.desktop.isBad
                        ? "border-orange-200 bg-orange-50 dark:border-orange-800 dark:bg-orange-950/30"
                        : "border-emerald-200 bg-emerald-50 dark:border-emerald-800 dark:bg-emerald-950/30"
                    }`}
                  >
                    <Monitor
                      className={`h-4 w-4 flex-shrink-0 ${
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
                  className={`mb-5 flex items-start gap-3 rounded-lg border p-3 ${
                    tipInfo.type === "success"
                      ? "border-emerald-200 bg-emerald-50 dark:border-emerald-800 dark:bg-emerald-950/30"
                      : tipInfo.type === "warning"
                        ? "border-yellow-200 bg-yellow-50 dark:border-yellow-800 dark:bg-yellow-950/30"
                        : "border-red-200 bg-red-50 dark:border-red-800 dark:bg-red-950/30"
                  }`}
                >
                  <Zap
                    className={`mt-0.5 h-4 w-4 flex-shrink-0 ${
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
                  className="flex w-full transform items-center justify-center gap-2 rounded-lg bg-gradient-to-r from-teal-500 to-cyan-500 px-4 py-3 font-semibold text-white shadow-lg transition-all hover:scale-105 hover:from-teal-600 hover:to-cyan-600 active:scale-95 dark:from-teal-600 dark:to-cyan-600 dark:hover:from-teal-700 dark:hover:to-cyan-700"
                >
                  <Download className="h-4 w-4" />
                  Download Optimized
                </button>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}

export default ImagesGrid;
