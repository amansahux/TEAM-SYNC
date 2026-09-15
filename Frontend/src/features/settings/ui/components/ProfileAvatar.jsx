import React, { useState, useRef } from "react";
import { Camera, Trash2, UploadCloud, AlertCircle } from "lucide-react";

const ProfileAvatar = ({
  name = "",
  initials = "TS",
  currentAvatar = null,
  onAvatarChange,
}) => {
  const [avatarPreview, setAvatarPreview] = useState(currentAvatar);
  const [avatarError, setAvatarError] = useState(null);
  const fileInputRef = useRef(null);

  const handleFileSelect = (e) => {
    const file = e.target.files?.[0];
    if (!file) return;

    // Reset error
    setAvatarError(null);

    // Validate type
    const validTypes = ["image/jpeg", "image/png", "image/webp"];
    if (!validTypes.includes(file.type)) {
      setAvatarError("Invalid file type. Please upload a JPG, PNG, or WebP image.");
      if (fileInputRef.current) fileInputRef.current.value = "";
      return;
    }

    // Validate size (< 2MB)
    if (file.size > 2 * 1024 * 1024) {
      setAvatarError("File size exceeds 2MB. Please choose a smaller image.");
      if (fileInputRef.current) fileInputRef.current.value = "";
      return;
    }

    // Create local object URL for preview
    const previewUrl = URL.createObjectURL(file);
    setAvatarPreview(previewUrl);

    if (onAvatarChange) {
      onAvatarChange(file, previewUrl);
    }
  };

  const handleRemovePhoto = () => {
    setAvatarPreview(null);
    setAvatarError(null);
    if (fileInputRef.current) {
      fileInputRef.current.value = "";
    }
    if (onAvatarChange) {
      onAvatarChange(null, null);
    }
  };

  return (
    <div className="flex flex-col sm:flex-row items-start sm:items-center gap-5 p-4 sm:p-5 rounded-2xl bg-[var(--surface)] border border-[var(--border)]">
      {/* Hidden file input */}
      <input
        ref={fileInputRef}
        type="file"
        accept="image/png, image/jpeg, image/webp"
        className="hidden"
        onChange={handleFileSelect}
      />

      {/* Avatar Display */}
      <div className="relative group shrink-0">
        <div className="w-20 h-20 sm:w-24 sm:h-24 rounded-2xl overflow-hidden bg-[var(--primary)]/15 border-2 border-[var(--border)] flex items-center justify-center text-xl sm:text-2xl font-bold text-[var(--primary)] shadow-sm transition-transform duration-200 group-hover:scale-[1.02]">
          {avatarPreview ? (
            <img
              src={avatarPreview}
              alt={name || "Profile"}
              className="w-full h-full object-cover"
            />
          ) : (
            <span className="tracking-wider">{initials}</span>
          )}
        </div>

        {/* Camera overlay on hover */}
        <button
          type="button"
          onClick={() => fileInputRef.current?.click()}
          aria-label="Upload photo"
          className="absolute inset-0 bg-black/40 backdrop-blur-xs rounded-2xl opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center cursor-pointer text-white shadow-md"
        >
          <Camera className="w-6 h-6" />
        </button>

        {/* Small badge icon */}
        <div className="absolute -bottom-1 -right-1 w-6 h-6 rounded-full bg-[var(--primary)] text-[var(--primary-foreground)] flex items-center justify-center border-2 border-[var(--surface)] shadow-xs">
          <Camera className="w-3 h-3" />
        </div>
      </div>

      {/* Controls and guidance */}
      <div className="flex-1 space-y-2.5 min-w-0">
        <div className="flex flex-wrap items-center gap-2.5">
          <button
            type="button"
            onClick={() => fileInputRef.current?.click()}
            className="px-3.5 py-1.5 rounded-xl text-xs font-semibold bg-[var(--primary)] text-[var(--primary-foreground)] hover:opacity-90 transition-all flex items-center gap-1.5 shadow-xs cursor-pointer"
          >
            <UploadCloud className="w-3.5 h-3.5" />
            Change photo
          </button>

          {avatarPreview && (
            <button
              type="button"
              onClick={handleRemovePhoto}
              className="px-3.5 py-1.5 rounded-xl text-xs font-medium bg-[var(--card)] hover:bg-red-500/10 text-red-400 hover:text-red-500 border border-[var(--border)] hover:border-red-500/30 transition-all flex items-center gap-1.5 cursor-pointer"
            >
              <Trash2 className="w-3.5 h-3.5" />
              Remove photo
            </button>
          )}
        </div>

        <p className="text-[11px] text-[var(--text-muted)] leading-relaxed">
          Preferred dimensions: <span className="font-medium text-[var(--text-secondary)]">400×400px</span>. JPG, WebP, or PNG under <span className="font-medium text-[var(--text-secondary)]">2MB</span>.
        </p>

        {avatarError && (
          <div className="flex items-center gap-1.5 text-xs text-red-400 bg-red-500/10 border border-red-500/20 px-3 py-1.5 rounded-lg animate-in fade-in duration-150">
            <AlertCircle className="w-3.5 h-3.5 shrink-0" />
            <span>{avatarError}</span>
          </div>
        )}
      </div>
    </div>
  );
};

export default ProfileAvatar;
