import { useChat } from "../../hooks/useChat.jsx";


const Chat = () => {
  const {
    messages,
    messageInput,
    setMessageInput,
    handleSendMessage,
  } = useChat();

  // Extract the actual array of messages depending on the API response structure
  const messageList = Array.isArray(messages) ? messages : (messages?.messages || messages?.data || []);
  console.log(messageList)

  return (
    <div>
      <h1>Team Chat</h1>

      <div>
        {messageList.map((message, index) => (
          <div key={index}>
            {message.content}
          </div>
        ))}
      </div>

      <form onSubmit={handleSendMessage}>
        <input
          value={messageInput}
          onChange={(e) => setMessageInput(e.target.value)}
          placeholder="Type a message..."
        />

        <button type="submit">
          Send
        </button>
      </form>
    </div>
  );
};

export default Chat;