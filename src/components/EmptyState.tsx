import { ImageIcon } from "lucide-react";

function EmptyState() {
  return (
    <div className="text-center py-20">
      <div className="inline-flex items-center justify-center w-16 h-16 rounded-full bg-gradient-to-br from-slate-200 to-slate-300 dark:from-slate-700 dark:to-slate-800 mb-4">
        <ImageIcon className="w-8 h-8 text-slate-500 dark:text-slate-400" />
      </div>
      <p className="text-slate-600 dark:text-slate-400 text-lg font-medium">
        Start by uploading images to analyze and optimize them
      </p>
    </div>
  );
}

export default EmptyState;
