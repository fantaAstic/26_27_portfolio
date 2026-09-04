import React from 'react';

export default function Dashboard({ categories, onAsk, onExplore }) {
  return (
    <section>
      <div className="flex justify-between items-end mb-6">
        <h3 className="text-xs font-mono uppercase tracking-widest text-[#ea580c] dark:text-[#f97316] font-semibold">Explore Portfolio</h3>
      </div>
      
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {categories.map((cat) => (
          <div 
            key={cat.id} 
            className="group bg-white/95 p-6 rounded-xl border border-slate-200/80 shadow-sm hover:shadow-md hover:border-[#ea580c] transition-all flex flex-col justify-between min-h-[160px] dark:bg-[#132647] dark:border-blue-900/40 dark:hover:border-[#f97316]"
          >
            <div>
              <h4 className="text-lg font-bold text-[#ea580c] dark:text-[#f97316] mb-2 group-hover:translate-x-0.5 transition-transform">{cat.title}</h4>
              <p className="text-sm text-slate-600 dark:text-slate-300 font-normal leading-relaxed">{cat.description}</p>
            </div>
            
            <div className="flex items-center justify-between mt-6 pt-4 border-t border-slate-100 dark:border-blue-900/30">
              <button 
                onClick={() => onExplore(cat)}
                className="text-xs font-semibold uppercase tracking-wider text-slate-900 dark:text-white hover:text-[#ea580c] dark:hover:text-[#f97316] transition-colors"
              >
                Explore →
              </button>
              <button 
                onClick={() => onAsk(cat.askPrompt)}
                className="text-xs font-mono font-semibold text-[#2563eb] dark:text-[#60a5fa] hover:underline flex items-center gap-1"
              >
                Ask AI ↗
              </button>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}