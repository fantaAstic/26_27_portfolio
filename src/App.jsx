import React, { useState } from 'react';
import Dashboard from './components/Dashboard';
import Chatbot from './components/Chatbot';
import { portfolioData } from './data/portfolio';

export default function App() {
  const [chatInput, setChatInput] = useState("");
  const [isMobileChatOpen, setIsMobileChatOpen] = useState(false);

  // Triggered when a user clicks "Ask ->" on a card
  const handlePreFillPrompt = (prompt) => {
    setChatInput(prompt);
    setIsMobileChatOpen(true);
  };

  return (
    <div className="flex h-screen bg-gray-50 font-sans text-gray-900 overflow-hidden">
      
      {/* LEFT: Dashboard (70% on desktop, 100% on mobile) */}
      <main className="w-full lg:w-[68%] h-full overflow-y-auto p-6 md:p-12">
        <header className="mb-12 border-b border-gray-200 pb-8">
          <h1 className="text-4xl font-bold tracking-tight mb-2">{portfolioData.profile.name}</h1>
          <h2 className="text-xl text-gray-600 mb-4">{portfolioData.profile.title}</h2>
          <p className="max-w-2xl text-gray-700 leading-relaxed">
            {portfolioData.profile.summary}
          </p>
          <div className="flex gap-4 mt-6">
            <a href="#" className="text-sm font-medium text-blue-600 hover:underline">CV</a>
            <a href="#" className="text-sm font-medium text-blue-600 hover:underline">GitHub</a>
            <a href="#" className="text-sm font-medium text-blue-600 hover:underline">LinkedIn</a>
          </div>
        </header>

        <Dashboard onAsk={handlePreFillPrompt} categories={portfolioData.categories} />
      </main>

      {/* RIGHT: Chatbot (30% on desktop, hidden on mobile unless toggled) */}
      <aside className={`
        fixed inset-y-0 right-0 z-50 w-full bg-white border-l border-gray-200 flex flex-col shadow-2xl lg:shadow-none transition-transform duration-300
        lg:relative lg:w-[32%] lg:translate-x-0
        ${isMobileChatOpen ? 'translate-x-0' : 'translate-x-full'}
      `}>
        <Chatbot 
          inputValue={chatInput} 
          setInputValue={setChatInput}
          onClose={() => setIsMobileChatOpen(false)}
        />
      </aside>

      {/* Mobile FAB to open chat */}
      <button 
        onClick={() => setIsMobileChatOpen(true)}
        className="lg:hidden fixed bottom-6 right-6 bg-gray-900 text-white rounded-full p-4 shadow-lg hover:bg-gray-800 transition-colors z-40"
      >
        <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 10h.01M12 10h.01M16 10h.01M9 16H5a2 2 0 01-2-2V6a2 2 0 012-2h14a2 2 0 012 2v8a2 2 0 01-2 2h-5l-5 5v-5z" />
        </svg>
      </button>

    </div>
  );
}