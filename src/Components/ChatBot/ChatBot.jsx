import { useState, useEffect } from "react";
import axios from "axios";
import { FaRobot } from "react-icons/fa";
import "./ChatBot.css";

const ChatBot = () => {
  const [messages, setMessages] = useState([]);
  const [input, setInput] = useState("");
  const [isServerConnected, setIsServerConnected] = useState(false);
  const [isTyping, setIsTyping] = useState(false);

  useEffect(() => {
    const testConnection = async () => {
      try {
        await axios.get("http://localhost:5000");
        setIsServerConnected(true);
        console.log(isServerConnected);
        console.log("Successfully connected to server");
      } catch (error) {
        console.error("Server connection failed:", error);
        setIsServerConnected(false);
      }
    };
    testConnection();
  }, []);

  const sendMessage = async () => {
    if (input.trim() === "") return;

    const userMessage = { sender: "user", text: input };
    setMessages((prevMessages) => [...prevMessages, userMessage]);
    setIsTyping(true);

    try {
      console.log("Sending message:", input);
      const response = await axios.post("http://localhost:5000/chat", {
        message: input,
      });

      console.log("Server response:", response);

      if (!response.data || !response.data.reply) {
        throw new Error("Invalid response format from server");
      }

      const botMessage = { sender: "bot", text: response.data.reply };
      setMessages((prevMessages) => [...prevMessages, botMessage]);
      setIsTyping(false);
    } catch (error) {
      console.error("Detailed error information:", {
        message: error.message,
        response: error.response,
        status: error.response?.status,
        data: error.response?.data,
      });

      const errorMessage =
        error.response?.data?.error ||
        "Sorry, something went wrong! Please check if the server is running.";

      const botMessage = {
        sender: "bot",
        text: errorMessage,
      };
      setMessages((prevMessages) => [...prevMessages, botMessage]);
      setIsTyping(false);
    }

    setInput("");
  };

  return (
    <div className="chatbot-wrapper">
      <div className="chatbot-header">
        <FaRobot className="bot-icon" />
        <h2>AI Assistant</h2>
      </div>

      <div className="chat-container">
        <div className="chat-box">
          {messages.map((msg, index) => (
            <div key={index} className={`message ${msg.sender} fade-in`}>
              {msg.text}
              <span className="message-time">
                {new Date().toLocaleTimeString()}
              </span>
            </div>
          ))}
          {isTyping && (
            <div className="typing-indicator">
              <span></span>
              <span></span>
              <span></span>
            </div>
          )}
        </div>

        <div className="input-container">
          <input
            type="text"
            value={input}
            onChange={(e) => setInput(e.target.value)}
            onKeyDown={(e) => e.key === "Enter" && sendMessage()}
            placeholder="Type your message..."
            className="chat-input"
          />
          <button
            onClick={sendMessage}
            className="send-button"
            disabled={!input.trim()}
          >
            Send
          </button>
        </div>
      </div>
    </div>
  );
};

export default ChatBot;
