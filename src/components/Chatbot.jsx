import React, { useState, useEffect, useRef } from 'react';
import { retrievePortfolioContext } from '../lib/retriever';

// Lightweight formatter to convert **bold** and newlines into clean HTML
const formatMessageText = (text) => {
  if (!text) return { __html: '' };

  const lines = text.split('\n');
  let inList = false;
  let htmlLines = [];

  for (let i = 0; i < lines.length; i++) {
    let line = lines[i].trim();
    
    // Check if line is a bullet point (starts with * or - followed by space, but ensure it's not just a formatting asterisk)
    const isBullet = (line.startsWith('* ') || line.startsWith('- ')) && line.length > 2;
    
    if (isBullet) {
      const content = line.substring(2).trim();
      const formattedContent = content
        .replace(/\*\*(.*?)\*\*/g, '<strong class="font-semibold text-gray-900">$1</strong>')
        .replace(/\*(.*?)\*/g, '<em class="italic">$1</em>');
      
      if (!inList) {
        htmlLines.push('<ul class="list-disc list-inside space-y-1.5 my-2">');
        inList = true;
      }
      htmlLines.push(`<li>${formattedContent}</li>`);
    } else {
      if (inList) {
        htmlLines.push('</ul>');
        inList = false;
      }
      if (line) {
        const formattedLine = line
          .replace(/\*\*(.*?)\*\*/g, '<strong class="font-semibold text-gray-900">$1</strong>')
          .replace(/\*(.*?)\*/g, '<em class="italic">$1</em>');
        htmlLines.push(`<p class="mb-1.5">${formattedLine}</p>`);
      }
    }
  }
  
  if (inList) {
    htmlLines.push('</ul>');
  }

  return { __html: htmlLines.join('') };
};

export default function Chatbot({ inputValue, setInputValue, onClose, activeCategory, selectedProject }) {
  const [messages, setMessages] = useState([
    { role: 'assistant', text: "Hi, I'm an AI assistant trained on Fatima's portfolio data. What would you like to know about her work?" }
  ]);
  const messagesEndRef = useRef(null);

  // Auto-scroll to bottom when new messages arrive
  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [messages]);

  // Dynamic Context Logic
  let headerTitle = "Ask about my work";
  let headerSubtitle = "Explore Fatima's projects, experience and technical interests.";
  let currentChips = [
    "Strongest projects",
    "ML experience",
    "SWE experience",
    "Technical skills"
  ];

  if (selectedProject) {
    headerTitle = `ABOUT ${selectedProject.title.toUpperCase()}`;
    headerSubtitle = "Ask about this project:";
    currentChips = [
      "How does it work?",
      "What ML did she use?",
      "What was her role?",
      "What challenges did she face?"
    ];
  } else if (activeCategory) {
    headerSubtitle = `Ask about Fatima's ${activeCategory.title.toLowerCase()}:`;
  }

  const handleSend = async (e) => {
    e.preventDefault();
    if (!inputValue.trim()) return;

    const query = inputValue;
    setInputValue("");
    setMessages(prev => [...prev, { role: 'user', text: query }]);
    
    // Retrieve relevant data based on query & page context
    const retrievedContext = retrievePortfolioContext(query, selectedProject);

    // Add a temporary "Thinking..." message
    setMessages(prev => [...prev, { role: 'assistant', text: "Thinking..." }]);

    try {
      // Change this line in Chatbot.jsx:
      const apiKey = import.meta.env.VITE_GEMINI_API_KEY;

      const model = 'gemini-3.6-flash';
      
      const response = await fetch(`https://generativelanguage.googleapis.com/v1beta/models/${model}:generateContent?key=${apiKey}`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json"
        },
        body: JSON.stringify({
          system_instruction: {
            parts: [{
              text: `You are an elite AI portfolio assistant for Fatima Zahrah. Answer recruiter questions accurately, concisely, and professionally.
              
              STRICT FORMATTING RULES:
              - Keep responses extremely brief, punchy, and scannable (max 2-3 short sentences or clean bullet points).
              - Format for a busy recruiter: highlight impact, tech stack, and key metrics immediately.
              - Do not use dense paragraphs, conversational filler, or raw markdown clutter.
              - STRICT RULE: Only use information retrieved from the portfolio context below. Never assume or invent facts.`
            }]
          },
          contents: [
            {
              role: "user",
              parts: [{ text: `PORTFOLIO CONTEXT:\n${retrievedContext}\n\nUSER QUESTION: ${query}` }]
            }
          ],
          generationConfig: {
            temperature: 0.2,
          }
        })
      });

        const data = await response.json();
      
      // Check if Google returned an API error block
      if (data.error) {
        throw new Error(data.error.message || "Gemini API error");
      }

      const answer = data.candidates[0].content.parts[0].text;

      setMessages(prev => {
        const newMsgs = [...prev];
        newMsgs[newMsgs.length - 1] = { role: 'assistant', text: answer };
        return newMsgs;
      });

    } catch (err) {
      console.error("Gemini API Error details:", err); // <-- Check your browser console!
      setMessages(prev => {
        const newMsgs = [...prev];
        newMsgs[newMsgs.length - 1] = { role: 'assistant', text: `Error: ${err.message}` };
        return newMsgs;
      });
    }
  };

  return (
    <div className="flex flex-col h-full bg-white relative">
      {/* Header */}
      <div className="p-6 border-b border-gray-100 flex justify-between items-center bg-gray-50 transition-all duration-300">
        <div>
          <h3 className="font-bold text-gray-900 tracking-tight">{headerTitle}</h3>
          <p className="text-xs text-gray-500 mt-1">{headerSubtitle}</p>
        </div>
        <button onClick={onClose} className="lg:hidden p-2 text-gray-400 hover:text-gray-600">
          <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" /></svg>
        </button>
      </div>

      {/* Messages */}
      <div className="flex-1 overflow-y-auto p-6 space-y-6">
        {messages.map((msg, i) => (
          <div key={i} className={`flex ${msg.role === 'user' ? 'justify-end' : 'justify-start'}`}>
            <div className={`max-w-[85%] rounded-2xl p-4 text-sm leading-relaxed ${
              msg.role === 'user' 
                ? 'bg-gray-900 text-white rounded-br-none' 
                : 'bg-gray-100 text-gray-800 rounded-bl-none'
            }`}>
              <div dangerouslySetInnerHTML={formatMessageText(msg.text)} />
            </div>
          </div>
        ))}
        <div ref={messagesEndRef} />
      </div>

      {/* Input Area */}
      <div className="p-6 pb-16 border-t border-gray-100 bg-white">
        {/* Contextual Recruiter Chips */}
        <div className="flex flex-wrap gap-2 mb-4">
          {currentChips.map(chip => (
            <button
              key={chip}
              onClick={() => setInputValue(chip)}
              className="text-xs font-medium bg-white border border-gray-200 text-gray-600 px-3 py-1.5 rounded-full hover:border-gray-400 hover:text-gray-900 transition-all shadow-sm"
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
            className="w-full bg-gray-50 border border-gray-200 rounded-xl py-3 pl-4 pr-12 text-sm focus:outline-none focus:ring-2 focus:ring-gray-900 focus:border-transparent transition-all shadow-inner"
          />
          <button 
            type="submit"
            disabled={!inputValue.trim()}
            className="absolute right-2 top-1/2 -translate-y-1/2 p-1.5 bg-gray-900 text-white rounded-lg hover:bg-gray-800 disabled:bg-gray-300 disabled:cursor-not-allowed transition-colors"
          >
            <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M14 5l7 7m0 0l-7 7m7-7H3" /></svg>
          </button>
        </form>
      </div>
    </div>
  );
}