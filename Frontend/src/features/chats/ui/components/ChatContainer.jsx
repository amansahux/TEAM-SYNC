import React, { useEffect, useRef, useState, useCallback } from "react";
import { useSelector } from "react-redux";
import { useLocation, useNavigate } from "react-router";
import {
  Plus,
  Paperclip,
  Bold,
  AtSign,
  Send,
  Pin,
  Users,
  Search,
  ShieldCheck,
  Info,
  Menu,
  X,
  Lock,
  Image as ImageIcon,
  FileText,
  Music,
  Mic,
  Square,
  Trash2,
  Download,
  Play,
  Pause,
  Eye,
  AlertCircle,
  RefreshCw,
  Loader2,
} from "lucide-react";
import { useChat } from "../../hooks/useChat.jsx";
import {
  CHAT_CHANNELS,
  canAccessChannel,
} from "../../constants/chatChannels.js";

// ─── Helpers ─────────────────────────────────────────────────────────

const getInitials = (name) => {
  if (!name) return "U";
  const parts = name.trim().split(" ");
  if (parts.length >= 2) return (parts[0][0] + parts[1][0]).toUpperCase();
  return name.slice(0, 2).toUpperCase();
};

const formatTimestamp = (dateStr) => {
  if (!dateStr) return "";
  try {
    const date = new Date(dateStr);
    return date.toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" });
  } catch {
    return "";
  }
};

const getDateLabel = (dateStr) => {
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

const formatFileSize = (bytes) => {
  if (!bytes || bytes === 0) return "0 B";
  const k = 1024;
  const sizes = ["B", "KB", "MB", "GB"];
  const i = Math.floor(Math.log(bytes) / Math.log(k));
  return parseFloat((bytes / Math.pow(k, i)).toFixed(1)) + " " + sizes[i];
};

const formatDuration = (seconds) => {
  const m = Math.floor(seconds / 60);
  const s = seconds % 60;
  return `${m}:${s.toString().padStart(2, "0")}`;
};

const getFileExtension = (name) => {
  if (!name) return "";
  return name.split(".").pop().toLowerCase();
};

const getDocIconColor = (ext) => {
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

const renderMessageContent = (content) => {
  if (!content) return null;
  const parts = content.split(/(\*\*.*?\*\*)/g);
  return parts.map((part, index) => {
    if (part.startsWith("**") && part.endsWith("**") && part.length > 4) {
      return (
        <strong key={index} className="font-bold text-[var(--text-primary)]">
          {part.slice(2, -2)}
        </strong>
      );
    }
    return <React.Fragment key={index}>{part}</React.Fragment>;
  });
};

// ─── Image Lightbox ──────────────────────────────────────────────────

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

// ─── Document Card ───────────────────────────────────────────────────

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
      <Download className="w-4 h-4 text-[var(--text-muted)] group-hover:text-[var(--primary)] transition-colors shrink-0 opacity-0 group-hover:opacity-100" />
    </a>
  );
};

// ─── Custom Audio Player ─────────────────────────────────────────────

const AudioPlayer = ({ src, name }) => {
  const audioRef = useRef(null);
  const [playing, setPlaying] = useState(false);
  const [currentTime, setCurrentTime] = useState(0);
  const [duration, setDuration] = useState(0);
  const [loaded, setLoaded] = useState(false);

  const togglePlay = () => {
    if (!audioRef.current) return;
    if (playing) {
      audioRef.current.pause();
    } else {
      audioRef.current.play();
    }
    setPlaying(!playing);
  };

  const handleTimeUpdate = () => {
    if (audioRef.current) {
      setCurrentTime(audioRef.current.currentTime);
    }
  };

  const handleLoadedMetadata = () => {
    if (audioRef.current) {
      setDuration(audioRef.current.duration);
      setLoaded(true);
    }
  };

  const handleEnded = () => {
    setPlaying(false);
    setCurrentTime(0);
  };

  const handleSeek = (e) => {
    if (!audioRef.current || !duration) return;
    const rect = e.currentTarget.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const pct = x / rect.width;
    audioRef.current.currentTime = pct * duration;
  };

  const progress = duration ? (currentTime / duration) * 100 : 0;

  return (
    <div className="flex items-center gap-2.5 p-2.5 rounded-lg bg-[var(--surface)] border border-[var(--border)] max-w-[320px] min-w-[220px]">
      <audio
        ref={audioRef}
        src={src}
        onTimeUpdate={handleTimeUpdate}
        onLoadedMetadata={handleLoadedMetadata}
        onEnded={handleEnded}
        preload="metadata"
      />
      <button
        type="button"
        onClick={togglePlay}
        className="w-8 h-8 rounded-full bg-[var(--primary)] text-[var(--primary-foreground)] flex items-center justify-center shrink-0 hover:bg-[var(--primary-hover)] transition-colors cursor-pointer active:scale-95"
      >
        {playing ? (
          <Pause className="w-3.5 h-3.5" />
        ) : (
          <Play className="w-3.5 h-3.5 ml-0.5" />
        )}
      </button>
      <div className="flex-1 min-w-0 flex flex-col gap-1.5">
        {/* Waveform bars */}
        <div
          className="relative h-6 flex items-end gap-[2px] cursor-pointer"
          onClick={handleSeek}
        >
          {Array.from({ length: 28 }).map((_, i) => {
            const barPct = ((i + 1) / 28) * 100;
            const isActive = barPct <= progress;
            // Pseudo-random heights for waveform look
            const heights = [40, 65, 85, 55, 95, 70, 50, 80, 60, 45, 90, 75, 55, 85, 65, 40, 70, 95, 50, 80, 60, 45, 75, 90, 55, 65, 85, 70];
            return (
              <div
                key={i}
                className={`flex-1 rounded-full transition-colors duration-150 ${
                  isActive
                    ? "bg-[var(--primary)]"
                    : "bg-[var(--border)]"
                }`}
                style={{ height: `${heights[i % heights.length]}%` }}
              />
            );
          })}
        </div>
        <div className="flex items-center justify-between">
          <span className="text-[10px] text-[var(--text-muted)] font-mono">
            {formatDuration(Math.floor(currentTime))}
          </span>
          <span className="text-[10px] text-[var(--text-muted)] font-mono">
            {loaded ? formatDuration(Math.floor(duration)) : "--:--"}
          </span>
        </div>
      </div>
    </div>
  );
};

// ─── File Preview Card (Input Area) ──────────────────────────────────

const FilePreviewCard = ({ file, onRemove }) => {
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
      <div className="relative group w-16 h-16 rounded-lg overflow-hidden border border-[var(--border)] shrink-0 hover:border-[var(--primary)]/30 transition-all">
        <img
          src={previewUrl}
          alt={file.name}
          className="w-full h-full object-cover cursor-pointer"
          onClick={openFile}
        />
        <div className="absolute inset-0 bg-black/0 group-hover:bg-black/30 transition-colors flex items-center justify-center">
          <Eye className="w-4 h-4 text-white opacity-0 group-hover:opacity-100 transition-opacity" />
        </div>
        <button
          type="button"
          onClick={(e) => {
            e.stopPropagation();
            onRemove();
          }}
          className="absolute -top-1.5 -right-1.5 w-5 h-5 rounded-full bg-red-500 text-white flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity cursor-pointer shadow-sm"
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

// ─── Voice Recording UI ──────────────────────────────────────────────

const VoiceRecordingBar = ({
  isRecording,
  recordingDuration,
  audioBlob,
  onStop,
  onCancel,
  onDiscard,
  onSend,
}) => {
  if (!isRecording && !audioBlob) return null;

  // Active recording state
  if (isRecording) {
    return (
      <div className="flex items-center gap-3 p-3 bg-[var(--surface)] rounded-xl border border-red-500/30 animate-[fadeIn_200ms_ease-out]">
        {/* Pulsing red dot */}
        <div className="relative flex items-center justify-center">
          <div className="w-3 h-3 rounded-full bg-red-500 animate-pulse" />
          <div className="absolute w-5 h-5 rounded-full bg-red-500/20 animate-ping" />
        </div>

        {/* Duration */}
        <span className="text-sm font-mono font-semibold text-red-500 min-w-[48px]">
          {formatDuration(recordingDuration)}
        </span>

        {/* Animated waveform */}
        <div className="flex-1 flex items-center gap-[2px] h-8">
          {Array.from({ length: 40 }).map((_, i) => (
            <div
              key={i}
              className="flex-1 bg-red-500/40 rounded-full"
              style={{
                height: `${20 + Math.sin(Date.now() / 200 + i * 0.5) * 30 + Math.random() * 20}%`,
                transition: "height 150ms ease",
                animation: isRecording ? `waveBar 600ms ease-in-out ${i * 30}ms infinite alternate` : "none",
              }}
            />
          ))}
        </div>

        {/* Cancel button */}
        <button
          type="button"
          onClick={onCancel}
          className="p-2 rounded-lg text-[var(--text-muted)] hover:text-red-500 hover:bg-red-500/10 transition-all cursor-pointer"
          title="Cancel recording"
        >
          <Trash2 className="w-4 h-4" />
        </button>

        {/* Stop button */}
        <button
          type="button"
          onClick={onStop}
          className="p-2 rounded-lg bg-red-500 text-white hover:bg-red-600 transition-all cursor-pointer active:scale-95"
          title="Stop recording"
        >
          <Square className="w-4 h-4" />
        </button>
      </div>
    );
  }

  // Recorded audio preview
  if (audioBlob) {
    const blobUrl = URL.createObjectURL(audioBlob);
    return (
      <div className="flex items-center gap-3 p-3 bg-[var(--surface)] rounded-xl border border-[var(--primary)]/30 animate-[fadeIn_200ms_ease-out]">
        <div className="w-8 h-8 rounded-full bg-[var(--primary)]/10 text-[var(--primary)] flex items-center justify-center shrink-0">
          <Mic className="w-4 h-4" />
        </div>

        <div className="flex-1 min-w-0">
          <AudioPlayer src={blobUrl} name="Voice message" />
        </div>

        {/* Discard */}
        <button
          type="button"
          onClick={onDiscard}
          className="p-2 rounded-lg text-[var(--text-muted)] hover:text-red-500 hover:bg-red-500/10 transition-all cursor-pointer"
          title="Discard"
        >
          <Trash2 className="w-4 h-4" />
        </button>

        {/* Send */}
        <button
          type="button"
          onClick={onSend}
          className="p-2 rounded-lg bg-[var(--primary)] text-[var(--primary-foreground)] hover:bg-[var(--primary-hover)] transition-all cursor-pointer active:scale-95"
          title="Send voice message"
        >
          <Send className="w-4 h-4" />
        </button>
      </div>
    );
  }

  return null;
};

// ─── Main Chat Container ─────────────────────────────────────────────

const ChatContainer = ({ channelId = "general" }) => {
  const navigate = useNavigate();
  const location = useLocation();
  const { employee } = useSelector((state) => state.auth);

  const userObj =
    employee?.user ||
    employee?.data?.user ||
    employee?.employee?.user ||
    employee ||
    {};
  const currentUserRole = (userObj?.role || "").toLowerCase();

  const currentChannel =
    CHAT_CHANNELS.find((c) => c.id === channelId) || CHAT_CHANNELS[0];

  const isAnnouncementChannel = currentChannel.id === "announcements";
  const canPostMessages = !isAnnouncementChannel || currentUserRole === "admin";

  const {
    messages,
    messageInput,
    setMessageInput,
    handleSendMessage,
    getChannelIcon,
    selectedFiles,
    setSelectedFiles,
    handleFileSelect,
    uploadFileMutation,
    uploadError,
    clearUploadError,
    isRecording,
    recordingDuration,
    audioBlob,
    startRecording,
    stopRecording,
    cancelRecording,
    discardAudioBlob,
  } = useChat(currentChannel.id);

  const [isChannelsOpen, setIsChannelsOpen] = useState(false);
  const [isInfoOpen, setIsInfoOpen] = useState(false);
  const [isAttachmentMenuOpen, setIsAttachmentMenuOpen] = useState(false);
  const [lightboxImage, setLightboxImage] = useState(null);

  const messagesEndRef = useRef(null);
  const textareaRef = useRef(null);
  const attachmentMenuRef = useRef(null);
  const imageInputRef = useRef(null);
  const documentInputRef = useRef(null);
  const audioInputRef = useRef(null);

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (
        attachmentMenuRef.current &&
        !attachmentMenuRef.current.contains(event.target)
      ) {
        setIsAttachmentMenuOpen(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  const onFileSelect = (e) => {
    handleFileSelect(e);
    setIsAttachmentMenuOpen(false);
    if (e.target) e.target.value = null;
  };

  const handleFormatBold = () => {
    document.execCommand("bold", false, null);
    if (textareaRef.current) {
      textareaRef.current.focus();
      setMessageInput(textareaRef.current.innerHTML);
    }
  };

  const processHTMLToMarkdown = (html) => {
    if (!html) return "";
    let text = html;
    text = text.replace(/<(b|strong)[^>]*>(.*?)<\/\1>/gi, "**$2**");
    text = text.replace(/<br\s*[\/]?>/gi, "\n");
    text = text.replace(/<div[^>]*>/gi, "\n").replace(/<\/div>/gi, "");
    text = text.replace(/<p[^>]*>/gi, "\n").replace(/<\/p>/gi, "");
    text = text.replace(/<[^>]*>?/gm, "");
    const txt = document.createElement("textarea");
    txt.innerHTML = text;
    return txt.value;
  };

  const handleSubmitForm = (e) => {
    if (e) e.preventDefault();
    const markdownContent = processHTMLToMarkdown(
      textareaRef.current?.innerHTML || ""
    );
    handleSendMessage(e, markdownContent);
  };

  // Send voice message (blob already captured)
  const handleSendVoice = () => {
    handleSendMessage(null, "");
  };

  useEffect(() => {
    if (textareaRef.current && messageInput === "") {
      textareaRef.current.innerHTML = "";
    }
  }, [messageInput]);

  const ChannelIcon = getChannelIcon(currentChannel.id);

  const messageList = Array.isArray(messages)
    ? messages
    : messages?.messages || messages?.data || [];

  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messageList]);

  const handleChannelClick = (channel) => {
    if (!canAccessChannel(channel, employee)) return;
    setIsChannelsOpen(false);
    navigate(channel.path);
  };

  const isChannelActive = (channel) => {
    if (channel.id === "general") {
      return (
        location.pathname === "/dashboard/chat" ||
        location.pathname === "/dashboard/chat/" ||
        location.pathname === "/dashboard/chat/general" ||
        location.pathname === "/dashboard/chat/general/"
      );
    }
    return location.pathname.startsWith(channel.path);
  };

  // ── Build messages with date separators ──
  const messagesWithSeparators = [];
  let lastDateLabel = "";
  messageList.forEach((msg, idx) => {
    const label = getDateLabel(msg.createdAt);
    if (label && label !== lastDateLabel) {
      messagesWithSeparators.push({ type: "separator", label, key: `sep-${idx}` });
      lastDateLabel = label;
    }
    messagesWithSeparators.push({ type: "message", data: msg, key: msg._id || `msg-${idx}` });
  });

  const isSending = uploadFileMutation.isPending;

  return (
    <div className="relative flex h-[calc(100vh-64px)] w-full overflow-hidden bg-[var(--background)] text-[var(--text-primary)]">
      {/* Lightbox */}
      {lightboxImage && (
        <ImageLightbox
          image={lightboxImage}
          onClose={() => setLightboxImage(null)}
        />
      )}

      {/* ── 1. Left Sidebar ── */}
      <aside className="w-64 hidden lg:flex flex-col border-r border-[var(--border)] bg-[var(--surface)] shrink-0">
        <div className="p-4 border-b border-[var(--border)] flex items-center justify-between">
          <h2 className="font-display text-base font-bold text-[var(--text-primary)]">
            Workspace Channels
          </h2>
          <button
            type="button"
            className="p-1 rounded-md hover:bg-[var(--card-hover)] text-[var(--text-secondary)] transition-colors"
            title="Channel directory"
          >
            <Plus className="w-4 h-4" />
          </button>
        </div>

        <div className="flex-1 overflow-y-auto p-3 space-y-4">
          <div className="flex flex-col gap-1">
            <span className="text-[10px] font-semibold tracking-wider text-[var(--text-muted)] uppercase px-2 mb-1">
              CHANNELS ({CHAT_CHANNELS.length})
            </span>

            {CHAT_CHANNELS.map((channel) => {
              const accessible = canAccessChannel(channel, employee);
              const active = isChannelActive(channel);
              const Icon = getChannelIcon(channel.id);

              if (accessible) {
                return (
                  <button
                    key={channel.id}
                    type="button"
                    onClick={() => handleChannelClick(channel)}
                    className={`flex items-center justify-between w-full text-left px-3 py-2 rounded-lg text-sm font-medium transition-all cursor-pointer ${
                      active
                        ? "bg-[var(--primary)]/15 text-[var(--primary)] border border-[var(--primary)]/20 shadow-xs"
                        : "text-[var(--text-secondary)] hover:bg-[var(--card-hover)] hover:text-[var(--text-primary)]"
                    }`}
                  >
                    <div className="flex items-center gap-2 min-w-0">
                      <Icon
                        className={`w-4 h-4 shrink-0 ${
                          active
                            ? "text-[var(--primary)]"
                            : "text-[var(--text-muted)]"
                        }`}
                      />
                      <span className="truncate">{channel.name}</span>
                    </div>
                    {channel.isPublic ? (
                      <span className="text-[9px] px-1.5 py-0.5 rounded bg-[var(--card-hover)] text-[var(--text-muted)] font-normal shrink-0">
                        public
                      </span>
                    ) : (
                      <span className="text-[9px] px-1.5 py-0.5 rounded bg-[var(--primary)]/10 text-[var(--primary)] font-semibold shrink-0">
                        {channel.department}
                      </span>
                    )}
                  </button>
                );
              }

              return (
                <div
                  key={channel.id}
                  className="flex items-center justify-between px-3 py-2 rounded-lg text-sm text-[var(--text-muted)] opacity-60 cursor-not-allowed select-none"
                  title={`Restricted to ${channel.department}s and Admins`}
                >
                  <div className="flex items-center gap-2 min-w-0">
                    <Icon className="w-4 h-4 shrink-0 text-[var(--text-muted)]" />
                    <span className="truncate">{channel.name}</span>
                  </div>
                  <div className="flex items-center gap-1 text-[10px] text-[var(--text-muted)] shrink-0">
                    <Lock className="w-3 h-3" />
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </aside>

      {/* ── 2. Central Chat Area ── */}
      <main className="flex-1 flex flex-col min-w-0 bg-[var(--background)]">
        {/* Header */}
        <header className="px-4 md:px-5 py-3 border-b border-[var(--border)] bg-[var(--surface)]/80 backdrop-blur-md flex items-center justify-between shrink-0">
          <div className="flex items-center gap-2.5 md:gap-3 min-w-0">
            <button
              type="button"
              onClick={() => setIsChannelsOpen(true)}
              className="p-1.5 rounded-lg text-[var(--text-secondary)] hover:bg-[var(--card-hover)] transition-colors lg:hidden shrink-0"
              title="Open Channels"
            >
              <Menu className="w-5 h-5" />
            </button>

            <div className="w-8 h-8 rounded-lg bg-[var(--primary)]/10 text-[var(--primary)] flex items-center justify-center shrink-0">
              <ChannelIcon className="w-5 h-5" />
            </div>
            <div className="flex flex-col min-w-0">
              <div className="flex items-center gap-2">
                <h1 className="text-base font-bold text-[var(--text-primary)] truncate">
                  {currentChannel.name}
                </h1>
                <span className="px-2 py-0.5 text-[10px] font-semibold rounded bg-[var(--primary-light)] text-[var(--primary)] hidden sm:inline-block">
                  {currentChannel.badge}
                </span>
              </div>
              <span className="text-xs text-[var(--text-muted)] truncate hidden sm:inline-block">
                {currentChannel.subtitle}
              </span>
            </div>
          </div>

          <div className="flex items-center gap-1.5 md:gap-2 shrink-0">
            <button
              type="button"
              className="p-2 rounded-lg text-[var(--text-secondary)] hover:bg-[var(--card-hover)] transition-colors"
              title="Search in channel"
            >
              <Search className="w-4 h-4" />
            </button>
            <button
              type="button"
              onClick={() => setIsInfoOpen(true)}
              className="p-2 rounded-lg text-[var(--text-secondary)] hover:bg-[var(--card-hover)] transition-colors xl:hidden"
              title="Channel Info"
            >
              <Info className="w-4 h-4" />
            </button>
          </div>
        </header>

        {/* ── Message Stream ── */}
        <div className="flex-1 overflow-y-auto p-3 md:p-6 space-y-4">
          {/* Empty State */}
          {messageList.length === 0 ? (
            <div className="flex-1 flex flex-col items-center justify-center text-center p-8 text-[var(--text-muted)] my-auto">
              <div className="w-12 h-12 rounded-full bg-[var(--primary)]/10 text-[var(--primary)] flex items-center justify-center mb-3">
                <ChannelIcon className="w-6 h-6" />
              </div>
              <p className="text-base font-medium text-[var(--text-primary)]">
                Welcome to #{currentChannel.name}!
              </p>
              <p className="text-xs text-[var(--text-secondary)] mt-1 max-w-sm">
                This is the beginning of the #{currentChannel.name} channel.
                Send a message below to start the conversation.
              </p>
            </div>
          ) : (
            messagesWithSeparators.map((item) => {
              // ── Date Separator ──
              if (item.type === "separator") {
                return (
                  <div
                    key={item.key}
                    className="flex items-center justify-center my-3"
                  >
                    <span className="px-3 py-1 rounded-full text-[11px] font-medium bg-[var(--surface)] text-[var(--text-muted)] border border-[var(--border)] shadow-xs">
                      {item.label}
                    </span>
                  </div>
                );
              }

              // ── Message ──
              const message = item.data;
              const currentUserId = String(
                userObj?._id || userObj?.id || ""
              );
              const currentUserEmail = (userObj?.email || "").toLowerCase();
              const senderId = String(
                message.sender?._id ||
                  (typeof message.sender === "string"
                    ? message.sender
                    : "") ||
                  ""
              );
              const senderEmail = (
                message.sender?.email || ""
              ).toLowerCase();
              const isOwn =
                (currentUserId &&
                  senderId &&
                  currentUserId === senderId) ||
                (currentUserEmail &&
                  senderEmail &&
                  currentUserEmail === senderEmail);
              const senderRole = (
                message.sender?.role || ""
              ).toLowerCase();
              const senderDept = (
                message.sender?.department || ""
              ).toLowerCase();

              return (
                <div
                  key={item.key}
                  className={`flex items-start gap-3 p-2.5 md:p-3 rounded-xl transition-all ${
                    isOwn
                      ? "bg-[var(--primary)]/10 border border-[var(--primary)]/25 shadow-xs"
                      : "group hover:bg-[var(--card-hover)]/30 border border-transparent"
                  }`}
                >
                  <div
                    className={`w-8 h-8 md:w-9 md:h-9 rounded-full flex items-center justify-center font-bold text-xs shrink-0 shadow-xs border ${
                      isOwn
                        ? "bg-[var(--primary)] text-[var(--primary-foreground)] border-[var(--primary)] ring-2 ring-[var(--primary)]/20"
                        : "bg-[var(--primary-light)] text-[var(--primary)] border-[var(--primary)]/20"
                    }`}
                  >
                    {getInitials(
                      message.sender?.name || message.sender?.email
                    )}
                  </div>
                  <div className="flex flex-col flex-1 min-w-0">
                    <div className="flex flex-wrap items-center gap-2">
                      <span
                        className={`text-xs md:text-sm font-semibold truncate ${
                          isOwn
                            ? "text-[var(--primary)] font-bold"
                            : "text-[var(--text-primary)]"
                        }`}
                      >
                        {message.sender?.name || message.sender?.email}
                      </span>

                      {senderRole === "admin" ? (
                        <span className="text-[10px] px-1.5 py-0.5 rounded font-semibold bg-[var(--accent)]/15 text-[var(--accent)] border border-[var(--accent)]/20">
                          Admin
                        </span>
                      ) : senderDept && senderDept !== "common" ? (
                        <span className="text-[10px] px-1.5 py-0.5 rounded font-medium bg-[var(--card-hover)] text-[var(--text-secondary)] border border-[var(--border)] capitalize">
                          {senderDept}
                        </span>
                      ) : null}

                      {isOwn && (
                        <span className="text-[10px] px-1.5 py-0.2 rounded font-semibold bg-[var(--primary)] text-[var(--primary-foreground)] shadow-xs">
                          You
                        </span>
                      )}

                      <span className="text-[10px] md:text-[11px] text-[var(--text-muted)] ml-auto">
                        {formatTimestamp(message.createdAt)}
                      </span>
                    </div>

                    {/* Text Content */}
                    {message.content && (
                      <p className="text-xs md:text-sm text-[var(--text-secondary)] mt-1 whitespace-pre-wrap leading-relaxed">
                        {renderMessageContent(message.content)}
                      </p>
                    )}

                    {/* Attachments */}
                    {message.attachments &&
                      message.attachments.length > 0 && (
                        <div className="flex flex-wrap gap-2 mt-2">
                          {message.attachments.map((file, i) => {
                            if (file.type?.startsWith("image/")) {
                              return (
                                <button
                                  key={i}
                                  type="button"
                                  onClick={() => setLightboxImage(file)}
                                  className="relative group rounded-lg overflow-hidden border border-[var(--border)] hover:border-[var(--primary)]/30 transition-all cursor-pointer"
                                >
                                  <img
                                    src={file.url}
                                    alt={file.name}
                                    className="max-w-[200px] max-h-[200px] object-cover"
                                  />
                                  <div className="absolute inset-0 bg-black/0 group-hover:bg-black/20 transition-colors flex items-center justify-center">
                                    <Eye className="w-5 h-5 text-white opacity-0 group-hover:opacity-100 transition-opacity drop-shadow-lg" />
                                  </div>
                                </button>
                              );
                            }
                            if (file.type?.startsWith("audio/")) {
                              return (
                                <AudioPlayer
                                  key={i}
                                  src={file.url}
                                  name={file.name}
                                />
                              );
                            }
                            return (
                              <DocumentCard key={i} file={file} />
                            );
                          })}
                        </div>
                      )}
                  </div>
                </div>
              );
            })
          )}
          <div ref={messagesEndRef} />
        </div>

        {/* ── Message Input Box ── */}
        <div className="p-3 md:p-4 pt-0 bg-[var(--background)]">
          {!canPostMessages ? (
            <div className="bg-[var(--surface)] rounded-xl border border-[var(--border)] p-4 flex items-center justify-center gap-2.5 text-center shadow-xs">
              <Lock className="w-4 h-4 text-[var(--text-muted)] shrink-0" />
              <p className="text-xs text-[var(--text-muted)] font-medium">
                Announcements channel is read-only. Only administrators can
                broadcast messages.
              </p>
            </div>
          ) : isRecording || audioBlob ? (
            /* Voice Recording / Preview */
            <VoiceRecordingBar
              isRecording={isRecording}
              recordingDuration={recordingDuration}
              audioBlob={audioBlob}
              onStop={stopRecording}
              onCancel={cancelRecording}
              onDiscard={discardAudioBlob}
              onSend={handleSendVoice}
            />
          ) : (
            <div className="relative">
              {/* Upload Error Banner */}
              {uploadError && (
                <div className="flex items-center gap-2 mb-2 px-3 py-2 rounded-lg bg-red-500/10 border border-red-500/20 text-red-500 text-xs font-medium animate-[fadeIn_200ms_ease-out]">
                  <AlertCircle className="w-4 h-4 shrink-0" />
                  <span className="flex-1">{uploadError}</span>
                  <button
                    type="button"
                    onClick={clearUploadError}
                    className="p-1 hover:bg-red-500/10 rounded transition-colors cursor-pointer"
                  >
                    <X className="w-3 h-3" />
                  </button>
                  <button
                    type="button"
                    onClick={() => {
                      clearUploadError();
                      handleSubmitForm();
                    }}
                    className="flex items-center gap-1 px-2 py-1 rounded bg-red-500/15 hover:bg-red-500/25 transition-colors cursor-pointer"
                  >
                    <RefreshCw className="w-3 h-3" />
                    <span>Retry</span>
                  </button>
                </div>
              )}

              {/* Loading Overlay */}
              {isSending && (
                <div className="absolute inset-0 z-10 flex items-center justify-center rounded-xl bg-[var(--surface)]/80 backdrop-blur-xs">
                  <div className="flex items-center gap-2 text-[var(--primary)]">
                    <Loader2 className="w-5 h-5 animate-spin" />
                    <span className="text-sm font-medium">Uploading files...</span>
                  </div>
                </div>
              )}

              <form
                onSubmit={handleSubmitForm}
                className={`bg-[var(--surface)] rounded-xl border border-[var(--border)] focus-within:border-[var(--primary)] transition-all p-2.5 md:p-3 flex flex-col gap-2 shadow-xs ${
                  isSending ? "opacity-60 pointer-events-none" : ""
                }`}
              >
                {/* Rich File Previews */}
                {selectedFiles.length > 0 && (
                  <div className="flex flex-wrap gap-2 px-1 pb-2">
                    {selectedFiles.map((file, i) => (
                      <FilePreviewCard
                        key={`${file.name}-${i}`}
                        file={file}
                        onRemove={() =>
                          setSelectedFiles((prev) =>
                            prev.filter((_, idx) => idx !== i)
                          )
                        }
                      />
                    ))}
                  </div>
                )}

                <div
                  ref={textareaRef}
                  contentEditable
                  suppressContentEditableWarning
                  onInput={(e) =>
                    setMessageInput(e.currentTarget.innerHTML)
                  }
                  onKeyDown={(e) => {
                    if (e.key === "b" && (e.ctrlKey || e.metaKey)) {
                      e.preventDefault();
                      handleFormatBold();
                    } else if (e.key === "Enter" && !e.shiftKey) {
                      e.preventDefault();
                      handleSubmitForm(e);
                    }
                  }}
                  data-placeholder={`Message #${currentChannel.name}...`}
                  className="w-full bg-transparent border-none focus:outline-none text-[var(--text-primary)] min-h-[40px] max-h-[120px] overflow-y-auto outline-none text-xs md:text-sm leading-relaxed empty:before:content-[attr(data-placeholder)] empty:before:text-[var(--text-muted)] cursor-text"
                />
                <div className="flex items-center justify-between pt-2 border-t border-[var(--border)]">
                  <div className="flex items-center gap-0.5 sm:gap-1 text-[var(--text-secondary)]">
                    {/* Attachment Menu */}
                    <div className="relative" ref={attachmentMenuRef}>
                      <button
                        type="button"
                        onClick={() =>
                          setIsAttachmentMenuOpen(!isAttachmentMenuOpen)
                        }
                        className={`p-1.5 rounded-md transition-colors cursor-pointer ${
                          isAttachmentMenuOpen
                            ? "bg-[var(--card-hover)] text-[var(--text-primary)]"
                            : "hover:bg-[var(--card-hover)]"
                        }`}
                        title="Attach file"
                      >
                        <Paperclip className="w-4 h-4" />
                      </button>

                      {isAttachmentMenuOpen && (
                        <div className="absolute bottom-full left-0 mb-2 w-48 bg-[var(--surface)] border border-[var(--border)] rounded-xl shadow-lg p-1.5 z-50 flex flex-col gap-0.5 animate-in slide-in-from-bottom-2 fade-in duration-200">
                          <button
                            type="button"
                            onClick={() =>
                              imageInputRef.current?.click()
                            }
                            className="flex items-center gap-2.5 px-2.5 py-2 text-sm font-medium text-[var(--text-primary)] hover:bg-[var(--card-hover)] rounded-lg transition-colors cursor-pointer text-left"
                          >
                            <div className="p-1.5 rounded-md bg-[var(--primary)]/10 text-[var(--primary)]">
                              <ImageIcon className="w-4 h-4" />
                            </div>
                            <span>Image</span>
                          </button>
                          <button
                            type="button"
                            onClick={() =>
                              documentInputRef.current?.click()
                            }
                            className="flex items-center gap-2.5 px-2.5 py-2 text-sm font-medium text-[var(--text-primary)] hover:bg-[var(--card-hover)] rounded-lg transition-colors cursor-pointer text-left"
                          >
                            <div className="p-1.5 rounded-md bg-[var(--accent)]/10 text-[var(--accent)]">
                              <FileText className="w-4 h-4" />
                            </div>
                            <span>Document</span>
                          </button>
                          <button
                            type="button"
                            onClick={() =>
                              audioInputRef.current?.click()
                            }
                            className="flex items-center gap-2.5 px-2.5 py-2 text-sm font-medium text-[var(--text-primary)] hover:bg-[var(--card-hover)] rounded-lg transition-colors cursor-pointer text-left"
                          >
                            <div className="p-1.5 rounded-md bg-emerald-500/10 text-emerald-500">
                              <Music className="w-4 h-4" />
                            </div>
                            <span>Audio file</span>
                          </button>
                        </div>
                      )}

                      <input
                        type="file"
                        ref={imageInputRef}
                        accept="image/*"
                        className="hidden"
                        onChange={onFileSelect}
                        multiple
                      />
                      <input
                        type="file"
                        ref={documentInputRef}
                        accept=".pdf,.doc,.docx,.txt,.xls,.xlsx,.ppt,.pptx"
                        className="hidden"
                        onChange={onFileSelect}
                        multiple
                      />
                      <input
                        type="file"
                        ref={audioInputRef}
                        accept="audio/*"
                        className="hidden"
                        onChange={onFileSelect}
                        multiple
                      />
                    </div>

                    <button
                      type="button"
                      onClick={handleFormatBold}
                      className="p-1.5 rounded-md hover:bg-[var(--card-hover)] transition-colors hidden sm:block cursor-pointer"
                      title="Formatting"
                    >
                      <Bold className="w-4 h-4" />
                    </button>
                    <button
                      type="button"
                      className="p-1.5 rounded-md hover:bg-[var(--card-hover)] transition-colors hidden sm:block cursor-pointer"
                      title="Mention"
                    >
                      <AtSign className="w-4 h-4" />
                    </button>

                    {/* Mic Button */}
                    <button
                      type="button"
                      onClick={startRecording}
                      className="p-1.5 rounded-md hover:bg-[var(--card-hover)] transition-colors cursor-pointer"
                      title="Record voice message"
                    >
                      <Mic className="w-4 h-4" />
                    </button>
                  </div>

                  <button
                    type="submit"
                    disabled={isSending}
                    className="bg-[var(--primary)] hover:bg-[var(--primary-hover)] disabled:opacity-50 text-[var(--primary-foreground)] px-3.5 py-1.5 md:px-4 md:py-2 rounded-lg flex items-center gap-1.5 text-xs font-semibold transition-all shadow-xs cursor-pointer active:scale-95"
                  >
                    <span>
                      {isSending ? "Sending..." : "Send"}
                    </span>
                    {isSending ? (
                      <Loader2 className="w-3.5 h-3.5 animate-spin" />
                    ) : (
                      <Send className="w-3.5 h-3.5" />
                    )}
                  </button>
                </div>
              </form>
            </div>
          )}

          <div className="flex justify-between items-center mt-2 px-1 text-[10px] md:text-[11px] text-[var(--text-muted)]">
            <span className="hidden sm:inline">
              Pro-tip: Press Enter to send, Shift + Enter for a new line.
            </span>
            <span className="flex items-center gap-1 ml-auto sm:ml-0">
              <ShieldCheck className="w-3.5 h-3.5 text-[var(--primary)]" />
              Encrypted Channel Stream
            </span>
          </div>
        </div>
      </main>

      {/* ── 3. Right Sidebar ── */}
      <aside className="w-72 hidden xl:flex flex-col border-l border-[var(--border)] bg-[var(--surface)] shrink-0 overflow-y-auto">
        <div className="p-4 border-b border-[var(--border)]">
          <h2 className="font-display text-base font-bold text-[var(--text-primary)]">
            About #{currentChannel.name}
          </h2>
        </div>

        <div className="p-4 space-y-6">
          <div className="flex flex-col gap-1.5">
            <span className="text-[10px] font-semibold text-[var(--text-muted)] uppercase tracking-wider">
              CHANNEL PURPOSE
            </span>
            <p className="text-xs text-[var(--text-secondary)] leading-relaxed">
              {currentChannel.purpose}
            </p>
          </div>

          {currentChannel.pinnedItems && (
            <div className="flex flex-col gap-2">
              <div className="flex items-center justify-between">
                <span className="text-[10px] font-semibold text-[var(--text-muted)] uppercase tracking-wider">
                  PINNED ITEMS ({currentChannel.pinnedItems.length})
                </span>
                <Pin className="w-3.5 h-3.5 text-[var(--text-muted)]" />
              </div>
              {currentChannel.pinnedItems.map((item, i) => (
                <div
                  key={i}
                  className="bg-[var(--card)] p-3 rounded-lg border border-[var(--border)] flex flex-col gap-1 shadow-xs"
                >
                  <span className="text-xs font-semibold text-[var(--text-primary)]">
                    {item.title}
                  </span>
                  <span className="text-[10px] text-[var(--text-muted)]">
                    {item.meta}
                  </span>
                </div>
              ))}
            </div>
          )}

          {currentChannel.participants && (
            <div className="flex flex-col gap-2">
              <div className="flex items-center justify-between">
                <span className="text-[10px] font-semibold text-[var(--text-muted)] uppercase tracking-wider">
                  ACTIVE PARTICIPANTS ({currentChannel.participants.length})
                </span>
                <Users className="w-3.5 h-3.5 text-[var(--text-muted)]" />
              </div>
              <div className="flex flex-col gap-1 mt-1">
                {currentChannel.participants.map((user, i) => (
                  <div
                    key={i}
                    className="flex items-center justify-between p-2 rounded-lg hover:bg-[var(--card-hover)] transition-colors"
                  >
                    <div className="flex items-center gap-2.5">
                      <div className="relative">
                        <div className="w-7 h-7 rounded-full bg-[var(--primary-light)] text-[var(--primary)] flex items-center justify-center text-[10px] font-bold">
                          {user.initials}
                        </div>
                        {user.active && (
                          <span className="absolute bottom-0 right-0 w-2 h-2 rounded-full bg-[var(--success)] border border-[var(--surface)]" />
                        )}
                      </div>
                      <div className="flex flex-col">
                        <span className="text-xs font-medium text-[var(--text-primary)]">
                          {user.name}
                        </span>
                        <span className="text-[10px] text-[var(--text-muted)]">
                          {user.role}
                        </span>
                      </div>
                    </div>
                    {user.tag && (
                      <span className="text-[10px] px-1.5 py-0.5 rounded bg-[var(--card-hover)] text-[var(--text-secondary)] font-medium">
                        {user.tag}
                      </span>
                    )}
                  </div>
                ))}
              </div>
            </div>
          )}
        </div>
      </aside>

      {/* ── 4. Mobile Channels Drawer ── */}
      {isChannelsOpen && (
        <div className="fixed inset-0 z-50 flex lg:hidden">
          <div
            className="fixed inset-0 bg-black/60 backdrop-blur-xs transition-opacity"
            onClick={() => setIsChannelsOpen(false)}
          />
          <div className="relative flex w-4/5 max-w-xs flex-col bg-[var(--surface)] border-r border-[var(--border)] p-4 text-[var(--text-primary)] shadow-2xl z-10">
            <div className="flex items-center justify-between border-b border-[var(--border)] pb-3 mb-4">
              <div className="flex items-center gap-2">
                <ChannelIcon className="w-5 h-5 text-[var(--primary)]" />
                <h2 className="font-bold text-base">Workspace Channels</h2>
              </div>
              <button
                type="button"
                onClick={() => setIsChannelsOpen(false)}
                className="p-1 rounded-md text-[var(--text-muted)] hover:bg-[var(--card-hover)] hover:text-[var(--text-primary)]"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            <div className="flex-1 overflow-y-auto space-y-4">
              <div className="flex flex-col gap-1">
                <span className="text-[10px] font-semibold tracking-wider text-[var(--text-muted)] uppercase px-2 mb-1">
                  CHANNELS ({CHAT_CHANNELS.length})
                </span>
                {CHAT_CHANNELS.map((channel) => {
                  const accessible = canAccessChannel(channel, employee);
                  const active = isChannelActive(channel);
                  const Icon = getChannelIcon(channel.id);

                  if (accessible) {
                    return (
                      <button
                        key={channel.id}
                        type="button"
                        onClick={() => handleChannelClick(channel)}
                        className={`flex items-center justify-between w-full text-left px-3 py-2.5 rounded-lg text-sm font-medium transition-all ${
                          active
                            ? "bg-[var(--primary)]/15 text-[var(--primary)] border border-[var(--primary)]/20 shadow-xs"
                            : "text-[var(--text-secondary)] hover:bg-[var(--card-hover)] hover:text-[var(--text-primary)]"
                        }`}
                      >
                        <div className="flex items-center gap-2.5 min-w-0">
                          <Icon
                            className={`w-4.5 h-4.5 shrink-0 ${
                              active
                                ? "text-[var(--primary)]"
                                : "text-[var(--text-muted)]"
                            }`}
                          />
                          <span className="truncate">{channel.name}</span>
                        </div>
                        {channel.isPublic ? (
                          <span className="text-[9px] px-1.5 py-0.5 rounded bg-[var(--card-hover)] text-[var(--text-muted)] font-normal shrink-0">
                            public
                          </span>
                        ) : (
                          <span className="text-[9px] px-1.5 py-0.5 rounded bg-[var(--primary)]/10 text-[var(--primary)] font-semibold shrink-0">
                            {channel.department}
                          </span>
                        )}
                      </button>
                    );
                  }

                  return (
                    <div
                      key={channel.id}
                      className="flex items-center justify-between px-3 py-2.5 rounded-lg text-sm text-[var(--text-muted)] opacity-60 cursor-not-allowed select-none"
                    >
                      <div className="flex items-center gap-2.5 min-w-0">
                        <Icon className="w-4.5 h-4.5 shrink-0 text-[var(--text-muted)]" />
                        <span className="truncate">{channel.name}</span>
                      </div>
                      <Lock className="w-3 h-3" />
                    </div>
                  );
                })}
              </div>
            </div>
          </div>
        </div>
      )}

      {/* ── 5. Mobile About Drawer ── */}
      {isInfoOpen && (
        <div className="fixed inset-0 z-50 flex justify-end xl:hidden">
          <div
            className="fixed inset-0 bg-black/60 backdrop-blur-xs transition-opacity"
            onClick={() => setIsInfoOpen(false)}
          />
          <div className="relative flex w-4/5 max-w-xs flex-col bg-[var(--surface)] border-l border-[var(--border)] p-4 text-[var(--text-primary)] shadow-2xl z-10 overflow-y-auto space-y-6">
            <div className="flex items-center justify-between border-b border-[var(--border)] pb-3">
              <h2 className="font-display text-base font-bold text-[var(--text-primary)]">
                About #{currentChannel.name}
              </h2>
              <button
                type="button"
                onClick={() => setIsInfoOpen(false)}
                className="p-1 rounded-md text-[var(--text-muted)] hover:bg-[var(--card-hover)] hover:text-[var(--text-primary)]"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            <div className="flex flex-col gap-1.5">
              <span className="text-[10px] font-semibold text-[var(--text-muted)] uppercase tracking-wider">
                CHANNEL PURPOSE
              </span>
              <p className="text-xs text-[var(--text-secondary)] leading-relaxed">
                {currentChannel.purpose}
              </p>
            </div>

            {currentChannel.pinnedItems && (
              <div className="flex flex-col gap-2">
                <div className="flex items-center justify-between">
                  <span className="text-[10px] font-semibold text-[var(--text-muted)] uppercase tracking-wider">
                    PINNED ITEMS ({currentChannel.pinnedItems.length})
                  </span>
                  <Pin className="w-3.5 h-3.5 text-[var(--text-muted)]" />
                </div>
                {currentChannel.pinnedItems.map((item, i) => (
                  <div
                    key={i}
                    className="bg-[var(--card)] p-3 rounded-lg border border-[var(--border)] flex flex-col gap-1 shadow-xs"
                  >
                    <span className="text-xs font-semibold text-[var(--text-primary)]">
                      {item.title}
                    </span>
                    <span className="text-[10px] text-[var(--text-muted)]">
                      {item.meta}
                    </span>
                  </div>
                ))}
              </div>
            )}

            {currentChannel.participants && (
              <div className="flex flex-col gap-2">
                <div className="flex items-center justify-between">
                  <span className="text-[10px] font-semibold text-[var(--text-muted)] uppercase tracking-wider">
                    ACTIVE PARTICIPANTS (
                    {currentChannel.participants.length})
                  </span>
                  <Users className="w-3.5 h-3.5 text-[var(--text-muted)]" />
                </div>
                <div className="flex flex-col gap-1 mt-1">
                  {currentChannel.participants.map((user, i) => (
                    <div
                      key={i}
                      className="flex items-center justify-between p-2 rounded-lg hover:bg-[var(--card-hover)] transition-colors"
                    >
                      <div className="flex items-center gap-2.5">
                        <div className="relative">
                          <div className="w-7 h-7 rounded-full bg-[var(--primary-light)] text-[var(--primary)] flex items-center justify-center text-[10px] font-bold">
                            {user.initials}
                          </div>
                          {user.active && (
                            <span className="absolute bottom-0 right-0 w-2 h-2 rounded-full bg-[var(--success)] border border-[var(--surface)]" />
                          )}
                        </div>
                        <div className="flex flex-col">
                          <span className="text-xs font-medium text-[var(--text-primary)]">
                            {user.name}
                          </span>
                          <span className="text-[10px] text-[var(--text-muted)]">
                            {user.role}
                          </span>
                        </div>
                      </div>
                      {user.tag && (
                        <span className="text-[10px] px-1.5 py-0.5 rounded bg-[var(--card-hover)] text-[var(--text-secondary)] font-medium">
                          {user.tag}
                        </span>
                      )}
                    </div>
                  ))}
                </div>
              </div>
            )}
          </div>
        </div>
      )}

      {/* Keyframe styles */}
      <style>{`
        @keyframes fadeIn {
          from { opacity: 0; }
          to { opacity: 1; }
        }
        @keyframes waveBar {
          0% { transform: scaleY(0.4); }
          100% { transform: scaleY(1); }
        }
      `}</style>
    </div>
  );
};

export default ChatContainer;
