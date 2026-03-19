"use client";

import { useState } from "react";
import { ChatBubbleLeftRightIcon, XMarkIcon, PaperAirplaneIcon } from "@heroicons/react/24/solid";

export default function Chatbot() {
  const [isOpen, setIsOpen] = useState(false);
  const [messages, setMessages] = useState([
    { role: 'assistant', text: 'Hey there! Need help adjusting your workout or checking your macros today?' }
  ]);
  const [input, setInput] = useState("");

  const handleSend = (e: React.FormEvent) => {
    e.preventDefault();
    if (!input.trim()) return;
    
    // Add user message
    setMessages([...messages, { role: 'user', text: input }]);
    setInput("");
    
    // Simulate AI response (Placeholder)
    setTimeout(() => {
      setMessages(prev => [...prev, { 
        role: 'assistant', 
        text: 'Got it. Since this is a UI prototype, I can\'t process that yet, but the FastAPI backend will handle this soon!' 
      }]);
    }, 1000);
  };

  return (
    <>
      {/* Floating Button */}
      <button
        onClick={() => setIsOpen(true)}
        className={`fixed bottom-6 right-6 p-4 rounded-full bg-electric text-white shadow-lg shadow-electric/30 transition-transform duration-300 hover:scale-105 hover:bg-electric-hover z-50 ${isOpen ? 'scale-0 opacity-0' : 'scale-100 opacity-100'}`}
      >
        <ChatBubbleLeftRightIcon className="w-7 h-7" />
      </button>

      {/* Chat Window */}
      <div 
        className={`fixed bottom-6 right-6 w-80 sm:w-96 h-[500px] max-h-[80vh] bg-white border border-border rounded-2xl shadow-2xl z-50 flex flex-col transition-all duration-300 origin-bottom-right ${
          isOpen ? 'scale-100 opacity-100' : 'scale-75 opacity-0 pointer-events-none'
        }`}
      >
        {/* Header */}
        <div className="bg-slate-900 text-white p-4 rounded-t-2xl flex items-center justify-between">
          <div className="flex items-center gap-2">
            <div className="w-2 h-2 rounded-full bg-electric animate-pulse" />
            <h3 className="font-bold">AI Coach</h3>
          </div>
          <button 
            onClick={() => setIsOpen(false)}
            className="text-slate-300 hover:text-white transition-colors"
          >
            <XMarkIcon className="w-6 h-6" />
          </button>
        </div>

        {/* Messages */}
        <div className="flex-1 overflow-y-auto p-4 space-y-4 bg-slate-50">
          {messages.map((msg, idx) => (
            <div key={idx} className={`flex ${msg.role === 'user' ? 'justify-end' : 'justify-start'}`}>
               <div className={`max-w-[80%] p-3 rounded-xl text-sm ${
                 msg.role === 'user' 
                  ? 'bg-electric text-white rounded-br-sm' 
                  : 'bg-white text-slate-700 border border-slate-200 rounded-bl-sm shadow-sm'
               }`}>
                 {msg.text}
               </div>
            </div>
          ))}
        </div>

        {/* Input Form */}
        <form onSubmit={handleSend} className="p-3 bg-white border-t border-slate-100 rounded-b-2xl flex items-center gap-2">
          <input 
            type="text"
            value={input}
            onChange={(e) => setInput(e.target.value)}
            placeholder="Ask your AI coach..."
            className="flex-1 bg-slate-100 border-transparent focus:border-electric focus:ring-0 rounded-lg px-4 py-2 text-sm text-slate-800 outline-none"
          />
          <button 
            type="submit"
            disabled={!input.trim()}
            className="p-2 bg-electric text-white rounded-lg disabled:opacity-50 disabled:cursor-not-allowed hover:bg-electric-hover transition-colors"
          >
            <PaperAirplaneIcon className="w-5 h-5" />
          </button>
        </form>
      </div>
    </>
  );
}
