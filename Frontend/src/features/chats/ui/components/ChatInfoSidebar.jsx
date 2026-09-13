import React from "react";
import { Pin, Users, X } from "lucide-react";

const ChatInfoSidebar = ({ currentChannel, isInfoOpen, setIsInfoOpen }) => {
  return (
    <>
      {/* ── 3. Desktop Right Sidebar ── */}
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
    </>
  );
};

export default ChatInfoSidebar;
