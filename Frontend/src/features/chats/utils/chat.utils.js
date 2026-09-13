export const getInitials = (name) => {
  if (!name) return "U";
  const parts = name.trim().split(" ");
  if (parts.length >= 2) return (parts[0][0] + parts[1][0]).toUpperCase();
  return name.slice(0, 2).toUpperCase();
};

export const formatTimestamp = (dateStr) => {
  if (!dateStr) return "";
  try {
    const date = new Date(dateStr);
    return date.toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" });
  } catch {
    return "";
  }
};

export const getDateLabel = (dateStr) => {
  if (!dateStr) return "";
  try {
    const msgDate = new Date(dateStr);
    const today = new Date();
    const yesterday = new Date();
    yesterday.setDate(yesterday.getDate() - 1);

    const isSameDay = (a, b) =>
      a.getFullYear() === b.getFullYear() &&
      a.getMonth() === b.getMonth() &&
      a.getDate() === b.getDate();

    if (isSameDay(msgDate, today)) return "Today";
    if (isSameDay(msgDate, yesterday)) return "Yesterday";
    return msgDate.toLocaleDateString("en-US", {
      month: "short",
      day: "numeric",
      year: "numeric",
    });
  } catch {
    return "";
  }
};

export const formatFileSize = (bytes) => {
  if (!bytes || bytes === 0) return "0 B";
  const k = 1024;
  const sizes = ["B", "KB", "MB", "GB"];
  const i = Math.floor(Math.log(bytes) / Math.log(k));
  return parseFloat((bytes / Math.pow(k, i)).toFixed(1)) + " " + sizes[i];
};

export const formatDuration = (seconds) => {
  const m = Math.floor(seconds / 60);
  const s = seconds % 60;
  return `${m}:${s.toString().padStart(2, "0")}`;
};

export const getFileExtension = (name) => {
  if (!name) return "";
  return name.split(".").pop().toLowerCase();
};

export const getDocIconColor = (ext) => {
  switch (ext) {
    case "pdf":
      return "text-red-500 bg-red-500/10";
    case "doc":
    case "docx":
      return "text-blue-500 bg-blue-500/10";
    case "txt":
      return "text-gray-500 bg-gray-500/10";
    case "xls":
    case "xlsx":
      return "text-emerald-500 bg-emerald-500/10";
    case "ppt":
    case "pptx":
      return "text-orange-500 bg-orange-500/10";
    default:
      return "text-[var(--text-muted)] bg-[var(--card-hover)]";
  }
};
