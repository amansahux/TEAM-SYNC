import React from "react";
import { Mic, Trash2, Square, Send } from "lucide-react";
import { formatDuration } from "../../utils/chat.utils.js";
import AudioPlayer from "./AudioPlayer.jsx";

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

export default VoiceRecordingBar;
