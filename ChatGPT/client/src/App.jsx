import "./normal.css";
import './App.css';
import { useState } from "react";
import ChatMessage from "./component/ChatMessage";

function App() {
  const [input, setInput] = useState("");
  const [chatLog, setChatLog] = useState([
    { user: "gpt", message: "How can I help you today?" },
    { user: "Tunmise", message: "I want to use chatgpt today" },
  ]);

  function clearChat() {
    setChatLog([]);
  }

  async function handleSubmit(e) {
    e.preventDefault();
    let chatLogNew = [...chatLog, { user: "Tunmise", message: `${input}` }];
    setInput("");
    setChatLog(chatLogNew);

    // fetching request to api
    try {
      const messages = chatLogNew.map((message) => message.message).join("\n");
      const response = await fetch("http://localhost:3090/", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          "Authorization": "Bearer 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"
        },
        body: JSON.stringify({
          message: messages
        }),
      });

      const data = await response.json();
      setChatLog([...chatLogNew, { user: "gpt", message: `${data.message}`}]);
    } catch (error) {
      console.error("Error sending message:", error);
    }
  }

  return (
    <>
      <aside className="sideMenu">
        <div className="side-menu-button" onClick={clearChat}>
          <span>+</span>
          New Chat
        </div>
      </aside>
      {/* ------------------SECTION---------------------------*/}
      <section className="chatbox">
        <div className="chat-log">
          {chatLog.map((message, index) => (
            <ChatMessage key={index} message={message} />
          ))}
        </div>
        <div className="chat-input-holder">
          <form onSubmit={handleSubmit}>
            <input
              rows="1"
              value={input}
              onChange={(e) => setInput(e.target.value)}
              className="chat-input-textarea"
              placeholder="Type your message in here"
            />
          </form>
        </div>
      </section>
    </>
  );
}

export default App;
