import React from "react";
import { Loader2 } from "lucide-react";
import { useChat } from "../../hooks/useChat.jsx";

// Import layout & chat components
import ChatSidebar from "./ChatSidebar.jsx";
import ChatHeader from "./ChatHeader.jsx";
import ChatMessageList from "./ChatMessageList.jsx";
import ChatInputBox from "./ChatInputBox.jsx";
import ChatInfoSidebar from "./ChatInfoSidebar.jsx";
import ImageLightbox from "./ImageLightbox.jsx";
import { useSelector } from "react-redux";

const ChatContainer = () => {
  const {employee} = useSelector(state => state.auth)

  // const { user: userObj } = useAuth();
  // const employee = userObj?.employee || userObj || {};

  const {
    currentChannel,
    isChannelsOpen,
    setIsChannelsOpen,
    isInfoOpen,
    setIsInfoOpen,
    messageList,
    messagesWithSeparators,
    newMessage,
    setNewMessage,
    handleSendMessage,
    messagesEndRef,
    handleChannelClick,
    isChannelActive,
    getChannelIcon,
    ChannelIcon,
    isError,
    isLoading,
    isUploading,
    fileInputRef,
    handleFileSelect,
    selectedFiles,
    removeFile,
    lightboxImage,
    setLightboxImage,
    isRecording,
    recordingDuration,
    audioBlob,
    startRecording,
    stopRecording,
    cancelRecording,
    discardRecording,
    sendRecording,
  } = useChat();

  return (
    <div className="flex flex-col h-[calc(100vh-4rem)] bg-[var(--background)] relative">
      <div className="flex flex-1 overflow-hidden relative">
        {/* Left Sidebar */}
        <ChatSidebar
          employee={employee?.data?.user}
          isChannelActive={isChannelActive}
          handleChannelClick={handleChannelClick}
          getChannelIcon={getChannelIcon}
          isChannelsOpen={isChannelsOpen}
          setIsChannelsOpen={setIsChannelsOpen}
        />

        {/* Central Chat Area */}
        <main className="flex flex-col flex-1 min-w-0 bg-[var(--background)] relative">
          <ChatHeader
            currentChannel={currentChannel}
            ChannelIcon={ChannelIcon}
            setIsChannelsOpen={setIsChannelsOpen}
            setIsInfoOpen={setIsInfoOpen}
          />

          <div className="flex-1 relative flex flex-col min-h-0 bg-[var(--background)]/50">
            {isLoading ? (
              <div className="absolute inset-0 flex flex-col items-center justify-center bg-[var(--background)]/50 backdrop-blur-sm z-10">
                <Loader2 className="w-8 h-8 animate-spin text-[var(--primary)] mb-4" />
                <p className="text-sm text-[var(--text-secondary)] font-medium">
                  Loading messages...
                </p>
              </div>
            ) : isError ? (
              <div className="absolute inset-0 flex items-center justify-center bg-[var(--background)]/50 backdrop-blur-sm z-10">
                <div className="bg-red-500/10 text-red-500 px-4 py-3 rounded-lg border border-red-500/20 text-sm font-medium flex items-center gap-2">
                  <span>Failed to load messages. Please try again.</span>
                  <button
                    onClick={() => window.location.reload()}
                    className="underline hover:text-red-600 ml-2"
                  >
                    Retry
                  </button>
                </div>
              </div>
            ) : null}

            <ChatMessageList
              messageList={messageList}
              messagesWithSeparators={messagesWithSeparators}
              userObj={employee?.data?.user}
              currentChannel={currentChannel}
              ChannelIcon={ChannelIcon}
              setLightboxImage={setLightboxImage}
              messagesEndRef={messagesEndRef}
            />
          </div>

          {/* Uploading Overlay */}
          {isUploading && (
            <div className="absolute inset-x-0 bottom-0 top-auto h-1 bg-[var(--surface)] overflow-hidden z-20">
              <div className="h-full bg-[var(--primary)] w-full animate-progress origin-left" />
            </div>
          )}

          <ChatInputBox
            newMessage={newMessage}
            setNewMessage={setNewMessage}
            handleSendMessage={handleSendMessage}
            fileInputRef={fileInputRef}
            handleFileSelect={handleFileSelect}
            selectedFiles={selectedFiles}
            removeFile={removeFile}
            setLightboxImage={setLightboxImage}
            isRecording={isRecording}
            recordingDuration={recordingDuration}
            audioBlob={audioBlob}
            startRecording={startRecording}
            stopRecording={stopRecording}
            cancelRecording={cancelRecording}
            discardRecording={discardRecording}
            sendRecording={sendRecording}
          />
        </main>

        {/* Right Sidebar */}
        <ChatInfoSidebar
          currentChannel={currentChannel}
          isInfoOpen={isInfoOpen}
          setIsInfoOpen={setIsInfoOpen}
        />
      </div>

      {/* Lightbox for Images */}
      {lightboxImage && (
        <ImageLightbox
          image={lightboxImage}
          onClose={() => setLightboxImage(null)}
        />
      )}
    </div>
  );
};

export default ChatContainer;
