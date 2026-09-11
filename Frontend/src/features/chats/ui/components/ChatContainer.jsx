import React, { useEffect, useRef, useState } from "react";
import { useSelector } from "react-redux";
import { useLocation, useNavigate } from "react-router";
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
  Lock,
  Radio,
  Code2,
  Palette,
  Briefcase,
  Megaphone,
} from "lucide-react";
import { useChat } from "../../hooks/useChat.jsx";
import {
  CHAT_CHANNELS,
  canAccessChannel,
} from "../../constants/chatChannels.js";

const getChannelIcon = (id) => {
  switch (id) {
    case "general":
      return Hash;
    case "announcements":
      return Radio;
    case "developers":
      return Code2;
    case "designers":
      return Palette;
    case "managers":
      return Briefcase;
    case "marketers":
      return Megaphone;
    default:
      return Hash;
  }
};

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

const ChatContainer = ({ channelId = "general" }) => {
  const navigate = useNavigate();
  const location = useLocation();
  const { employee } = useSelector((state) => state.auth);

  const { messages, messageInput, setMessageInput, handleSendMessage } =
    useChat();

  const [isChannelsOpen, setIsChannelsOpen] = useState(false);
  const [isInfoOpen, setIsInfoOpen] = useState(false);

  const messagesEndRef = useRef(null);

  // Find current active channel config
  const currentChannel =
    CHAT_CHANNELS.find((c) => c.id === channelId) || CHAT_CHANNELS[0];

  const ChannelIcon = getChannelIcon(currentChannel.id);

  // Extract message list
  const messageList = Array.isArray(messages)
    ? messages
    : messages?.messages || messages?.data || [];

  // Auto-scroll on new messages
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

  return (
    <div className="relative flex h-[calc(100vh-64px)] w-full overflow-hidden bg-[var(--background)] text-[var(--text-primary)]">
      {/* 1. Left Workspace Channels Sidebar (Desktop) */}
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

        {/* Message Stream */}
        <div className="flex-1 overflow-y-auto p-3 md:p-6 space-y-4">
          <div className="flex items-center justify-center my-2">
            <span className="px-3 py-1 rounded-full text-[11px] font-medium bg-[var(--surface)] text-[var(--text-muted)] border border-[var(--border)] shadow-xs">
              Today
            </span>
          </div>

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
            messageList.map((message, index) => {
              const userObj =
                employee?.user ||
                employee?.data?.user ||
                employee?.employee?.user ||
                employee ||
                {};
              const currentUserId = String(userObj?._id || userObj?.id || "");
              const currentUserEmail = (userObj?.email || "").toLowerCase();

              const senderId = String(
                message.sender?._id ||
                  (typeof message.sender === "string" ? message.sender : "") ||
                  ""
              );
              const senderEmail = (message.sender?.email || "").toLowerCase();

              const isOwn =
                (currentUserId && senderId && currentUserId === senderId) ||
                (currentUserEmail && senderEmail && currentUserEmail === senderEmail);

              return (
                <div
                  key={message._id || index}
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
                    {getInitials(message.sender?.name || message.sender?.email)}
                  </div>
                  <div className="flex flex-col flex-1 min-w-0">
                    <div className="flex items-center gap-2">
                      <span
                        className={`text-xs md:text-sm font-semibold truncate ${
                          isOwn
                            ? "text-[var(--primary)] font-bold"
                            : "text-[var(--text-primary)]"
                        }`}
                      >
                        {message.sender?.name || message.sender?.email}
                      </span>
                      {isOwn && (
                        <span className="text-[10px] px-1.5 py-0.2 rounded font-semibold bg-[var(--primary)] text-[var(--primary-foreground)] shadow-xs">
                          You
                        </span>
                      )}
                      <span className="text-[10px] md:text-[11px] text-[var(--text-muted)] ml-auto sm:ml-0">
                        {formatTimestamp(message.createdAt)}
                      </span>
                    </div>
                    <p className="text-xs md:text-sm text-[var(--text-secondary)] mt-1 whitespace-pre-wrap leading-relaxed">
                      {message.content}
                    </p>
                  </div>
                </div>
              );
            })
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
              placeholder={`Message #${currentChannel.name}...`}
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

      {/* 3. Right Sidebar: Channel About & Participants (Desktop) */}
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

      {/* 5. Mobile About Channel Drawer */}
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
        </div>
      )}
    </div>
  );
};

export default ChatContainer;
