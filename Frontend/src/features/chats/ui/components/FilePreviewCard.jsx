import React, { useState, useEffect } from "react";
import { X, Eye, Music, FileText } from "lucide-react";
import { getFileExtension, getDocIconColor, formatFileSize } from "../../utils/chat.utils.js";

const FilePreviewCard = ({ file, onRemove, onPreviewImage }) => {
  const [previewUrl, setPreviewUrl] = useState(null);

  useEffect(() => {
    if (file.type?.startsWith("image/")) {
      const url = URL.createObjectURL(file);
      setPreviewUrl(url);
      return () => URL.revokeObjectURL(url);
    }
  }, [file]);

  const openFile = () => {
    const url = URL.createObjectURL(file);
    window.open(url, "_blank");
    // We can't revoke immediately since the tab needs it; browser will GC
  };

  const ext = getFileExtension(file.name);
  const colorClass = getDocIconColor(ext);

  if (file.type?.startsWith("image/") && previewUrl) {
    return (
      <div 
        className="relative group w-16 h-16 rounded-lg border border-[var(--border)] shrink-0 hover:border-[var(--primary)]/30 transition-all cursor-pointer"
        onClick={() => onPreviewImage({ url: previewUrl, name: file.name })}
      >
        <img
          src={previewUrl}
          alt={file.name}
          className="w-full h-full object-cover rounded-lg"
        />
        <div className="absolute inset-0 bg-black/0 group-hover:bg-black/30 transition-colors flex items-center justify-center rounded-lg">
          <Eye className="w-4 h-4 text-white opacity-0 group-hover:opacity-100 transition-opacity" />
        </div>
        <button
          type="button"
          onClick={(e) => {
            e.stopPropagation();
            onRemove();
          }}
          className="absolute -top-1.5 -right-1.5 z-10 w-5 h-5 rounded-full bg-red-500 text-white flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity cursor-pointer shadow-sm"
        >
          <X className="w-3 h-3" />
        </button>
      </div>
    );
  }

  if (file.type?.startsWith("audio/")) {
    return (
      <div className="relative group flex items-center gap-2 px-3 py-2 rounded-lg border border-[var(--border)] bg-[var(--background)] hover:border-[var(--primary)]/30 transition-all shrink-0 max-w-[180px]">
        <div className="w-8 h-8 rounded-md bg-emerald-500/10 text-emerald-500 flex items-center justify-center shrink-0">
          <Music className="w-4 h-4" />
        </div>
        <div className="flex-1 min-w-0" onClick={openFile}>
          <p className="text-[11px] font-medium text-[var(--text-primary)] truncate cursor-pointer hover:text-[var(--primary)]">
            {file.name}
          </p>
          <p className="text-[10px] text-[var(--text-muted)]">
            {formatFileSize(file.size)}
          </p>
        </div>
        <button
          type="button"
          onClick={onRemove}
          className="text-[var(--text-muted)] hover:text-red-500 transition-colors cursor-pointer shrink-0"
        >
          <X className="w-3.5 h-3.5" />
        </button>
      </div>
    );
  }

  // Document
  return (
    <div className="relative group flex items-center gap-2 px-3 py-2 rounded-lg border border-[var(--border)] bg-[var(--background)] hover:border-[var(--primary)]/30 transition-all shrink-0 max-w-[200px]">
      <div
        className={`w-8 h-8 rounded-md flex items-center justify-center shrink-0 ${colorClass}`}
      >
        <FileText className="w-4 h-4" />
      </div>
      <div className="flex-1 min-w-0" onClick={openFile}>
        <p className="text-[11px] font-medium text-[var(--text-primary)] truncate cursor-pointer hover:text-[var(--primary)]">
          {file.name}
        </p>
        <div className="flex items-center gap-1.5">
          <span className="text-[10px] text-[var(--text-muted)] uppercase">
            {ext}
          </span>
          <span className="text-[10px] text-[var(--text-muted)]">•</span>
          <span className="text-[10px] text-[var(--text-muted)]">
            {formatFileSize(file.size)}
          </span>
        </div>
      </div>
      <button
        type="button"
        onClick={onRemove}
        className="text-[var(--text-muted)] hover:text-red-500 transition-colors cursor-pointer shrink-0"
      >
        <X className="w-3.5 h-3.5" />
      </button>
    </div>
  );
};

export default FilePreviewCard;
