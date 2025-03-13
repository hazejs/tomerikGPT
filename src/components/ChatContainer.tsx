import React, { useEffect, useRef } from "react";

interface Message {
  role: string;
  content: string;
}

interface ChatContainerProps {
  messages: Message[];
}

const ChatContainer: React.FC<ChatContainerProps> = ({ messages }) => {
  // Create a ref for the messages container
  const messagesEndRef = useRef<HTMLDivElement>(null);

  // This effect runs whenever messages change
  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  return (
    <div className="chat-container" ref={messagesEndRef}>
      {messages.map((message, index) => (
        <div key={index} className={`message ${message.role}`}>
          {message.content}
        </div>
      ))}
    </div>
  );
};

export default ChatContainer;
