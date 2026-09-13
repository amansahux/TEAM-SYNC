import React, { useState, useRef } from "react";
import { Play, Pause } from "lucide-react";
import { formatDuration } from "../../utils/chat.utils.js";

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

export default AudioPlayer;
