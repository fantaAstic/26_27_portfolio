import React, { useState } from 'react';
import Dashboard from './components/Dashboard';
import Chatbot from './components/Chatbot';
import { portfolioData } from './data/portfolio';

export default function App() {
  const [chatInput, setChatInput] = useState("");
  const [isMobileChatOpen, setIsMobileChatOpen] = useState(false);
  const [activeCategory, setActiveCategory] = useState(null);
  const [selectedProject, setSelectedProject] = useState(null);

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
              onClick={() => {
                if (selectedProject) setSelectedProject(null);
                else setActiveCategory(null);
              }}
              className="mb-8 text-sm font-semibold text-gray-500 hover:text-gray-900 flex items-center gap-2 transition-colors"
            >
              ← {selectedProject ? 'Back to Projects' : 'Back to Home'}
            </button>
            
            <header className="mb-10">
              <h2 className="text-4xl font-bold tracking-tight mb-2">{activeCategory.title}</h2>
              <p className="text-xl text-gray-600">{activeCategory.description}</p>
            </header>

            <div className="bg-white rounded-xl border border-gray-200 p-8 shadow-sm min-h-[400px]">
              {/* Inside VIEW 1, replace the placeholder card with this: */}
            <div className="bg-white rounded-xl border border-gray-200 p-8 shadow-sm min-h-[400px]">
              
              {/* If we are on the About page... */}
              {activeCategory.id === 'about' && (
                <div className="space-y-10 text-gray-800">
                  <section>
                    <h3 className="text-xl font-bold mb-4">Background</h3>
                    <p className="text-lg leading-relaxed mb-4">
                      {portfolioData.aboutContent.bio}
                    </p>
                    <ul className="list-disc list-outside ml-5 space-y-2 text-gray-600">
                      {portfolioData.aboutContent.backgroundDetails.map((detail, idx) => (
                        <li key={idx} className="leading-relaxed">{detail}</li>
                      ))}
                    </ul>
                  </section>

                  <section>
                    <h3 className="text-xl font-bold mb-4">Education</h3>
                    <div className="space-y-6">
                      {portfolioData.education.map((edu, idx) => (
                        <div key={idx} className="border-l-2 border-gray-200 pl-4">
                          <h4 className="font-bold text-gray-900">{edu.degree}</h4>
                          <p className="text-gray-600">{edu.university} • {edu.years}</p>
                          {edu.details && <p className="text-sm text-blue-600 mt-1">{edu.details}</p>}
                        </div>
                      ))}
                    </div>
                  </section>

                  <section>
                    <h3 className="text-xl font-bold mb-4">Core Themes</h3>
                    <div className="flex flex-wrap gap-2">
                      {portfolioData.aboutContent.themes.map((theme, idx) => (
                        <span key={idx} className="bg-gray-100 text-gray-700 px-3 py-1.5 rounded-lg text-sm font-medium">
                          {theme}
                        </span>
                      ))}
                    </div>
                  </section>
                </div>
              )}

              {/* If we are on the Experience page... */}
              {activeCategory.id === 'experience' && (
                <div className="space-y-8">
                  {portfolioData.experience.map((job, idx) => (
                    <div key={idx} className="bg-white border border-gray-100 rounded-xl p-6 shadow-sm hover:shadow-md transition-shadow relative overflow-hidden group">
                      
                      {/* Timeline accent line */}
                      <div className="absolute left-0 top-0 bottom-0 w-1 bg-gray-200 group-hover:bg-gray-900 transition-colors"></div>
                      
                      <div className="flex flex-col md:flex-row md:justify-between md:items-start mb-4 pl-4">
                        <div>
                          <h3 className="text-xl font-bold text-gray-900">{job.role}</h3>
                          <h4 className="text-lg text-gray-600 font-medium">{job.company}</h4>
                        </div>
                        <span className="text-sm font-semibold text-gray-500 bg-gray-50 px-3 py-1 rounded-full mt-2 md:mt-0 whitespace-nowrap">
                          {job.years}
                        </span>
                      </div>
                      
                      <div className="pl-4">
                        <p className="text-gray-700 leading-relaxed mb-4">
                          {job.description}
                        </p>
                        
                        {job.highlights && (
                          <ul className="space-y-2">
                            {job.highlights.map((highlight, hIdx) => (
                              <li key={hIdx} className="flex items-start text-gray-600 text-sm">
                                <span className="mr-2 mt-1 w-1.5 h-1.5 bg-gray-400 rounded-full flex-shrink-0"></span>
                                {highlight}
                              </li>
                            ))}
                          </ul>
                        )}
                      </div>
                    </div>
                  ))}
                </div>
              )}
              {/* If we are on the Projects page but NO project is selected (GRID VIEW) */}
              {activeCategory.id === 'projects' && !selectedProject && (
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  {portfolioData.projects.map((project, idx) => (
                    <div key={idx} className="bg-white border border-gray-200 rounded-xl p-6 shadow-sm flex flex-col justify-between hover:shadow-md transition-all group">
                      <div>
                        <h3 className="text-sm font-bold tracking-wider uppercase mb-1 text-gray-900">{project.title}</h3>
                        <p className="text-gray-600 text-sm mb-4">{project.subtitle}</p>

                        <div className="text-xs font-semibold text-blue-600 mb-4 font-mono">
                          {project.technologies.join(' · ')}
                        </div>

                        <ul className="space-y-1.5 mb-6">
                          {project.features.slice(0, 3).map((feature, fIdx) => (
                            <li key={fIdx} className="text-sm text-gray-700 flex items-start">
                              <span className="text-gray-300 mr-2">•</span>
                              <span className="line-clamp-1">{feature}</span>
                            </li>
                          ))}
                          {project.features.length > 3 && (
                            <li className="text-sm text-gray-400 italic mt-1">
                              + {project.features.length - 3} more details
                            </li>
                          )}
                        </ul>
                      </div>

                      <div className="flex gap-4 pt-4 border-t border-gray-50 mt-auto">
                        <button 
                          onClick={() => setSelectedProject(project)}
                          className="text-sm font-semibold text-gray-900 hover:text-blue-600 transition-colors"
                        >
                          View project
                        </button>
                        <button 
                          onClick={() => handlePreFillPrompt(`Tell me about Fatima's work on ${project.title}.`)}
                          className="text-sm font-semibold text-gray-500 hover:text-gray-900 transition-colors flex items-center gap-1"
                        >
                          Ask <span className="text-lg leading-none">→</span>
                        </button>
                      </div>
                    </div>
                  ))}
                </div>
              )}

              {/* If a specific project IS selected (CASE STUDY VIEW) */}
              {activeCategory.id === 'projects' && selectedProject && (
                <div className="bg-white border border-gray-200 rounded-xl overflow-hidden shadow-sm animate-fade-in">
                  <div className="p-6 md:p-10">
                    
                    <div className="mb-6">
                      <h3 className="text-3xl font-bold text-gray-900 mb-2">{selectedProject.title}</h3>
                      <h4 className="text-xl text-blue-600 font-medium">{selectedProject.subtitle}</h4>
                    </div>
                    
                    <p className="text-lg text-gray-700 leading-relaxed mb-8">
                      {selectedProject.description}
                    </p>
                    
                    {/* Tags */}
                    <div className="flex flex-wrap gap-2 mb-8 border-b border-gray-100 pb-8">
                      {selectedProject.technologies.map((tech, tIdx) => (
                        <span key={tIdx} className="bg-gray-900 text-white text-sm font-semibold px-4 py-2 rounded-lg">
                          {tech}
                        </span>
                      ))}
                    </div>

                    {/* Features List */}
                    {selectedProject.features && selectedProject.features.length > 0 && (
                      <div className="mb-10">
                        <h5 className="text-sm font-bold text-gray-900 uppercase tracking-wider mb-4">Key Features & Contributions</h5>
                        <ul className="space-y-3">
                          {selectedProject.features.map((feature, fIdx) => (
                            <li key={fIdx} className="flex items-start text-gray-700">
                              <svg className="w-5 h-5 text-green-500 mr-3 mt-0.5 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" /></svg>
                              <span className="leading-relaxed">{feature}</span>
                            </li>
                          ))}
                        </ul>
                      </div>
                    )}

                    {/* Technical Areas */}
                    {selectedProject.technicalAreas && (
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 bg-gray-50 p-6 rounded-xl border border-gray-100">
                        {Object.entries(selectedProject.technicalAreas).map(([areaName, skills]) => (
                          <div key={areaName}>
                            <h6 className="text-sm font-bold text-gray-900 uppercase tracking-wider mb-3">{areaName}</h6>
                            <div className="flex flex-wrap gap-2">
                              {skills.map((skill, sIdx) => (
                                <span key={sIdx} className="text-sm bg-white border border-gray-200 text-gray-700 px-3 py-1.5 rounded-md shadow-sm">
                                  {skill}
                                </span>
                              ))}
                            </div>
                          </div>
                        ))}
                      </div>
                    )}
                    
                  </div>
                </div>
              )}

              {/* If we are on the Skills page... */}
              {activeCategory.id === 'skills' && (
                <div className="space-y-10 animate-fade-in">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                    {Object.entries(portfolioData.skills).map(([category, skillList]) => (
                      <div key={category} className="bg-white border border-gray-200 rounded-xl p-6 shadow-sm">
                        
                        <div className="flex items-center mb-6">
                          <div className="w-8 h-8 rounded bg-gray-900 text-white flex items-center justify-center mr-3">
                            <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M10 20l4-16m4 4l4 4-4 4M6 16l-4-4 4-4" />
                            </svg>
                          </div>
                          <h3 className="text-lg font-bold text-gray-900">{category}</h3>
                        </div>

                        <div className="flex flex-wrap gap-2.5">
                          {skillList.map((skill, idx) => (
                            <div 
                              key={idx} 
                              className="bg-gray-50 border border-gray-200 text-gray-800 text-sm font-medium px-4 py-2 rounded-lg hover:border-gray-400 hover:bg-gray-100 transition-colors cursor-default"
                            >
                              {skill}
                            </div>
                          ))}
                        </div>
                        
                      </div>
                    ))}
                  </div>
                </div>
              )}

              {/* If we are on the Activities page... */}
              {activeCategory.id === 'activities' && (
                <div className="space-y-6 animate-fade-in">
                  {portfolioData.activities.map((activity, idx) => (
                    <div key={idx} className="bg-white border border-gray-200 rounded-xl p-6 shadow-sm flex flex-col md:flex-row md:items-start gap-4 hover:border-gray-300 transition-colors">
                      <div className="flex-shrink-0 mt-1">
                        <div className="w-10 h-10 rounded-full bg-blue-50 text-blue-600 flex items-center justify-center">
                          <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 3v4M3 5h4M6 17v4m-2-2h4m5-16l2.286 6.857L21 12l-5.714 2.143L13 21l-2.286-6.857L5 12l5.714-2.143L13 3z" />
                          </svg>
                        </div>
                      </div>
                      <div className="flex-1">
                        <div className="flex flex-col md:flex-row md:justify-between md:items-start mb-2">
                          <div>
                            <h3 className="text-lg font-bold text-gray-900">{activity.title}</h3>
                            <h4 className="text-sm font-medium text-blue-600">{activity.role}</h4>
                          </div>
                          <span className="text-xs font-semibold text-gray-500 bg-gray-100 px-2.5 py-1 rounded-md mt-2 md:mt-0 whitespace-nowrap">
                            {activity.date}
                          </span>
                        </div>
                        <p className="text-gray-700 text-sm leading-relaxed">
                          {activity.description}
                        </p>
                      </div>
                    </div>
                  ))}
                </div>
              )}
            </div>
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
          activeCategory={activeCategory}         
          selectedProject={selectedProject}      
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