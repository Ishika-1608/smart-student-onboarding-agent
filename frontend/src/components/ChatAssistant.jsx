import React, { useState, useRef, useEffect } from "react";
import { chatWithAgent } from "../services/api";

const ChatAssistant = () => {
  const [messages, setMessages] = useState([
    {
      sender: "ai",
      text: "Hi 👋 I'm your Smart Onboarding Agent. Ask me anything about your onboarding.",
    },
  ]);

  const [input, setInput] = useState("");
  const [loading, setLoading] = useState(false);

  const chatEndRef = useRef(null);
  const admissionId = "2026CS001";

  // Auto scroll
  useEffect(() => {
    chatEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages]);

  const sendMessage = async (text = input) => {
    if (!text.trim()) return;

    const userMessage = { sender: "user", text };
    setMessages((prev) => [...prev, userMessage]);
    setInput("");
    setLoading(true);

    try {
      const res = await chatWithAgent({
        admission_id: admissionId,
        question: text,
      });

      const aiMessage = {
        sender: "ai",
        text: res.data.reply,
      };

      setMessages((prev) => [...prev, aiMessage]);
    } catch (err) {
      console.log(err);
    }

    setLoading(false);
  };

  return (
    <div className="w-80 bg-white shadow-xl rounded-2xl flex flex-col">

      {/* Header */}
      <div className="bg-blue-500 text-white p-3 rounded-t-2xl font-semibold">
        🤖 Smart Onboarding Agent
      </div>

      {/* Messages */}
      <div className="h-64 overflow-y-auto p-3 space-y-2">
        {messages.map((msg, index) => (
          <div
            key={index}
            className={`p-2 rounded-lg text-sm ${
              msg.sender === "user"
                ? "bg-blue-100 text-right"
                : "bg-gray-100"
            }`}
          >
            {msg.text}
          </div>
        ))}

        {loading && (
          <div className="text-sm text-gray-400">
            Agent is typing...
          </div>
        )}

        <div ref={chatEndRef}></div>
      </div>

      {/* Suggested Questions */}
      <div className="px-2 pb-2 flex flex-wrap gap-2">
        <button
          onClick={() => sendMessage("What is pending?")}
          className="text-xs bg-gray-200 px-2 py-1 rounded"
        >
          What is pending?
        </button>

        <button
          onClick={() => sendMessage("What should I do next?")}
          className="text-xs bg-gray-200 px-2 py-1 rounded"
        >
          What should I do next?
        </button>
      </div>

      {/* Input */}
      <div className="flex border-t">
        <input
          className="flex-1 p-2 outline-none"
          placeholder="Ask something..."
          value={input}
          onChange={(e) => setInput(e.target.value)}
        />
        <button
          onClick={() => sendMessage()}
          className="bg-blue-500 text-white px-4"
        >
          Send
        </button>
      </div>
    </div>
  );
};

export default ChatAssistant;
