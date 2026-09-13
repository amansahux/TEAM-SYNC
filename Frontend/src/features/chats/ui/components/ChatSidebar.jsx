import React from "react";
import { Lock, X } from "lucide-react";
import { CHAT_CHANNELS, canAccessChannel } from "../../constants/chatChannels.js";

const ChatSidebar = ({
  employee,
  isChannelActive,
  handleChannelClick,
  getChannelIcon,
  isChannelsOpen,
  setIsChannelsOpen,
}) => {
  return (
    <>
      {/* ── 1. Desktop Left Sidebar ── */}
      <aside className="w-64 hidden lg:flex flex-col border-r border-[var(--border)] bg-[var(--surface)] shrink-0">
        <div className="p-4 border-b border-[var(--border)] flex items-center justify-between">
          <h2 className="font-display text-base font-bold text-[var(--text-primary)]">
            Workspace Channels
          </h2>
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

      {/* ── 2. Mobile Channels Drawer ── */}
      {isChannelsOpen && (
        <div className="fixed inset-0 z-50 flex lg:hidden">
          <div
            className="fixed inset-0 bg-black/60 backdrop-blur-xs transition-opacity"
            onClick={() => setIsChannelsOpen(false)}
          />
          <div className="relative flex w-4/5 max-w-xs flex-col bg-[var(--surface)] border-r border-[var(--border)] p-4 text-[var(--text-primary)] shadow-2xl z-10">
            <div className="flex items-center justify-between border-b border-[var(--border)] pb-3 mb-4">
              <div className="flex items-center gap-2">
                <div className="w-8 h-8 rounded-lg bg-[var(--primary)]/10 text-[var(--primary)] flex items-center justify-center shrink-0">
                   <h2 className="font-bold text-base">Channels</h2>
                </div>
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
    </>
  );
};

export default ChatSidebar;
