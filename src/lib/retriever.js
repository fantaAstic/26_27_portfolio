import { portfolioData } from '../data/portfolio';

export function retrievePortfolioContext(query, selectedProject) {
  const q = query.toLowerCase();
  
  // If the user is viewing a specific project, prioritize that project's data
  if (selectedProject) {
    return JSON.stringify(selectedProject, null, 2);
  }

  let contextSnippets = [];

  // Match based on query intent
  if (q.includes('ml') || q.includes('machine learning') || q.includes('nlp') || q.includes('bert')) {
    const mlProjects = portfolioData.projects.filter(p => p.technologies.some(t => ['NLP', 'BART', 'LDA', 'Machine Learning'].includes(t)));
    const mlExp = portfolioData.experience.filter(e => e.role.toLowerCase().includes('machine learning') || e.description.toLowerCase().includes('nlp'));
    contextSnippets.push({ category: "Machine Learning Projects & Experience", data: { mlProjects, mlExp } });
  }

  if (q.includes('swe') || q.includes('software') || q.includes('full-stack') || q.includes('code') || q.includes('build')) {
    contextSnippets.push({ category: "Software Engineering & Projects", data: portfolioData.projects });
  }

  if (q.includes('security') || q.includes('cyber') || q.includes('splunk') || q.includes('jpmorgan')) {
    const cyberExp = portfolioData.experience.filter(e => e.company.toLowerCase().includes('jpmorgan'));
    contextSnippets.push({ category: "Cybersecurity & Experience", data: cyberExp });
  }

  if (q.includes('skill') || q.includes('languages') || q.includes('technologies')) {
    contextSnippets.push({ category: "Technical Skills", data: portfolioData.skills });
  }

  if (q.includes('education') || q.includes('degree') || q.includes('imperial') || q.includes('warwick')) {
    contextSnippets.push({ category: "Education & Background", data: portfolioData.education });
  }

  // Fallback: If no specific keyword matches, return a summary of everything
  if (contextSnippets.length === 0) {
    contextSnippets.push({ 
      category: "General Portfolio Overview", 
      data: { profile: portfolioData.profile, about: portfolioData.aboutContent, projects: portfolioData.projects.map(p => p.title) } 
    });
  }

  return JSON.stringify(contextSnippets, null, 2);
}