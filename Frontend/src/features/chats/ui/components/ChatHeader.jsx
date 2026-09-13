import React from "react";
import { Menu, Search, Info } from "lucide-react";

const ChatHeader = ({
  currentChannel,
  ChannelIcon,
  setIsChannelsOpen,
  setIsInfoOpen,
}) => {
  return (
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
  );
};

export default ChatHeader;
