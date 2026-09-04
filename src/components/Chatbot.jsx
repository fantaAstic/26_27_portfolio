import React, { useState } from 'react';

export default function Chatbot({ inputValue, setInputValue, onClose }) {
  const [messages, setMessages] = useState([
    { role: 'assistant', text: "Hi, I'm an AI assistant trained on Fatima's portfolio data. What would you like to know about her work?" }
  ]);

  const recruiterChips = [
    "Most relevant experience for SWE",
    "Machine learning background",
    "Strongest technical skills",
    "Explain Project Ndiyan"
  ];

  const handleSend = (e) => {
    e.preventDefault();
    if (!inputValue.trim()) return;

    // Add user message
    setMessages(prev => [...prev, { role: 'user', text: inputValue }]);
    const query = inputValue;
    setInputValue("");

    // Mocking the LLM delay for the prototype
    setTimeout(() => {
      setMessages(prev => [...prev, { 
        role: 'assistant', 
        text: `(Prototype) This is where the RAG pipeline will query portfolioData.ts for: "${query}".` 
      }]);
    }, 800);
  };

  return (
    <div className="flex flex-col h-full bg-white relative">
      {/* Header */}
      <div className="p-6 border-b border-gray-100 flex justify-between items-center bg-gray-50">
        <div>
          <h3 className="font-bold text-gray-900">Ask about my work</h3>
          <p className="text-xs text-gray-500 mt-1">Answers generated strictly from portfolio data.</p>
        </div>
        <button onClick={onClose} className="lg:hidden p-2 text-gray-400 hover:text-gray-600">
          <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" /></svg>
        </button>
      </div>

      {/* Messages */}
      <div className="flex-1 overflow-y-auto p-6 space-y-6">
        {messages.map((msg, i) => (
          <div key={i} className={`flex ${msg.role === 'user' ? 'justify-end' : 'justify-start'}`}>
            <div className={`max-w-[85%] rounded-2xl p-4 text-sm ${
              msg.role === 'user' 
                ? 'bg-gray-900 text-white rounded-br-none' 
                : 'bg-gray-100 text-gray-800 rounded-bl-none'
            }`}>
              {msg.text}
            </div>
          </div>
        ))}
      </div>

      {/* Input Area */}
      <div className="p-6 border-t border-gray-100 bg-white">
        {/* Recruiter Chips */}
        <div className="flex flex-wrap gap-2 mb-4">
          {recruiterChips.map(chip => (
            <button
              key={chip}
              onClick={() => setInputValue(chip)}
              className="text-xs bg-gray-50 border border-gray-200 text-gray-600 px-3 py-1.5 rounded-full hover:bg-gray-100 hover:text-gray-900 transition-colors"
            >
              {chip}
            </button>
          ))}
        </div>

        <form onSubmit={handleSend} className="relative">
          <input
            type="text"
            value={inputValue}
            onChange={(e) => setInputValue(e.target.value)}
            placeholder="Ask anything..."
            className="w-full bg-gray-50 border border-gray-200 rounded-xl py-3 pl-4 pr-12 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all"
          />
          <button 
            type="submit"
            className="absolute right-2 top-1/2 -translate-y-1/2 p-1.5 bg-gray-900 text-white rounded-lg hover:bg-gray-800 transition-colors"
          >
            <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M14 5l7 7m0 0l-7 7m7-7H3" /></svg>
          </button>
        </form>
      </div>
    </div>
  );
}