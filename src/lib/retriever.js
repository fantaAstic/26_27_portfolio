import { portfolioData } from '../data/portfolio';

export function retrievePortfolioContext(query, selectedProject) {
  const q = query.toLowerCase();
  
  if (selectedProject) {
    return JSON.stringify(selectedProject, null, 2);
  }

  let contextSnippets = [];

  if (q.includes('ml') || q.includes('machine learning') || q.includes('nlp') || q.includes('bert') || q.includes('transformer')) {
    const mlProjects = portfolioData.projects.filter(p => p.technologies.some(t => ['NLP', 'BART', 'LDA', 'Machine Learning', 'BERT / Transformers'].includes(t)));
    const mlExp = portfolioData.experience.filter(e => e.role.toLowerCase().includes('machine learning') || e.description.toLowerCase().includes('nlp') || e.description.toLowerCase().includes('bert'));
    contextSnippets.push({ category: "Machine Learning Projects & Experience", data: { mlProjects, mlExp } });
  }

  if (q.includes('swe') || q.includes('software') || q.includes('full-stack') || q.includes('code') || q.includes('build') || q.includes('react')) {
    contextSnippets.push({ category: "Software Engineering & Projects", data: portfolioData.projects });
  }

  if (q.includes('security') || q.includes('cyber') || q.includes('splunk') || q.includes('jpmorgan')) {
    const cyberExp = portfolioData.experience.filter(e => e.company.toLowerCase().includes('jpmorgan'));
    contextSnippets.push({ category: "Cybersecurity & Experience", data: cyberExp });
  }

  if (q.includes('skill') || q.includes('languages') || q.includes('technologies')) {
    contextSnippets.push({ category: "Technical Skills", data: portfolioData.skills });
  }

  if (q.includes('education') || q.includes('degree') || q.includes('imperial') || q.includes('warwick') || q.includes('scholarship')) {
    contextSnippets.push({ category: "Education & Background", data: portfolioData.education });
  }

  if (q.includes('award') || q.includes('hackathon') || q.includes('extracurricular') || q.includes('activities') || q.includes('leadership')) {
    contextSnippets.push({ category: "Awards & Activities", data: portfolioData.activities });
  }

  if (q.includes('cv') || q.includes('resume') || q.includes('download')) {
    contextSnippets.push({ category: "CV Link Reference", data: { cvUrl: "/cv.pdf", message: "Use link [Download CV](/cv.pdf)" } });
  }

  if (q.includes('link') || q.includes('profile') || q.includes('github') || q.includes('linkedin')) {
    contextSnippets.push({ category: "Profile Links", data: portfolioData.profile.links });
  }

  if (contextSnippets.length === 0) {
    contextSnippets.push({ 
      category: "General Portfolio Overview", 
      data: { profile: portfolioData.profile, about: portfolioData.aboutContent, projects: portfolioData.projects.map(p => p.title), activities: portfolioData.activities.map(a => a.title) } 
    });
  }

  return JSON.stringify(contextSnippets, null, 2);
}