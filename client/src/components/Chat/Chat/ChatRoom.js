  
import React from "react";

import "./ChatRoom.css";
import useChat from "../useChat";
import InfoBar from "../InfoBar/InfoBar";

const ChatRoom = ({jobOfferTitle}) => {
  const roomId= jobOfferTitle;
  const { messages, sendMessage } = useChat(roomId);
  const [newMessage, setNewMessage] = React.useState("");
  const handleNewMessageChange = (event) => {
    setNewMessage(event.target.value);
  };

  const handleSendMessage = () => {
    sendMessage(newMessage);
    setNewMessage("");
  };
  return (
    <div className="chat-room-container">
      <InfoBar jobOfferTitle={jobOfferTitle} />
      <div className="messages-container">
        <ol className="messages-list">
          {messages.map((message, i) => (
            <li
              key={i}
              className={`message-item ${
                message.ownedByCurrentUser ? "my-message" : "received-message"
              }`}
            >
              {message.body}
            </li>
          ))}
        </ol>
      </div>
      <textarea
        value={newMessage}
        onChange={handleNewMessageChange}
        placeholder="Write message..."
        onKeyPress={event=>event.key==='Enter' ? handleSendMessage() : null}
        className="new-message-input-field"
      />
      <button onClick={handleSendMessage} className="send-message-button">
        Send
      </button>
      </div>
  );
            };
export default ChatRoom;