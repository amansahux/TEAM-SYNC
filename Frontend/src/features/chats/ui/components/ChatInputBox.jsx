import React from "react";
import { Smile, Paperclip, Send, Mic } from "lucide-react";
import VoiceRecordingBar from "./VoiceRecordingBar.jsx";
import FilePreviewCard from "./FilePreviewCard.jsx";

const ChatInputBox = ({
  newMessage,
  setNewMessage,
  handleSendMessage,
  fileInputRef,
  handleFileSelect,
  selectedFiles,
  removeFile,
  setLightboxImage,
  isRecording,
  recordingDuration,
  audioBlob,
  startRecording,
  stopRecording,
  cancelRecording,
  discardRecording,
  sendRecording,
}) => {
  const isTypingOrHasFiles = newMessage.trim() || selectedFiles.length > 0;

  return (
    <div className="p-3 md:p-4 border-t border-[var(--border)] bg-[var(--surface)] shrink-0">
      <div className="max-w-4xl mx-auto flex flex-col gap-2">
        {/* Previews */}
        {selectedFiles.length > 0 && (
          <div className="flex flex-wrap items-center gap-2 px-1">
            {selectedFiles.map((file, i) => (
              <FilePreviewCard
                key={i}
                file={file}
                onRemove={() => removeFile(i)}
                onPreviewImage={setLightboxImage}
              />
            ))}
          </div>
        )}

        {/* Input Bar or Voice Recording Bar */}
        {(isRecording || audioBlob) ? (
          <VoiceRecordingBar
            isRecording={isRecording}
            recordingDuration={recordingDuration}
            audioBlob={audioBlob}
            onStop={stopRecording}
            onCancel={cancelRecording}
            onDiscard={discardRecording}
            onSend={sendRecording}
          />
        ) : (
          <form
            onSubmit={handleSendMessage}
            className="flex items-end gap-2 bg-[var(--card)] p-1.5 rounded-xl border border-[var(--border)] shadow-sm focus-within:border-[var(--primary)]/50 focus-within:ring-2 focus-within:ring-[var(--primary)]/10 transition-all"
          >
            <button
              type="button"
              className="p-2 rounded-lg text-[var(--text-secondary)] hover:bg-[var(--card-hover)] hover:text-[var(--text-primary)] transition-colors shrink-0"
              title="Add Emoji"
            >
              <Smile className="w-5 h-5" />
            </button>
            <input
              type="file"
              multiple
              ref={fileInputRef}
              onChange={handleFileSelect}
              className="hidden"
            />
            <button
              type="button"
              onClick={() => fileInputRef.current?.click()}
              className="p-2 rounded-lg text-[var(--text-secondary)] hover:bg-[var(--card-hover)] hover:text-[var(--text-primary)] transition-colors shrink-0"
              title="Attach File"
            >
              <Paperclip className="w-5 h-5" />
            </button>

            <textarea
              value={newMessage}
              onChange={(e) => setNewMessage(e.target.value)}
              onKeyDown={(e) => {
                if (e.key === "Enter" && !e.shiftKey) {
                  e.preventDefault();
                  handleSendMessage(e);
                }
              }}
              placeholder="Type a message..."
              className="flex-1 bg-transparent border-none text-sm text-[var(--text-primary)] placeholder:text-[var(--text-muted)] focus:outline-none resize-none py-2.5 px-1 min-h-[40px] max-h-[120px]"
              rows="1"
            />

            {/* Mic OR Send Button */}
            <div className="flex items-center shrink-0">
              {isTypingOrHasFiles ? (
                <button
                  type="submit"
                  disabled={!isTypingOrHasFiles}
                  className="p-2.5 m-0.5 rounded-lg bg-[var(--primary)] text-[var(--primary-foreground)] hover:bg-[var(--primary-hover)] disabled:opacity-50 disabled:cursor-not-allowed transition-all shadow-xs cursor-pointer active:scale-95 flex items-center justify-center"
                  title="Send message"
                >
                  <Send className="w-4 h-4 ml-0.5" />
                </button>
              ) : (
                <button
                  type="button"
                  onClick={startRecording}
                  className="p-2.5 m-0.5 rounded-lg bg-[var(--surface)] text-[var(--text-secondary)] hover:bg-[var(--card-hover)] hover:text-[var(--primary)] transition-all cursor-pointer active:scale-95 flex items-center justify-center border border-[var(--border)]"
                  title="Record voice message"
                >
                  <Mic className="w-4 h-4" />
                </button>
              )}
            </div>
          </form>
        )}
      </div>
    </div>
  );
};

export default ChatInputBox;
