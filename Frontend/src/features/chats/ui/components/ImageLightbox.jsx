import React, { useEffect } from "react";
import { X } from "lucide-react";

const ImageLightbox = ({ image, onClose }) => {
  useEffect(() => {
    const handleEsc = (e) => {
      if (e.key === "Escape") onClose();
    };
    document.addEventListener("keydown", handleEsc);
    return () => document.removeEventListener("keydown", handleEsc);
  }, [onClose]);

  if (!image) return null;

  return (
    <div
      className="fixed inset-0 z-[100] flex items-center justify-center p-4 animate-[fadeIn_200ms_ease-out]"
      onClick={onClose}
    >
      <div className="absolute inset-0 bg-black/80 backdrop-blur-sm" />
      <div
        className="relative max-w-[90vw] max-h-[90vh] z-10"
        onClick={(e) => e.stopPropagation()}
      >
        <button
          onClick={onClose}
          className="absolute -top-3 -right-3 p-1.5 rounded-full bg-[var(--surface)] border border-[var(--border)] text-[var(--text-secondary)] hover:text-[var(--text-primary)] shadow-lg transition-colors z-20 cursor-pointer"
        >
          <X className="w-4 h-4" />
        </button>
        <img
          src={image.url}
          alt={image.name || "Preview"}
          className="max-w-full max-h-[85vh] object-contain rounded-xl shadow-2xl"
        />
        {image.name && (
          <div className="absolute bottom-0 left-0 right-0 p-3 bg-gradient-to-t from-black/70 to-transparent rounded-b-xl">
            <p className="text-white text-xs font-medium truncate">
              {image.name}
            </p>
          </div>
        )}
      </div>
    </div>
  );
};

export default ImageLightbox;
