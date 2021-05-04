  
import React from "react";
import {Grid, Paper,Typography} from '@material-ui/core';
import "./ChatRoom.css";
import useChat from "../useChat";
import InfoBar from "../InfoBar/InfoBar";

const ChatRoom = ({jobOfferTitle,user}) => {


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
  if (!user?.result?.name) {
    return (
        <Grid item xs={12} sm={12}>
            <Paper className="paper">
                <Typography component="p" variant="h6" align="center">
                    Please Sign In to Chat.
                </Typography>
            </Paper>
        </Grid>
    )
}
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