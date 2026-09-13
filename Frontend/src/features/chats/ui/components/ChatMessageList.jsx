import React from "react";
import { Eye } from "lucide-react";
import { getInitials, formatTimestamp } from "../../utils/chat.utils.js";
import DocumentCard from "./DocumentCard.jsx";
import AudioPlayer from "./AudioPlayer.jsx";

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

const ChatMessageList = ({
  messageList,
  messagesWithSeparators,
  userObj,
  currentChannel,
  ChannelIcon,
  setLightboxImage,
  messagesEndRef,
}) => {
  return (
    <div className="flex-1 overflow-y-auto p-3 md:p-6 space-y-4">
      {/* Empty State */}
      {messageList.length === 0 ? (
        <div className="flex-1 flex flex-col items-center justify-center text-center p-8 text-[var(--text-muted)] my-auto h-full">
          <div className="w-12 h-12 rounded-full bg-[var(--primary)]/10 text-[var(--primary)] flex items-center justify-center mb-3 mx-auto">
            <ChannelIcon className="w-6 h-6" />
          </div>
          <p className="text-base font-medium text-[var(--text-primary)]">
            Welcome to #{currentChannel.name}!
          </p>
          <p className="text-xs text-[var(--text-secondary)] mt-1 max-w-sm mx-auto">
            This is the beginning of the #{currentChannel.name} channel. Send a
            message below to start the conversation.
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
          const senderRole = (message.sender?.role || "").toLowerCase();
          const senderDept = (message.sender?.department || "").toLowerCase();

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
                {getInitials(message.sender?.name || message.sender?.email)}
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
                {message.attachments && message.attachments.length > 0 && (
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
                        return <AudioPlayer key={i} src={file.url} name={file.name} />;
                      }
                      return <DocumentCard key={i} file={file} />;
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
  );
};

export default ChatMessageList;
