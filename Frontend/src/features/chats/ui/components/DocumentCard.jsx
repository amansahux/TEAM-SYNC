import React from "react";
import { FileText } from "lucide-react";
import { getFileExtension, getDocIconColor, formatFileSize } from "../../utils/chat.utils.js";

const DocumentCard = ({ file }) => {
  const ext = getFileExtension(file.name);
  const colorClass = getDocIconColor(ext);

  return (
    <a
      href={file.url}
      target="_blank"
      rel="noreferrer"
      className="flex items-center gap-3 p-3 rounded-lg bg-[var(--surface)] border border-[var(--border)] hover:border-[var(--primary)]/30 hover:shadow-md transition-all group max-w-[280px] cursor-pointer"
    >
      <div
        className={`w-10 h-10 rounded-lg flex items-center justify-center shrink-0 ${colorClass}`}
      >
        <FileText className="w-5 h-5" />
      </div>
      <div className="flex-1 min-w-0">
        <p className="text-xs font-semibold text-[var(--text-primary)] truncate group-hover:text-[var(--primary)] transition-colors">
          {file.name}
        </p>
        <div className="flex items-center gap-2 mt-0.5">
          <span className="text-[10px] text-[var(--text-muted)] uppercase font-medium">
            {ext}
          </span>
          {file.size && (
            <>
              <span className="text-[10px] text-[var(--text-muted)]">•</span>
              <span className="text-[10px] text-[var(--text-muted)]">
                {formatFileSize(file.size)}
              </span>
            </>
          )}
        </div>
      </div>
    </a>
  );
};

export default DocumentCard;
