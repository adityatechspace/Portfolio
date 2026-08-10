import { useState, useRef, useEffect } from "react";
import { FiX } from "react-icons/fi";
import { BsStars } from "react-icons/bs";

import MessageBubble from "./MessageBubble";
import ChatInput from "./ChatInput";
import SuggestedQuestions from "./SuggestedQuestions";
import { askAssistant } from "../../services/api";
import { useAIAssistant } from "../../context/AIAssistantContext";

function AIAssistantPanel() {
  const { isOpen, closeAI } = useAIAssistant();

  const [messages, setMessages] = useState([
    {
      sender: "assistant",
      message:
        "Hi! I'm Aditya's AI assistant. Ask me about projects, skills, experience or certifications.",
    },
  ]);

  const [input, setInput] = useState("");
  const [loading, setLoading] = useState(false);
  const chatContainerRef = useRef(null);

  const handleSend = async () => {
    if (!input.trim()) return;

    const userMessage = input;

    setMessages((prev) => [
      ...prev,
      {
        sender: "user",
        message: userMessage,
      },
    ]);

    setInput("");

    try {
      setLoading(true);
      const data = await askAssistant(userMessage, messages);

      setMessages((prev) => [
        ...prev,
        {
          sender: "assistant",
          message: data.response,
        },
      ]);
    } catch {
      setMessages((prev) => [
        ...prev,
        {
          sender: "assistant",
          message: "Unable to connect to AI Assistant.",
        },
      ]);
    } finally {
      setLoading(false);
    }
  };

  const handleSuggestedQuestion = (question) => {
    setInput(question);
  };

  // Auto-scroll to latest message
  useEffect(() => {
    if (chatContainerRef.current) {
      chatContainerRef.current.scrollTop = chatContainerRef.current.scrollHeight;
    }
  }, [messages, loading]);

  // Close on Escape key
  useEffect(() => {
    const handleKeyDown = (e) => {
      if (e.key === "Escape") closeAI();
    };

    if (isOpen) {
      document.addEventListener("keydown", handleKeyDown);
    }

    return () => document.removeEventListener("keydown", handleKeyDown);
  }, [isOpen, closeAI]);

  // Lock page scroll while panel is open
  useEffect(() => {
    document.body.style.overflow = isOpen ? "hidden" : "";
    return () => {
      document.body.style.overflow = "";
    };
  }, [isOpen]);

  return (
    <>
      {/* Backdrop */}
      <div
        onClick={closeAI}
        aria-hidden="true"
        className={`fixed inset-0 z-[60] bg-black/70 transition-opacity duration-300 ${
          isOpen ? "opacity-100 pointer-events-auto" : "opacity-0 pointer-events-none"
        }`}
      />

      {/* Panel */}
      <div
        role="dialog"
        aria-modal="true"
        aria-label="AI Portfolio Assistant"
        className={`fixed top-0 right-0 z-[70] h-full w-full sm:w-[440px] lg:w-[42vw] xl:w-[38vw] max-w-2xl
        bg-slate-950 border-l border-slate-800 shadow-2xl
        flex flex-col
        transition-transform duration-300 ease-out
        ${isOpen ? "translate-x-0" : "translate-x-full"}`}
      >
        {/* Header */}
        <div className="flex items-center justify-between gap-3 px-6 py-5 border-b border-slate-800 bg-slate-950">
          <div className="flex items-center gap-3">
            <div className="h-10 w-10 rounded-full bg-gradient-to-br from-violet-500 to-blue-500 flex items-center justify-center text-white shadow-lg shadow-violet-500/20">
              <BsStars />
            </div>
            <div>
              <h3 className="font-semibold text-white leading-tight">AI Portfolio Assistant</h3>
              <p className="text-xs text-slate-500">Ask about projects, skills & more</p>
            </div>
          </div>

          <button
            onClick={closeAI}
            aria-label="Close AI Assistant"
            className="h-10 w-10 rounded-full border border-slate-700 bg-slate-900/60 flex items-center justify-center text-slate-300 transition hover:border-blue-500 hover:text-white"
          >
            <FiX size={18} />
          </button>
        </div>

        {/* Messages */}
        <div
          className="chat-scroll flex-1 overflow-y-auto px-6 py-6 space-y-4 bg-slate-950"
          ref={chatContainerRef}
        >
          {messages.map((msg, index) => (
            <MessageBubble key={index} sender={msg.sender} message={msg.message} />
          ))}

          {loading && (
            <div className="flex justify-start">
              <div className="max-w-[80%] px-5 py-3 rounded-2xl bg-slate-800 text-slate-400">
                <span className="typing">Typing</span>
              </div>
            </div>
          )}
        </div>

        {/* Footer: input + suggestions */}
        <div className="border-t border-slate-800 bg-slate-950 px-6 py-5">
          <ChatInput value={input} onChange={(e) => setInput(e.target.value)} onSend={handleSend} />

          <div className="mt-4">
            <SuggestedQuestions onQuestionClick={handleSuggestedQuestion} />
          </div>
        </div>
      </div>
    </>
  );
}

export default AIAssistantPanel;
