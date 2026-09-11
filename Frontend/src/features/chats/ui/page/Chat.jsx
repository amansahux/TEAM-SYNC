import React, { useEffect, useRef, useState } from "react";
import {
  Hash,
  Plus,
  Paperclip,
  Smile,
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
} from "lucide-react";
import { useChat } from "../../hooks/useChat.jsx";

const CHANNELS = [
  { id: "general", name: "general", active: true },
  { id: "managers", name: "managers", active: false },
  { id: "marketers", name: "Marketers", active: false },
  { id: "developers", name: "Developers", active: false },
  { id: "designers", name: "Designers", active: false },
  { id: "announcements", name: "announcements", active: false },
];

const PINNED_ITEMS = [
  { title: "Q3 Executive Guidelines", meta: "Pinned by Marcus Vance • Sep 01" },
  { title: "Workspace Security Protocol v4", meta: "Pinned by Elena Rostova • Sep 05" },
];

const PARTICIPANTS = [
  { name: "Aman Sahu", role: "You", tag: "Admin", initials: "AS", active: true },
  { name: "Marcus Vance", role: "Executive Lead", initials: "MV", active: true },
  { name: "Elena Rostova", role: "Design Director", initials: "ER", active: true },
  { name: "David Kim", role: "Away", initials: "DK", active: false },
];

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

const Chat = () => {
  const {
    messages,
    messageInput,
    setMessageInput,
    handleSendMessage,
  } = useChat();

  const [isChannelsOpen, setIsChannelsOpen] = useState(false);
  const [isInfoOpen, setIsInfoOpen] = useState(false);

  const messagesEndRef = useRef(null);

  // Extract message list dynamically
  const messageList = Array.isArray(messages)
    ? messages
    : messages?.messages || messages?.data || [];

  // Scroll to bottom when messages update
  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messageList]);

  return (
    <div className="relative flex h-[calc(100vh-64px)] w-full overflow-hidden bg-[var(--background)] text-[var(--text-primary)]">
      {/* 1. Left Workspace Channels Sub-Sidebar (Desktop) */}
      <aside className="w-64 hidden lg:flex flex-col border-r border-[var(--border)] bg-[var(--surface)] shrink-0">
        <div className="p-4 border-b border-[var(--border)] flex items-center justify-between">
          <h2 className="font-display text-base font-bold text-[var(--text-primary)]">
            Workspace Channels
          </h2>
          <button
            type="button"
            className="p-1 rounded-md hover:bg-[var(--card-hover)] text-[var(--text-secondary)] transition-colors"
            title="Create Channel"
          >
            <Plus className="w-4 h-4" />
          </button>
        </div>

        <div className="flex-1 overflow-y-auto p-3 space-y-4">
          <div className="flex flex-col gap-1">
            <span className="text-[10px] font-semibold tracking-wider text-[var(--text-muted)] uppercase px-2 mb-1">
              CHANNELS
            </span>
            {CHANNELS.map((channel) =>
              channel.active ? (
                <div
                  key={channel.id}
                  className="flex items-center gap-2 px-3 py-2 rounded-lg bg-[var(--primary)]/15 text-[var(--primary)] font-medium text-sm border border-[var(--primary)]/20 shadow-xs"
                >
                  <Hash className="w-4 h-4 text-[var(--primary)] shrink-0" />
                  <span className="truncate">{channel.name}</span>
                </div>
              ) : (
                <div
                  key={channel.id}
                  className="flex items-center gap-2 px-3 py-2 rounded-lg text-[var(--text-muted)] hover:bg-[var(--card-hover)]/50 transition-colors text-sm cursor-not-allowed opacity-75"
                  title="Channel locked for now"
                >
                  <Hash className="w-4 h-4 text-[var(--text-muted)] shrink-0" />
                  <span className="truncate">{channel.name}</span>
                </div>
              )
            )}
          </div>
        </div>
      </aside>

      {/* 2. Central Chat Area */}
      <main className="flex-1 flex flex-col min-w-0 bg-[var(--background)]">
        {/* Chat Channel Header */}
        <header className="px-4 md:px-5 py-3 border-b border-[var(--border)] bg-[var(--surface)]/80 backdrop-blur-md flex items-center justify-between shrink-0">
          <div className="flex items-center gap-2.5 md:gap-3 min-w-0">
            {/* Mobile Channels Toggle Button */}
            <button
              type="button"
              onClick={() => setIsChannelsOpen(true)}
              className="p-1.5 rounded-lg text-[var(--text-secondary)] hover:bg-[var(--card-hover)] transition-colors lg:hidden shrink-0"
              title="Open Channels"
            >
              <Menu className="w-5 h-5" />
            </button>

            <div className="w-8 h-8 rounded-lg bg-[var(--primary)]/10 text-[var(--primary)] flex items-center justify-center shrink-0">
              <Hash className="w-5 h-5" />
            </div>
            <div className="flex flex-col min-w-0">
              <div className="flex items-center gap-2">
                <h1 className="text-base font-bold text-[var(--text-primary)] truncate">
                  general
                </h1>
                <span className="px-2 py-0.5 text-[10px] font-semibold rounded bg-[var(--primary-light)] text-[var(--primary)] hidden sm:inline-block">
                  Public Channel
                </span>
              </div>
              <span className="text-xs text-[var(--text-muted)] truncate hidden sm:inline-block">
                General team alignment, updates, and workspace announcements
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
            {/* Info Toggle Button for Mobile/Tablet */}
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

        {/* Message Stream */}
        <div className="flex-1 overflow-y-auto p-3 md:p-6 space-y-4">
          {/* Date Divider */}
          <div className="flex items-center justify-center my-2">
            <span className="px-3 py-1 rounded-full text-[11px] font-medium bg-[var(--surface)] text-[var(--text-muted)] border border-[var(--border)] shadow-xs">
              Thursday, September 11, 2026
            </span>
          </div>

          {/* Empty State */}
          {messageList.length === 0 ? (
            <div className="flex-1 flex flex-col items-center justify-center text-center p-8 text-[var(--text-muted)] my-auto">
              <div className="w-12 h-12 rounded-full bg-[var(--primary)]/10 text-[var(--primary)] flex items-center justify-center mb-3">
                <Hash className="w-6 h-6" />
              </div>
              <p className="text-base font-medium text-[var(--text-primary)]">
                Welcome to #general!
              </p>
              <p className="text-xs text-[var(--text-secondary)] mt-1 max-w-sm">
                This is the beginning of the #general channel. Send a message below to start the conversation.
              </p>
            </div>
          ) : (
            /* Dynamic Message List */
            messageList.map((message, index) => (
              <div
                key={message._id || index}
                className="flex items-start gap-3 group hover:bg-[var(--card-hover)]/30 p-2 md:p-2.5 rounded-xl transition-colors"
              >
                <div className="w-8 h-8 md:w-9 md:h-9 rounded-full bg-[var(--primary-light)] text-[var(--primary)] flex items-center justify-center font-bold text-xs shrink-0 shadow-xs border border-[var(--primary)]/20">
                  {getInitials(message.sender?.name || message.sender?.email)}
                </div>
                <div className="flex flex-col flex-1 min-w-0">
                  <div className="flex items-baseline gap-2">
                    <span className="text-xs md:text-sm font-semibold text-[var(--text-primary)]">
                      {message.sender?.name || message.sender?.email || "Team Member"}
                    </span>
                    <span className="text-[10px] md:text-[11px] text-[var(--text-muted)]">
                      {formatTimestamp(message.createdAt)}
                    </span>
                  </div>
                  <p className="text-xs md:text-sm text-[var(--text-secondary)] mt-1 whitespace-pre-wrap leading-relaxed">
                    {message.content}
                  </p>
                </div>
              </div>
            ))
          )}
          <div ref={messagesEndRef} />
        </div>

        {/* Message Input Box */}
        <div className="p-3 md:p-4 pt-0 bg-[var(--background)]">
          <form
            onSubmit={handleSendMessage}
            className="bg-[var(--surface)] rounded-xl border border-[var(--border)] focus-within:border-[var(--primary)] transition-all p-2.5 md:p-3 flex flex-col gap-2 shadow-xs"
          >
            <textarea
              rows={2}
              value={messageInput}
              onChange={(e) => setMessageInput(e.target.value)}
              onKeyDown={(e) => {
                if (e.key === "Enter" && !e.shiftKey) {
                  e.preventDefault();
                  handleSendMessage(e);
                }
              }}
              placeholder="Message #general..."
              className="w-full bg-transparent border-none focus:outline-none text-[var(--text-primary)] placeholder:text-[var(--text-muted)] resize-none text-xs md:text-sm leading-relaxed"
            />
            <div className="flex items-center justify-between pt-2 border-t border-[var(--border)]">
              <div className="flex items-center gap-0.5 sm:gap-1 text-[var(--text-secondary)]">
                <button
                  type="button"
                  className="p-1.5 rounded-md hover:bg-[var(--card-hover)] transition-colors"
                  title="Attach file"
                >
                  <Paperclip className="w-4 h-4" />
                </button>
                <button
                  type="button"
                  className="p-1.5 rounded-md hover:bg-[var(--card-hover)] transition-colors"
                  title="Insert emoji"
                >
                  <Smile className="w-4 h-4" />
                </button>
                <button
                  type="button"
                  className="p-1.5 rounded-md hover:bg-[var(--card-hover)] transition-colors hidden sm:block"
                  title="Formatting"
                >
                  <Bold className="w-4 h-4" />
                </button>
                <button
                  type="button"
                  className="p-1.5 rounded-md hover:bg-[var(--card-hover)] transition-colors hidden sm:block"
                  title="Mention"
                >
                  <AtSign className="w-4 h-4" />
                </button>
              </div>

              <button
                type="submit"
                className="bg-[var(--primary)] hover:bg-[var(--primary-hover)] text-[var(--primary-foreground)] px-3.5 py-1.5 md:px-4 md:py-2 rounded-lg flex items-center gap-1.5 text-xs font-semibold transition-all shadow-xs cursor-pointer active:scale-95"
              >
                <span>Send</span>
                <Send className="w-3.5 h-3.5" />
              </button>
            </div>
          </form>

          <div className="flex justify-between items-center mt-2 px-1 text-[10px] md:text-[11px] text-[var(--text-muted)]">
            <span className="hidden sm:inline">Pro-tip: Press Enter to send, Shift + Enter for a new line.</span>
            <span className="flex items-center gap-1 ml-auto sm:ml-0">
              <ShieldCheck className="w-3.5 h-3.5 text-[var(--primary)]" />
              Encrypted Enterprise Channel
            </span>
          </div>
        </div>
      </main>

      {/* 3. Right Sidebar: Channel About & Participants (Desktop) */}
      <aside className="w-72 hidden xl:flex flex-col border-l border-[var(--border)] bg-[var(--surface)] shrink-0 overflow-y-auto">
        <div className="p-4 border-b border-[var(--border)]">
          <h2 className="font-display text-base font-bold text-[var(--text-primary)]">
            About #general
          </h2>
        </div>

        <div className="p-4 space-y-6">
          {/* Channel Purpose */}
          <div className="flex flex-col gap-1.5">
            <span className="text-[10px] font-semibold text-[var(--text-muted)] uppercase tracking-wider">
              CHANNEL PURPOSE
            </span>
            <p className="text-xs text-[var(--text-secondary)] leading-relaxed">
              General enterprise workspace stream for cross-departmental alignment, executive updates, and high-level announcements.
            </p>
          </div>

          {/* Pinned Items */}
          <div className="flex flex-col gap-2">
            <div className="flex items-center justify-between">
              <span className="text-[10px] font-semibold text-[var(--text-muted)] uppercase tracking-wider">
                PINNED ITEMS ({PINNED_ITEMS.length})
              </span>
              <Pin className="w-3.5 h-3.5 text-[var(--text-muted)]" />
            </div>
            {PINNED_ITEMS.map((item, i) => (
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

          {/* Active Participants */}
          <div className="flex flex-col gap-2">
            <div className="flex items-center justify-between">
              <span className="text-[10px] font-semibold text-[var(--text-muted)] uppercase tracking-wider">
                ACTIVE PARTICIPANTS (48)
              </span>
              <Users className="w-3.5 h-3.5 text-[var(--text-muted)]" />
            </div>
            <div className="flex flex-col gap-1 mt-1">
              {PARTICIPANTS.map((user, i) => (
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
        </div>
      </aside>

      {/* 4. Mobile Workspace Channels Drawer */}
      {isChannelsOpen && (
        <div className="fixed inset-0 z-50 flex lg:hidden">
          <div
            className="fixed inset-0 bg-black/60 backdrop-blur-xs transition-opacity"
            onClick={() => setIsChannelsOpen(false)}
          />
          <div className="relative flex w-4/5 max-w-xs flex-col bg-[var(--surface)] border-r border-[var(--border)] p-4 text-[var(--text-primary)] shadow-2xl z-10">
            <div className="flex items-center justify-between border-b border-[var(--border)] pb-3 mb-4">
              <div className="flex items-center gap-2">
                <Hash className="w-5 h-5 text-[var(--primary)]" />
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
                  CHANNELS
                </span>
                {CHANNELS.map((channel) =>
                  channel.active ? (
                    <div
                      key={channel.id}
                      onClick={() => setIsChannelsOpen(false)}
                      className="flex items-center gap-2.5 px-3 py-2.5 rounded-lg bg-[var(--primary)]/15 text-[var(--primary)] font-medium text-sm border border-[var(--primary)]/20 shadow-xs cursor-pointer"
                    >
                      <Hash className="w-4.5 h-4.5 text-[var(--primary)] shrink-0" />
                      <span className="truncate">{channel.name}</span>
                    </div>
                  ) : (
                    <div
                      key={channel.id}
                      className="flex items-center gap-2.5 px-3 py-2.5 rounded-lg text-[var(--text-muted)] hover:bg-[var(--card-hover)]/50 transition-colors text-sm cursor-not-allowed opacity-75"
                      title="Channel locked for now"
                    >
                      <Hash className="w-4.5 h-4.5 text-[var(--text-muted)] shrink-0" />
                      <span className="truncate">{channel.name}</span>
                    </div>
                  )
                )}
              </div>
            </div>
          </div>
        </div>
      )}

      {/* 5. Mobile About #general Drawer */}
      {isInfoOpen && (
        <div className="fixed inset-0 z-50 flex justify-end xl:hidden">
          <div
            className="fixed inset-0 bg-black/60 backdrop-blur-xs transition-opacity"
            onClick={() => setIsInfoOpen(false)}
          />
          <div className="relative flex w-4/5 max-w-xs flex-col bg-[var(--surface)] border-l border-[var(--border)] p-4 text-[var(--text-primary)] shadow-2xl z-10 overflow-y-auto space-y-6">
            <div className="flex items-center justify-between border-b border-[var(--border)] pb-3">
              <h2 className="font-display text-base font-bold text-[var(--text-primary)]">
                About #general
              </h2>
              <button
                type="button"
                onClick={() => setIsInfoOpen(false)}
                className="p-1 rounded-md text-[var(--text-muted)] hover:bg-[var(--card-hover)] hover:text-[var(--text-primary)]"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            {/* Channel Purpose */}
            <div className="flex flex-col gap-1.5">
              <span className="text-[10px] font-semibold text-[var(--text-muted)] uppercase tracking-wider">
                CHANNEL PURPOSE
              </span>
              <p className="text-xs text-[var(--text-secondary)] leading-relaxed">
                General enterprise workspace stream for cross-departmental alignment, executive updates, and high-level announcements.
              </p>
            </div>

            {/* Pinned Items */}
            <div className="flex flex-col gap-2">
              <div className="flex items-center justify-between">
                <span className="text-[10px] font-semibold text-[var(--text-muted)] uppercase tracking-wider">
                  PINNED ITEMS ({PINNED_ITEMS.length})
                </span>
                <Pin className="w-3.5 h-3.5 text-[var(--text-muted)]" />
              </div>
              {PINNED_ITEMS.map((item, i) => (
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

            {/* Active Participants */}
            <div className="flex flex-col gap-2">
              <div className="flex items-center justify-between">
                <span className="text-[10px] font-semibold text-[var(--text-muted)] uppercase tracking-wider">
                  ACTIVE PARTICIPANTS (48)
                </span>
                <Users className="w-3.5 h-3.5 text-[var(--text-muted)]" />
              </div>
              <div className="flex flex-col gap-1 mt-1">
                {PARTICIPANTS.map((user, i) => (
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
          </div>
        </div>
      )}
    </div>
  );
};

export default Chat;