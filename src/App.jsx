import React, { useState, useEffect } from 'react';
import Dashboard from './components/Dashboard';
import Chatbot from './components/Chatbot';
import { portfolioData } from './data/portfolio';

export default function App() {
  const [chatInput, setChatInput] = useState('');
  const [isMobileChatOpen, setIsMobileChatOpen] = useState(false);
  const [activeCategory, setActiveCategory] = useState(null);
  const [selectedProject, setSelectedProject] = useState(null);
  const [isDarkMode, setIsDarkMode] = useState(() => {
    const savedTheme = localStorage.getItem('portfolio-theme');
    return savedTheme ? savedTheme === 'dark' : true;
  });

  useEffect(() => {
    localStorage.setItem('portfolio-theme', isDarkMode ? 'dark' : 'light');
  }, [isDarkMode]);

  const handlePreFillPrompt = (prompt) => {
    setChatInput(prompt);
    setIsMobileChatOpen(true);
  };

  return (
    <div className={isDarkMode ? 'dark' : ''}>
      <div className="min-h-screen bg-[#f8fafc] text-slate-900 transition-colors duration-300 dark:bg-[#0c1e38] dark:text-slate-100">
        <div className="flex h-screen bg-[#f8fafc] font-sans text-slate-900 transition-colors duration-300 dark:bg-[#0c1e38] dark:text-slate-100 overflow-hidden">
          {/* LEFT: Main Content Area */}
          <main className="w-full lg:w-[68%] h-full overflow-y-auto px-6 py-10 md:px-14 md:py-12 relative bg-[#f8fafc] dark:bg-[#0c1e38] pt-8 md:pt-10">
            {activeCategory ? (
              <div className="animate-fade-in pb-16">
                <button 
                  onClick={() => {
                    if (selectedProject) setSelectedProject(null);
                    else setActiveCategory(null);
                  }}
                  className="mb-8 text-xs font-mono uppercase tracking-widest text-slate-400 dark:text-slate-500 hover:text-[#ea580c] dark:hover:text-[#f97316] flex items-center gap-2 transition-colors group"
                >
                  <span className="group-hover:-translate-x-1 transition-transform">←</span> 
                  {selectedProject ? 'Back to Projects' : 'Back to Overview'}
                </button>
                
                <header className="mb-10">
                  <h2 className="text-3xl md:text-4xl font-extrabold tracking-tight mb-3 text-slate-900 dark:text-white">
                    {activeCategory.title}
                  </h2>
                  <p className="text-lg text-slate-600 dark:text-slate-400 font-normal">{activeCategory.description}</p>
                </header>

                <div className="bg-white dark:bg-[#111827] rounded-2xl border border-slate-200/80 dark:border-slate-800/80 p-8 shadow-sm dark:shadow-2xl min-h-[400px]">
                  {activeCategory.id === 'about' && (
                    <div className="space-y-10 text-slate-700 dark:text-slate-300">
                      <section>
                        <h3 className="text-xs font-mono uppercase tracking-widest text-[#ea580c] dark:text-[#f97316] mb-3 font-semibold">Background</h3>
                        <p className="text-base md:text-lg leading-relaxed mb-6 font-normal">
                          {portfolioData.aboutContent.bio}
                        </p>
                        <ul className="space-y-3">
                          {portfolioData.aboutContent.backgroundDetails.map((detail, idx) => (
                            <li key={idx} className="flex items-start text-sm md:text-base text-slate-600 dark:text-slate-400">
                              <span className="w-1.5 h-1.5 rounded-full bg-[#ea580c] dark:bg-[#f97316] mr-3 mt-2 flex-shrink-0"></span>
                              <span className="leading-relaxed">{detail}</span>
                            </li>
                          ))}
                        </ul>
                      </section>

                      <section className="pt-6 border-t border-slate-100 dark:border-slate-800">
                        <h3 className="text-xs font-mono uppercase tracking-widest text-[#ea580c] dark:text-[#f97316] mb-4 font-semibold">Education</h3>
                        <div className="space-y-6">
                          {portfolioData.education.map((edu, idx) => (
                            <div key={idx} className="relative pl-6 border-l-2 border-[#ea580c]/40 dark:border-[#f97316]/40">
                              <h4 className="font-bold text-slate-900 dark:text-white text-base md:text-lg">{edu.degree}</h4>
                              <p className="text-slate-600 dark:text-slate-400 text-sm mt-0.5">{edu.university} <span className="text-slate-300 dark:text-slate-700 mx-2">•</span> {edu.years}</p>
                              {edu.details && <p className="text-xs font-mono text-[#2563eb] dark:text-[#60a5fa] mt-1.5 inline-block bg-blue-50 dark:bg-blue-950/30 px-2.5 py-1 rounded-md border border-blue-200/50 dark:border-blue-900/30 font-medium">{edu.details}</p>}
                            </div>
                          ))}
                        </div>
                      </section>

                      <section className="pt-6 border-t border-slate-100 dark:border-slate-800">
                        <h3 className="text-xs font-mono uppercase tracking-widest text-[#ea580c] dark:text-[#f97316] mb-4 font-semibold">Core Focus Areas</h3>
                        <div className="flex flex-wrap gap-2">
                          {portfolioData.aboutContent.themes.map((theme, idx) => (
                            <span key={idx} className="bg-slate-100 dark:bg-slate-800/80 text-slate-700 dark:text-slate-300 border border-slate-200/60 dark:border-slate-700/60 px-3.5 py-1.5 rounded-lg text-xs font-medium tracking-wide">
                              {theme}
                            </span>
                          ))}
                        </div>
                      </section>
                    </div>
                  )}

                  {activeCategory.id === 'experience' && (
                    <div className="space-y-8">
                      {portfolioData.experience.map((job, idx) => (
                        <div key={idx} className="bg-slate-50/50 dark:bg-[#1a2234] border border-slate-200/60 dark:border-slate-800 rounded-xl p-6 shadow-sm hover:border-[#ea580c]/50 dark:hover:border-[#f97316]/50 transition-all relative overflow-hidden group">
                          <div className="absolute left-0 top-0 bottom-0 w-1 bg-[#ea580c] dark:bg-[#f97316]"></div>
                          
                          <div className="flex flex-col md:flex-row md:justify-between md:items-start mb-4 pl-3">
                            <div>
                              <h3 className="text-lg md:text-xl font-bold text-slate-900 dark:text-white">{job.role}</h3>
                              <h4 className="text-sm md:text-base text-[#2563eb] dark:text-[#60a5fa] font-semibold mt-0.5">{job.company}</h4>
                            </div>
                            <span className="text-xs font-mono font-semibold text-[#2563eb] dark:text-[#60a5fa] bg-blue-50 dark:bg-blue-950/40 px-3 py-1 rounded-full mt-2 md:mt-0 whitespace-nowrap">
                              {job.years}
                            </span>
                          </div>
                          
                          <div className="pl-3">
                            <p className="text-slate-700 dark:text-slate-300 text-sm md:text-base leading-relaxed mb-4">
                              {job.description}
                            </p>
                            
                            {job.highlights && (
                              <ul className="space-y-2">
                                {job.highlights.map((highlight, hIdx) => (
                                  <li key={hIdx} className="flex items-start text-slate-600 dark:text-slate-400 text-xs md:text-sm">
                                    <span className="mr-2.5 mt-1.5 w-1.5 h-1.5 bg-[#ea580c] dark:bg-[#f97316] rounded-full flex-shrink-0"></span>
                                    <span className="leading-relaxed">{highlight}</span>
                                  </li>
                                ))}
                              </ul>
                            )}
                          </div>
                        </div>
                      ))}
                    </div>
                  )}

                  {activeCategory.id === 'projects' && !selectedProject && (
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                      {portfolioData.projects.map((project, idx) => (
                        <div key={idx} className="bg-slate-50/50 dark:bg-[#1a2234] border border-slate-200/80 dark:border-slate-800 rounded-xl p-6 shadow-sm flex flex-col justify-between hover:shadow-md hover:border-[#ea580c] dark:hover:border-[#f97316] transition-all group">
                          <div>
                            <h3 className="text-sm font-bold tracking-wide uppercase mb-1 text-slate-900 dark:text-white group-hover:text-[#ea580c] dark:group-hover:text-[#f97316] transition-colors">{project.title}</h3>
                            <p className="text-slate-600 dark:text-slate-400 text-xs md:text-sm mb-4 font-normal">{project.subtitle}</p>

                            <div className="text-xs font-mono font-semibold text-[#2563eb] dark:text-[#60a5fa] mb-4 bg-blue-50 dark:bg-blue-950/30 px-2.5 py-1 rounded inline-block border border-blue-100 dark:border-blue-900/30">
                              {project.technologies.join(' · ')}
                            </div>

                            <ul className="space-y-2 mb-6">
                              {project.features.slice(0, 3).map((feature, fIdx) => (
                                <li key={fIdx} className="text-xs md:text-sm text-slate-600 dark:text-slate-400 flex items-start">
                                  <span className="text-[#ea580c] mr-2 font-bold">•</span>
                                  <span className="line-clamp-1">{feature}</span>
                                </li>
                              ))}
                            </ul>
                          </div>

                          <div className="flex items-center justify-between pt-4 border-t border-slate-200/60 dark:border-slate-800 mt-auto">
                            <button 
                              onClick={() => setSelectedProject(project)}
                              className="text-xs font-semibold uppercase tracking-wider text-slate-900 dark:text-white hover:text-[#ea580c] dark:hover:text-[#f97316] transition-colors"
                            >
                              Case Study →
                            </button>
                            <button 
                              onClick={() => handlePreFillPrompt(`Tell me about Fanta's work on ${project.title}.`)}
                              className="text-xs font-mono text-[#2563eb] dark:text-[#60a5fa] hover:underline flex items-center gap-1 font-medium"
                            >
                              Ask AI ↗
                            </button>
                          </div>
                        </div>
                      ))}
                    </div>
                  )}

                  {activeCategory.id === 'projects' && selectedProject && (
                    <div className="bg-white dark:bg-[#1a2234] border border-slate-200 dark:border-slate-800 rounded-xl overflow-hidden shadow-sm animate-fade-in">
                      <div className="p-6 md:p-8">
                        <div className="mb-6">
                          <h3 className="text-2xl md:text-3xl font-bold text-slate-900 dark:text-white mb-2">{selectedProject.title}</h3>
                          <h4 className="text-base md:text-lg text-[#2563eb] dark:text-[#60a5fa] font-semibold">{selectedProject.subtitle}</h4>
                        </div>
                        
                        <p className="text-base text-slate-700 dark:text-slate-300 leading-relaxed mb-6 font-normal">
                          {selectedProject.description}
                        </p>
                        
                        <div className="flex flex-wrap gap-2 mb-8 border-b border-slate-100 dark:border-slate-800 pb-6">
                          {selectedProject.technologies.map((tech, tIdx) => (
                            <span key={tIdx} className="bg-[#2563eb] text-white text-xs font-semibold px-3.5 py-1.5 rounded-md">
                              {tech}
                            </span>
                          ))}
                        </div>

                        {selectedProject.features && selectedProject.features.length > 0 && (
                          <div className="mb-8">
                            <h5 className="text-xs font-mono uppercase tracking-widest text-slate-400 mb-3">Key Contributions</h5>
                            <ul className="space-y-2.5">
                              {selectedProject.features.map((feature, fIdx) => (
                                <li key={fIdx} className="flex items-start text-slate-700 dark:text-slate-300 text-sm">
                                  <span className="w-1.5 h-1.5 rounded-full bg-[#ea580c] dark:bg-[#f97316] mr-3 mt-2 flex-shrink-0"></span>
                                  <span className="leading-relaxed">{feature}</span>
                                </li>
                              ))}
                            </ul>
                          </div>
                        )}
                      </div>
                    </div>
                  )}

                  {activeCategory.id === 'skills' && (
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                      {Object.entries(portfolioData.skills).map(([category, skillList]) => (
                        <div key={category} className="bg-slate-50/50 dark:bg-[#1a2234] border border-slate-200/80 dark:border-slate-800 rounded-xl p-6 shadow-sm">
                          <h3 className="text-xs font-mono uppercase tracking-widest text-[#ea580c] dark:text-[#f97316] font-semibold mb-4">{category}</h3>
                          <div className="flex flex-wrap gap-2">
                            {skillList.map((skill, idx) => (
                              <span key={idx} className="bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-700/80 text-slate-700 dark:text-slate-300 text-xs font-medium px-3 py-1.5 rounded-lg">
                                {skill}
                              </span>
                            ))}
                          </div>
                        </div>
                      ))}
                    </div>
                  )}

                  {activeCategory.id === 'activities' && (
                    <div className="space-y-6">
                      {portfolioData.activities.map((activity, idx) => (
                        <div key={idx} className="bg-slate-50/50 dark:bg-[#1a2234] border border-slate-200/80 dark:border-slate-800 rounded-xl p-6 shadow-sm">
                          <div className="flex flex-col md:flex-row md:justify-between md:items-start mb-2">
                            <div>
                              <h3 className="text-lg font-bold text-slate-900 dark:text-white">{activity.title}</h3>
                              <h4 className="text-sm text-[#2563eb] dark:text-[#60a5fa] font-semibold">{activity.role}</h4>
                            </div>
                            <span className="text-xs font-mono font-semibold text-[#2563eb] dark:text-[#60a5fa] bg-blue-50 dark:bg-blue-950/40 px-2.5 py-1 rounded mt-2 md:mt-0">
                              {activity.date}
                            </span>
                          </div>
                          <p className="text-slate-600 dark:text-slate-400 text-sm mt-3 leading-relaxed">
                            {activity.description}
                          </p>
                        </div>
                      ))}
                    </div>
                  )}
                </div>
              </div>
            ) : (
              <div className="animate-fade-in">
                <header className="mb-10 border-b border-slate-200/80 dark:border-slate-800 pb-10">
                  <div className="mb-5 flex justify-start">
                    <button
                      type="button"
                      onClick={() => setIsDarkMode((prev) => !prev)}
                      className="inline-flex items-center gap-2 rounded-full border border-slate-200/80 bg-white/90 px-3 py-2 text-[10px] font-semibold uppercase tracking-[0.18em] text-slate-700 shadow-sm backdrop-blur-sm transition-colors hover:border-[#ea580c]/60 hover:text-[#ea580c] dark:border-slate-700/70 dark:bg-slate-900/80 dark:text-slate-200 dark:hover:border-[#f97316]/70 dark:hover:text-[#f97316]"
                    >
                      <span>{isDarkMode ? '☀️' : '🌙'}</span>
                      <span>{isDarkMode ? 'Light' : 'Dark'} mode</span>
                    </button>
                  </div>

                  <div className="inline-block px-3 py-1 rounded-full bg-orange-100 dark:bg-orange-950/40 text-[#ea580c] dark:text-[#f97316] text-xs font-mono font-semibold uppercase tracking-widest mb-4">
                    Available for Roles in 2027
                  </div>
                  <h1 className="text-4xl md:text-5xl font-extrabold tracking-tight mb-3 text-slate-900 dark:text-white">
                    {portfolioData.profile.name}
                  </h1>
                  <h2 className="text-lg md:text-xl font-mono text-[#ea580c] dark:text-[#f97316] mb-5 tracking-tight font-semibold">
                    {portfolioData.profile.title}
                  </h2>
                  <p className="max-w-2xl text-slate-600 dark:text-slate-300 text-base md:text-lg leading-relaxed font-normal">
                    {portfolioData.profile.summary}
                  </p>
                  
                  <div className="flex items-center gap-8 mt-8">
                    <a 
                      href={portfolioData.profile.links.cv} 
                      target="_blank" 
                      rel="noopener noreferrer"
                      className="text-xs font-mono uppercase tracking-widest font-bold text-[#2563eb] dark:text-[#60a5fa] hover:text-[#ea580c] dark:hover:text-[#f97316] flex items-center gap-1.5 transition-colors group"
                    >
                      <span>CV</span>
                      <span className="text-sm group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-transform">↗</span>
                    </a>
                    <a 
                      href={portfolioData.profile.links.github} 
                      target="_blank" 
                      rel="noopener noreferrer"
                      className="text-xs font-mono uppercase tracking-widest font-bold text-[#2563eb] dark:text-[#60a5fa] hover:text-[#ea580c] dark:hover:text-[#f97316] flex items-center gap-1.5 transition-colors group"
                    >
                      <span>GitHub</span>
                      <span className="text-sm group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-transform">↗</span>
                    </a>
                    <a 
                      href={portfolioData.profile.links.linkedin} 
                      target="_blank" 
                      rel="noopener noreferrer"
                      className="text-xs font-mono uppercase tracking-widest font-bold text-[#2563eb] dark:text-[#60a5fa] hover:text-[#ea580c] dark:hover:text-[#f97316] flex items-center gap-1.5 transition-colors group"
                    >
                      <span>LinkedIn</span>
                      <span className="text-sm group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-transform">↗</span>
                    </a>
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
            fixed inset-y-0 right-0 z-50 w-full bg-white dark:bg-[#0f172a] border-l border-slate-200 dark:border-slate-800/80 flex flex-col shadow-2xl transition-transform duration-300
            lg:relative lg:w-[32%] lg:translate-x-0
            ${isMobileChatOpen ? 'translate-x-0' : 'translate-x-full'}
          `}>
            <Chatbot 
              inputValue={chatInput} 
              setInputValue={setChatInput}
              onClose={() => setIsMobileChatOpen(false)}
              activeCategory={activeCategory}         
              selectedProject={selectedProject}      
            />
          </aside>

          {/* Mobile FAB */}
          <button 
            onClick={() => setIsMobileChatOpen(true)}
            className="lg:hidden fixed bottom-6 right-6 bg-[#ea580c] text-white rounded-full p-4 shadow-xl hover:bg-[#c2410c] transition-colors z-40"
          >
            <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 10h.01M12 10h.01M16 10h.01M9 16H5a2 2 0 01-2-2V6a2 2 0 012-2h14a2 2 0 012 2v8a2 2 0 01-2 2h-5l-5 5v-5z" />
            </svg>
          </button>
        </div>
      </div>
    </div>
  );
}