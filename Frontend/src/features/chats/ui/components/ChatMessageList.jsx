import React, { useState, useEffect, useRef } from "react";
import {
  Eye,
  MoreVertical,
  Pencil,
  Trash2,
  X,
  Check,
  Ban,
  AlertTriangle,
} from "lucide-react";
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
  onEditMessage,
  onDeleteMessage,
}) => {
  // Context Menu State
  const [menuState, setMenuState] = useState({
    isOpen: false,
    x: 0,
    y: 0,
    message: null,
    canEdit: false,
    canDelete: false,
  });

  // Edit Modal State
  const [editingMessage, setEditingMessage] = useState(null);
  const [editContent, setEditContent] = useState("");

  // Delete Confirm Modal State
  const [deletingMessage, setDeletingMessage] = useState(null);

  // Long press timer ref for mobile touch support
  const touchTimerRef = useRef(null);
  const menuRef = useRef(null);

  // Close context menu on outside click or scroll
  useEffect(() => {
    const handleClickOutside = (e) => {
      if (menuRef.current && !menuRef.current.contains(e.target)) {
        setMenuState((prev) => ({ ...prev, isOpen: false }));
      }
    };
    const handleScroll = () => {
      if (menuState.isOpen) {
        setMenuState((prev) => ({ ...prev, isOpen: false }));
      }
    };

    window.addEventListener("click", handleClickOutside);
    window.addEventListener("scroll", handleScroll, true);
    return () => {
      window.removeEventListener("click", handleClickOutside);
      window.removeEventListener("scroll", handleScroll, true);
    };
  }, [menuState.isOpen]);

  const openContextMenu = (e, message, isOwn, isAdmin) => {
    e.preventDefault();
    e.stopPropagation();

    // If already deleted, do not open options
    if (message.isDeleted) return;

    // Permissions:
    // Sender: can edit & delete
    // Admin: can delete any message (and edit if own)
    const canEdit = isOwn;
    const canDelete = isOwn || isAdmin;

    if (!canEdit && !canDelete) return;

    const clickX = e.clientX || (e.touches && e.touches[0]?.clientX) || window.innerWidth / 2;
    const clickY = e.clientY || (e.touches && e.touches[0]?.clientY) || window.innerHeight / 2;

    // Constrain position to viewport
    const menuWidth = 180;
    const menuHeight = 110;
    const adjustedX = Math.min(clickX, window.innerWidth - menuWidth - 10);
    const adjustedY = Math.min(clickY, window.innerHeight - menuHeight - 10);

    setMenuState({
      isOpen: true,
      x: adjustedX,
      y: adjustedY,
      message,
      canEdit,
      canDelete,
    });
  };

  const handleTouchStart = (e, message, isOwn, isAdmin) => {
    if (message.isDeleted) return;
    touchTimerRef.current = setTimeout(() => {
      openContextMenu(e, message, isOwn, isAdmin);
    }, 500); // 500ms long press
  };

  const handleTouchEnd = () => {
    if (touchTimerRef.current) {
      clearTimeout(touchTimerRef.current);
      touchTimerRef.current = null;
    }
  };

  const handleStartEdit = () => {
    if (!menuState.message) return;
    setEditingMessage(menuState.message);
    setEditContent(menuState.message.content || "");
    setMenuState((prev) => ({ ...prev, isOpen: false }));
  };

  const handleConfirmEdit = () => {
    if (!editingMessage || !editContent.trim()) return;
    if (onEditMessage) {
      onEditMessage(editingMessage._id, editContent);
    }
    setEditingMessage(null);
    setEditContent("");
  };

  const handleStartDelete = () => {
    if (!menuState.message) return;
    setDeletingMessage(menuState.message);
    setMenuState((prev) => ({ ...prev, isOpen: false }));
  };

  const handleConfirmDelete = () => {
    if (!deletingMessage) return;
    if (onDeleteMessage) {
      onDeleteMessage(deletingMessage._id);
    }
    setDeletingMessage(null);
  };

  // Current logged in user info
  const currentUserId = String(userObj?._id || userObj?.id || "");
  const currentUserEmail = (userObj?.email || "").toLowerCase();
  const isCurrentUserAdmin = (userObj?.role || "").toLowerCase() === "admin";

  return (
    <div className="flex-1 overflow-y-auto p-3 md:p-6 space-y-4 min-w-0">
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
          const senderId = String(
            message.sender?._id ||
              (typeof message.sender === "string" ? message.sender : "") ||
              ""
          );
          const senderEmail = (message.sender?.email || "").toLowerCase();
          const isOwn =
            (Boolean(currentUserId) && Boolean(senderId) && currentUserId === senderId) ||
            (Boolean(currentUserEmail) && Boolean(senderEmail) && currentUserEmail === senderEmail);
          const senderRole = (message.sender?.role || "").toLowerCase();
          const senderDept = (message.sender?.department || "").toLowerCase();

          // Check if message is deleted
          const isDeleted = Boolean(message.isDeleted);
          const deletedByObj = message.deletedBy;
          const isDeletedByAdmin =
            deletedByObj?.role === "admin" ||
            (!deletedByObj && isCurrentUserAdmin && !isOwn);
          const deletedByName = deletedByObj?.name || deletedByObj?.email || (isDeletedByAdmin ? "Admin" : "sender");

          const canShowMenuOptions = !isDeleted && (isOwn || isCurrentUserAdmin);

          return (
            <div
              key={item.key}
              onContextMenu={(e) => {
                if (canShowMenuOptions) {
                  openContextMenu(e, message, isOwn, isCurrentUserAdmin);
                }
              }}
              onTouchStart={(e) => {
                if (canShowMenuOptions) {
                  handleTouchStart(e, message, isOwn, isCurrentUserAdmin);
                }
              }}
              onTouchEnd={handleTouchEnd}
              onTouchMove={handleTouchEnd}
              className={`group relative flex items-start gap-3 p-2.5 md:p-3 rounded-xl transition-all select-text max-w-full overflow-hidden ${
                isDeleted
                  ? "bg-[var(--surface)]/40 border border-dashed border-[var(--border)] opacity-75"
                  : isOwn
                  ? "bg-[var(--primary)]/10 border border-[var(--primary)]/25 shadow-xs"
                  : "hover:bg-[var(--card-hover)]/30 border border-transparent"
              }`}
            >
              {/* Avatar */}
              <div
                className={`w-8 h-8 md:w-9 md:h-9 rounded-full flex items-center justify-center font-bold text-xs shrink-0 shadow-xs border ${
                  isDeleted
                    ? "bg-[var(--surface)] text-[var(--text-muted)] border-[var(--border)]"
                    : isOwn
                    ? "bg-[var(--primary)] text-[var(--primary-foreground)] border-[var(--primary)] ring-2 ring-[var(--primary)]/20"
                    : "bg-[var(--primary-light)] text-[var(--primary)] border-[var(--primary)]/20"
                }`}
              >
                {isDeleted ? <Ban className="w-4 h-4 text-[var(--text-muted)]" /> : getInitials(message.sender?.name || message.sender?.email)}
              </div>

              {/* Body */}
              <div className="flex flex-col flex-1 min-w-0 max-w-full overflow-hidden">
                <div className="flex flex-wrap items-center gap-2">
                  <span
                    className={`text-xs md:text-sm font-semibold truncate ${
                      isDeleted
                        ? "text-[var(--text-muted)]"
                        : isOwn
                        ? "text-[var(--primary)] font-bold"
                        : "text-[var(--text-primary)]"
                    }`}
                  >
                    {message.sender?.name || message.sender?.email || "Unknown"}
                  </span>

                  {!isDeleted && senderRole === "admin" ? (
                    <span className="text-[10px] px-1.5 py-0.5 rounded font-semibold bg-[var(--accent)]/15 text-[var(--accent)] border border-[var(--accent)]/20">
                      Admin
                    </span>
                  ) : !isDeleted && senderDept && senderDept !== "common" ? (
                    <span className="text-[10px] px-1.5 py-0.5 rounded font-medium bg-[var(--card-hover)] text-[var(--text-secondary)] border border-[var(--border)] capitalize">
                      {senderDept}
                    </span>
                  ) : null}

                  {isOwn && !isDeleted && (
                    <span className="text-[10px] px-1.5 py-0.2 rounded font-semibold bg-[var(--primary)] text-[var(--primary-foreground)] shadow-xs">
                      You
                    </span>
                  )}

                  {/* Edited Badge */}
                  {!isDeleted && message.isEdited && (
                    <span className="text-[10px] px-1.5 py-0.2 rounded font-medium bg-[var(--surface)] text-[var(--text-muted)] border border-[var(--border)] flex items-center gap-1">
                      <Pencil className="w-2.5 h-2.5" />
                      edited
                    </span>
                  )}

                  <span className="text-[10px] md:text-[11px] text-[var(--text-muted)] ml-auto">
                    {formatTimestamp(message.createdAt)}
                  </span>

                  {/* 3-dots mobile/hover trigger button */}
                  {canShowMenuOptions && (
                    <button
                      type="button"
                      onClick={(e) => openContextMenu(e, message, isOwn, isCurrentUserAdmin)}
                      aria-label="Message options"
                      className="opacity-80 md:opacity-0 md:group-hover:opacity-100 p-1 hover:bg-[var(--surface)] rounded-md text-[var(--text-muted)] hover:text-[var(--text-primary)] transition-all cursor-pointer"
                    >
                      <MoreVertical className="w-3.5 h-3.5" />
                    </button>
                  )}
                </div>

                {/* Deleted State or Message Content */}
                {isDeleted ? (
                  <div className="flex items-center gap-1.5 text-xs italic text-[var(--text-muted)] mt-1.5 py-1 px-2.5 rounded-lg bg-[var(--surface)]/60 border border-[var(--border)]/60 w-fit max-w-full">
                    <Ban className="w-3.5 h-3.5 shrink-0 text-red-400" />
                    <span className="truncate">
                      {isDeletedByAdmin
                        ? "Message deleted by Admin"
                        : `Message deleted by ${deletedByName || "user"}`}
                    </span>
                  </div>
                ) : (
                  <>
                    {/* Text Content with strict word breaking to prevent horizontal scroller overflow */}
                    {message.content && (
                      <p className="text-xs md:text-sm text-[var(--text-secondary)] mt-1 whitespace-pre-wrap leading-relaxed break-words break-all [overflow-wrap:anywhere] max-w-full">
                        {renderMessageContent(message.content)}
                      </p>
                    )}

                    {/* Attachments */}
                    {message.attachments && message.attachments.length > 0 && (
                      <div className="flex flex-wrap gap-2 mt-2 max-w-full">
                        {message.attachments.map((file, i) => {
                          if (file.type?.startsWith("image/")) {
                            return (
                              <button
                                key={i}
                                type="button"
                                onClick={() => setLightboxImage(file)}
                                className="relative group/img rounded-lg overflow-hidden border border-[var(--border)] hover:border-[var(--primary)]/30 transition-all cursor-pointer"
                              >
                                <img
                                  src={file.url}
                                  alt={file.name}
                                  className="max-w-[200px] max-h-[200px] object-cover"
                                />
                                <div className="absolute inset-0 bg-black/0 group-hover/img:bg-black/20 transition-colors flex items-center justify-center">
                                  <Eye className="w-5 h-5 text-white opacity-0 group-hover/img:opacity-100 transition-opacity drop-shadow-lg" />
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
                  </>
                )}
              </div>
            </div>
          );
        })
      )}
      <div ref={messagesEndRef} />

      {/* ─── Context Menu (Right Click / Long Press / More Options) ─── */}
      {menuState.isOpen && (
        <div
          ref={menuRef}
          style={{ top: `${menuState.y}px`, left: `${menuState.x}px` }}
          className="fixed z-50 min-w-[160px] bg-[var(--card)]/95 backdrop-blur-md border border-[var(--border)] rounded-xl shadow-xl py-1.5 animate-in fade-in zoom-in-95 duration-100"
        >
          {menuState.canEdit && (
            <button
              type="button"
              onClick={handleStartEdit}
              className="w-full flex items-center gap-2.5 px-3.5 py-2 text-xs font-medium text-[var(--text-primary)] hover:bg-[var(--primary)]/10 hover:text-[var(--primary)] transition-colors cursor-pointer text-left"
            >
              <Pencil className="w-3.5 h-3.5 text-[var(--primary)]" />
              <span>Edit Message</span>
            </button>
          )}
          {menuState.canDelete && (
            <button
              type="button"
              onClick={handleStartDelete}
              className="w-full flex items-center gap-2.5 px-3.5 py-2 text-xs font-medium text-red-500 hover:bg-red-500/10 transition-colors cursor-pointer text-left"
            >
              <Trash2 className="w-3.5 h-3.5 text-red-500" />
              <span>Delete Message</span>
            </button>
          )}
        </div>
      )}

      {/* ─── Edit Modal ─── */}
      {editingMessage && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-xs animate-in fade-in">
          <div className="bg-[var(--card)] border border-[var(--border)] rounded-2xl w-full max-w-lg shadow-2xl p-5 space-y-4">
            <div className="flex items-center justify-between border-b border-[var(--border)] pb-3">
              <div className="flex items-center gap-2">
                <div className="w-8 h-8 rounded-lg bg-[var(--primary)]/10 text-[var(--primary)] flex items-center justify-center">
                  <Pencil className="w-4 h-4" />
                </div>
                <div>
                  <h3 className="text-sm font-semibold text-[var(--text-primary)]">
                    Edit Message
                  </h3>
                  <p className="text-[11px] text-[var(--text-muted)]">
                    Update your message in #{currentChannel?.name}
                  </p>
                </div>
              </div>
              <button
                type="button"
                onClick={() => setEditingMessage(null)}
                className="p-1 rounded-lg text-[var(--text-muted)] hover:text-[var(--text-primary)] hover:bg-[var(--surface)] transition-colors cursor-pointer"
              >
                <X className="w-4 h-4" />
              </button>
            </div>

            <div>
              <textarea
                value={editContent}
                onChange={(e) => setEditContent(e.target.value)}
                placeholder="Edit your message..."
                rows={4}
                className="w-full px-3.5 py-2.5 text-xs md:text-sm rounded-xl bg-[var(--surface)] border border-[var(--border)] text-[var(--text-primary)] placeholder-[var(--text-muted)] focus:outline-none focus:ring-2 focus:ring-[var(--primary)]/30 focus:border-[var(--primary)] resize-none transition-all leading-relaxed"
                autoFocus
              />
            </div>

            <div className="flex items-center justify-end gap-2.5 pt-1">
              <button
                type="button"
                onClick={() => setEditingMessage(null)}
                className="px-4 py-2 text-xs font-medium rounded-xl border border-[var(--border)] text-[var(--text-secondary)] hover:bg-[var(--surface)] transition-colors cursor-pointer"
              >
                Cancel
              </button>
              <button
                type="button"
                disabled={!editContent.trim()}
                onClick={handleConfirmEdit}
                className="px-4 py-2 text-xs font-semibold rounded-xl bg-[var(--primary)] text-[var(--primary-foreground)] hover:opacity-90 disabled:opacity-50 disabled:cursor-not-allowed transition-all flex items-center gap-1.5 shadow-sm cursor-pointer"
              >
                <Check className="w-3.5 h-3.5" />
                Save Changes
              </button>
            </div>
          </div>
        </div>
      )}

      {/* ─── Delete Confirmation Modal ─── */}
      {deletingMessage && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-xs animate-in fade-in">
          <div className="bg-[var(--card)] border border-[var(--border)] rounded-2xl w-full max-w-md shadow-2xl p-5 space-y-4">
            <div className="flex items-start gap-3">
              <div className="w-10 h-10 rounded-xl bg-red-500/10 text-red-500 flex items-center justify-center shrink-0 border border-red-500/20">
                <AlertTriangle className="w-5 h-5" />
              </div>
              <div className="space-y-1 flex-1 min-w-0">
                <h3 className="text-sm font-semibold text-[var(--text-primary)]">
                  Delete Message?
                </h3>
                <p className="text-xs text-[var(--text-secondary)] leading-relaxed">
                  Are you sure you want to delete this message? The message text will be removed and marked as deleted.
                </p>
              </div>
            </div>

            {deletingMessage.content && (
              <div className="p-3 rounded-xl bg-[var(--surface)] border border-[var(--border)] text-xs text-[var(--text-muted)] italic truncate">
                "{deletingMessage.content}"
              </div>
            )}

            <div className="flex items-center justify-end gap-2.5 pt-2">
              <button
                type="button"
                onClick={() => setDeletingMessage(null)}
                className="px-4 py-2 text-xs font-medium rounded-xl border border-[var(--border)] text-[var(--text-secondary)] hover:bg-[var(--surface)] transition-colors cursor-pointer"
              >
                Cancel
              </button>
              <button
                type="button"
                onClick={handleConfirmDelete}
                className="px-4 py-2 text-xs font-semibold rounded-xl bg-red-500 text-white hover:bg-red-600 transition-all flex items-center gap-1.5 shadow-sm cursor-pointer"
              >
                <Trash2 className="w-3.5 h-3.5" />
                Delete
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default ChatMessageList;

