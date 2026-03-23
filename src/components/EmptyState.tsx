import { ImageIcon } from "lucide-react";

function EmptyState() {
  return (
    <div className="py-20 text-center">
      <div className="mb-4 inline-flex h-16 w-16 items-center justify-center rounded-full bg-gradient-to-br from-slate-200 to-slate-300 dark:from-slate-700 dark:to-slate-800">
        <ImageIcon className="h-8 w-8 text-slate-500 dark:text-slate-400" />
      </div>
      <p className="text-lg font-medium text-slate-600 dark:text-slate-400">
        Start by uploading images to analyze and optimize them
      </p>
    </div>
  );
}

export default EmptyState;
