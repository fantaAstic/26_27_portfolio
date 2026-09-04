import React, { useState, useEffect, useRef } from 'react';
import { retrievePortfolioContext } from '../lib/retriever';

// Lightweight formatter to convert **bold**, *italic*, and [links](url) into clean HTML
const formatMessageText = (text) => {
  if (!text) return { __html: '' };

  const lines = text.split('\n');
  let inList = false;
  let htmlLines = [];

  for (let i = 0; i < lines.length; i++) {
    let line = lines[i].trim();
    
    const formatInline = (str) => {
      return str
        .replace(/\[([^\]]+)\]\((https?:\/\/[^\s)]+|\/[^\s)]+)\)/g, '<a href="$2" target="_blank" rel="noopener noreferrer" class="text-[#2563eb] dark:text-[#60a5fa] underline hover:text-[#ea580c] font-semibold">$1 ↗</a>')
        .replace(/\*\*(.*?)\*\*/g, '<strong class="font-semibold text-slate-900 dark:text-white">$1</strong>')
        .replace(/\*(.*?)\*/g, '<em class="italic">$1</em>');
    };

    const isBullet = (line.startsWith('* ') || line.startsWith('- ')) && line.length > 2;
    
    if (isBullet) {
      const content = formatInline(line.substring(2).trim());
      if (!inList) {
        htmlLines.push('<ul class="list-disc list-inside space-y-1.5 my-2">');
        inList = true;
      }
      htmlLines.push(`<li>${content}</li>`);
    } else {
      if (inList) {
        htmlLines.push('</ul>');
        inList = false;
      }
      if (line) {
        const formattedLine = formatInline(line);
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
    { role: 'assistant', text: "Hi, I'm an AI assistant trained on Fanta's portfolio data. What would you like to know about her work?" }
  ]);
  const messagesEndRef = useRef(null);

  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [messages]);

  let headerTitle = "Portfolio AI Assistant";
  let headerSubtitle = "Ask about Fanta's projects, experience and technical skills.";
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
    headerSubtitle = `Ask about Fanta's ${activeCategory.title.toLowerCase()}:`;
  }

  const handleSend = async (e) => {
    e.preventDefault();
    if (!inputValue.trim()) return;

    const query = inputValue;
    setInputValue('');
    setMessages(prev => [...prev, { role: 'user', text: query }]);
    
    const retrievedContext = retrievePortfolioContext(query, selectedProject);

    setMessages(prev => [...prev, { role: 'assistant', text: "Thinking..." }]);

    try {
      const apiKey = import.meta.env.VITE_GEMINI_API_KEY;
      const model = 'gemini-3.6-flash';
      
      const response = await fetch(`https://generativelanguage.googleapis.com/v1beta/models/${model}:generateContent?key=${apiKey}`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          system_instruction: {
            parts: [{
              text: `You are an elite AI portfolio assistant for Fanta Kebe. Answer recruiter questions accurately, concisely, and professionally.
              
              STRICT FORMATTING RULES:
              - Keep responses extremely brief, punchy, and scannable (max 2-3 short sentences or clean bullet points).
              - Format for a busy recruiter: highlight impact, tech stack, and key metrics immediately.
              - Do not use dense paragraphs, conversational filler, or raw markdown clutter.
              - When asked for a CV, provide the link as: [Download CV](/cv.pdf).
              - When asked for GitHub or LinkedIn, provide them using markdown links: [GitHub](https://github.com/fantaAstic) or [LinkedIn](https://www.linkedin.com/in/fanta-kebe-287701247/).
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
      console.error("Gemini API Error details:", err);
      setMessages(prev => {
        const newMsgs = [...prev];
        newMsgs[newMsgs.length - 1] = { role: 'assistant', text: `Error: ${err.message}` };
        return newMsgs;
      });
    }
  };

  return (
    <div className="flex flex-col h-full bg-white dark:bg-[#0c1e38] relative transition-colors duration-300">
      {/* Header */}
      <div className="p-6 border-b border-slate-200/80 dark:border-blue-900/40 flex justify-between items-center bg-slate-50 dark:bg-[#132647]">
        <div>
          <h3 className="font-bold text-slate-900 dark:text-white tracking-tight text-sm uppercase font-mono">{headerTitle}</h3>
          <p className="text-xs text-slate-500 dark:text-slate-300 mt-1">{headerSubtitle}</p>
        </div>
        <button onClick={onClose} className="lg:hidden p-2 text-slate-400 hover:text-slate-600 dark:hover:text-slate-200">
          <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" /></svg>
        </button>
      </div>

      {/* Messages */}
      <div className="flex-1 overflow-y-auto p-6 space-y-6">
        {messages.map((msg, i) => (
          <div key={i} className={`flex ${msg.role === 'user' ? 'justify-end' : 'justify-start'}`}>
            <div className={`max-w-[85%] rounded-2xl p-4 text-sm leading-relaxed ${
              msg.role === 'user' 
                ? 'bg-[#ea580c] text-white rounded-br-none shadow-sm font-medium' 
                : 'bg-slate-100 dark:bg-[#1b345c] text-slate-800 dark:text-slate-100 rounded-bl-none border border-slate-200/60 dark:border-blue-900/30'
            }`}>
              <div dangerouslySetInnerHTML={formatMessageText(msg.text)} />
            </div>
          </div>
        ))}
        <div ref={messagesEndRef} />
      </div>

      {/* Input Area */}
      <div className="p-6 pb-16 border-t border-slate-200/80 dark:border-blue-900/40 bg-white dark:bg-[#0c1e38]">
        {/* Contextual Recruiter Chips */}
        <div className="flex flex-wrap gap-2 mb-4">
          {currentChips.map(chip => (
            <button
              key={chip}
              onClick={() => setInputValue(chip)}
              className="text-xs font-medium bg-slate-50 dark:bg-[#1b345c] border border-slate-200 dark:border-blue-900/40 text-slate-600 dark:text-slate-300 px-3 py-1.5 rounded-full hover:border-[#ea580c] dark:hover:border-[#f97316] hover:text-[#ea580c] transition-all shadow-sm"
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
            placeholder="Ask about Fanta's background..."
            className="w-full bg-slate-50 dark:bg-[#132647] border border-slate-200 dark:border-blue-900/40 rounded-xl py-3 pl-4 pr-12 text-sm text-slate-900 dark:text-white placeholder:text-slate-400 dark:placeholder:text-slate-400 focus:outline-none focus:ring-2 focus:ring-[#ea580c] dark:focus:ring-[#f97316] focus:border-transparent transition-all shadow-inner"
          />
          <button 
            type="submit"
            disabled={!inputValue.trim()}
            className="absolute right-2 top-1/2 -translate-y-1/2 p-2 bg-[#ea580c] text-white rounded-lg hover:bg-[#c2410c] disabled:bg-slate-300 dark:disabled:bg-slate-800 disabled:cursor-not-allowed transition-colors shadow-sm"
          >
            <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M14 5l7 7m0 0l-7 7m7-7H3" /></svg>
          </button>
        </form>
      </div>
    </div>
  );
}