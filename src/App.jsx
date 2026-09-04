import React, { useState } from 'react';
import Dashboard from './components/Dashboard';
import Chatbot from './components/Chatbot';
import { portfolioData } from './data/portfolio';

export default function App() {
  const [chatInput, setChatInput] = useState("");
  const [isMobileChatOpen, setIsMobileChatOpen] = useState(false);
  const [activeCategory, setActiveCategory] = useState(null);

  // Triggered when a user clicks "Ask ->" on a card
  const handlePreFillPrompt = (prompt) => {
    setChatInput(prompt);
    setIsMobileChatOpen(true);
  };

  return (
    <div className="flex h-screen bg-gray-50 font-sans text-gray-900 overflow-hidden">
      
      {/* LEFT: Main Content Area */}
      <main className="w-full lg:w-[68%] h-full overflow-y-auto p-6 md:p-12 relative">
        
        {/* VIEW 1: Detail View (Shows if a category is clicked) */}
        {activeCategory ? (
          <div className="animate-fade-in pb-12">
            <button 
              onClick={() => setActiveCategory(null)}
              className="mb-8 text-sm font-semibold text-gray-500 hover:text-gray-900 flex items-center gap-2 transition-colors"
            >
              ← Back to Home
            </button>
            
            <header className="mb-10">
              <h2 className="text-4xl font-bold tracking-tight mb-2">{activeCategory.title}</h2>
              <p className="text-xl text-gray-600">{activeCategory.description}</p>
            </header>

            <div className="bg-white rounded-xl border border-gray-200 p-8 shadow-sm min-h-[400px]">
              <p className="text-gray-500 italic">
                This is the dedicated space for the {activeCategory.title} data. 
                In the next iteration, we will map over portfolioData.{activeCategory.id} here.
              </p>
            </div>
          </div>
        ) : (
          /* VIEW 2: Homepage Dashboard (Default) */
          <div className="animate-fade-in">
            <header className="mb-12 border-b border-gray-200 pb-8">
              <h1 className="text-4xl font-bold tracking-tight mb-2">{portfolioData.profile.name}</h1>
              <h2 className="text-xl text-gray-600 mb-4">{portfolioData.profile.title}</h2>
              <p className="max-w-2xl text-gray-700 leading-relaxed">
                {portfolioData.profile.summary}
              </p>
              <div className="flex gap-4 mt-6">
                <a href={portfolioData.profile.links.cv} className="text-sm font-medium text-blue-600 hover:underline">CV</a>
                <a href={portfolioData.profile.links.github} className="text-sm font-medium text-blue-600 hover:underline">GitHub</a>
                <a href={portfolioData.profile.links.linkedin} className="text-sm font-medium text-blue-600 hover:underline">LinkedIn</a>
              </div>
            </header>

            <Dashboard 
              categories={portfolioData.categories} 
              onAsk={handlePreFillPrompt} 
              onExplore={setActiveCategory}
            />
          </div>
        )}
      </main>

      {/* RIGHT: Chatbot */}
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