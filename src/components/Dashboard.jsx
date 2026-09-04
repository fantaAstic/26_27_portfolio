import React from 'react';

export default function Dashboard({ categories, onAsk }) {
  return (
    <section>
      <div className="flex justify-between items-end mb-6">
        <h3 className="text-sm font-bold uppercase tracking-wider text-gray-400">Explore</h3>
      </div>
      
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {categories.map((cat) => (
          <div 
            key={cat.id} 
            className="group bg-white p-6 rounded-xl border border-gray-200 shadow-sm hover:shadow-md hover:border-gray-300 transition-all flex flex-col justify-between min-h-[160px]"
          >
            <div>
              <h4 className="text-lg font-bold mb-2">{cat.title}</h4>
              <p className="text-sm text-gray-600">{cat.description}</p>
            </div>
            
            <div className="flex gap-4 mt-6 pt-4 border-t border-gray-50">
              <button className="text-sm font-semibold text-gray-900 hover:text-blue-600 transition-colors">
                Explore
              </button>
              <button 
                onClick={() => onAsk(cat.askPrompt)}
                className="text-sm font-semibold text-gray-500 hover:text-gray-900 transition-colors flex items-center gap-1"
              >
                Ask <span className="text-lg leading-none">→</span>
              </button>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}