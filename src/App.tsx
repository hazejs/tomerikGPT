import React, { useState } from "react";
import { Message, ChatState } from "./types";
import { ChatMessage } from "./components/ChatMessage";
import { ChatInput } from "./components/ChatInput";
import { MessagesSquare } from "lucide-react";
import { chat } from "./lib/ollama";

function App() {
  const [chatState, setChatState] = useState<ChatState>({
    messages: [],
    isTyping: false,
  });

  const handleSendMessage = async (content: string) => {
    // Add user message
    const userMessage: Message = {
      id: Date.now().toString(),
      content,
      role: "user",
      timestamp: new Date(),
    };

    setChatState((prev) => ({
      ...prev,
      messages: [...prev.messages, userMessage],
      isTyping: true,
    }));

    try {
      // Get response from Ollama
      const response = await chat([{ role: "user", content }]);
      const assistantMessage: Message = {
        id: (Date.now() + 1).toString(),
        content: response.content,
        role: "assistant",
        timestamp: new Date(),
      };

      setChatState((prev) => ({
        ...prev,
        messages: [...prev.messages, assistantMessage],
        isTyping: false,
      }));
    } catch (error: any) {
      console.error("Error:", error);

      setChatState((prev) => ({
        ...prev,
        messages: [
          ...prev.messages,
          {
            id: (Date.now() + 1).toString(),
            content: error.message,
            role: "assistant",
            timestamp: new Date(),
          },
        ],
        isTyping: false,
      }));
    }
  };

  return (
    <div className="flex flex-col h-screen bg-white">
      {/* Header */}
      <header className="border-b">
        <div className="max-w-3xl mx-auto p-4 flex items-center gap-3">
          <MessagesSquare className="w-6 h-6 text-emerald-500" />
          <h1 className="text-xl font-semibold text-gray-800">TomerikGPT</h1>
        </div>
      </header>

      {/* Chat Messages */}
      <div className="flex-1 overflow-y-auto">
        {chatState.messages.length === 0 ? (
          <div className="h-full flex items-center justify-center text-gray-500">
            <p>Send a message to start the conversation</p>
          </div>
        ) : (
          chatState.messages.map((message) => (
            <ChatMessage key={message.id} message={message} />
          ))
        )}
        {chatState.isTyping && (
          <div className="py-8 bg-gray-50">
            <div className="max-w-3xl mx-auto px-4">
              <div className="flex gap-2">
                <div className="w-2 h-2 rounded-full bg-gray-400 animate-bounce" />
                <div className="w-2 h-2 rounded-full bg-gray-400 animate-bounce [animation-delay:0.2s]" />
                <div className="w-2 h-2 rounded-full bg-gray-400 animate-bounce [animation-delay:0.4s]" />
              </div>
            </div>
          </div>
        )}
      </div>

      {/* Chat Input */}
      <ChatInput onSend={handleSendMessage} disabled={chatState.isTyping} />
    </div>
  );
}

export default App;
