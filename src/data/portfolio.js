export const portfolioData = {
  profile: {
    name: "Fatima Zahrah",
    title: "Computer Scientist · Applied Computational Science",
    summary: "Computer Science graduate with experience spanning machine learning, software engineering, and cybersecurity. Building intelligent, reliable systems at the intersection of computation, data, and real-world problems.",
    links: { 
      cv: "/cv.pdf", 
      github: "https://github.com/fantaAstic", 
      linkedin: "https://www.linkedin.com/in/fanta-kebe-287701247/" 
    }
  },
  aboutContent: {
    bio: "Computer Science graduate with experience across machine learning, software engineering and cybersecurity. Interested in building intelligent and reliable systems that combine computation, data and practical engineering.",
    backgroundDetails: [
      "Strong mathematical background alongside computer science, with A-levels in Mathematics, Chemistry and Economics.",
      "Experience working in both machine learning and cybersecurity/security engineering environments."
    ],
    themes: [
      "Artificial Intelligence",
      "Machine Learning",
      "Software Engineering",
      "Data & NLP",
      "Cybersecurity",
      "Computational Science",
      "Automation"
    ]
  },
categories: [
    {
      id: "about",
      title: "About",
      description: "Background, education, and technical interests.",
      askPrompt: "Tell me about Fatima and her technical interests."
    },
    {
      id: "projects",
      title: "Projects",
      description: "Machine learning models, full-stack apps, and IoT systems.",
      askPrompt: "What are Fatima's most technically challenging projects?"
    },
    {
      id: "experience",
      title: "Experience",
      description: "Professional engineering roles and internships.",
      askPrompt: "Summarise Fatima's professional engineering experience."
    },
    {
      id: "skills",
      title: "Skills",
      description: "Languages, frameworks, ML, and engineering tools.",
      askPrompt: "What are Fatima's strongest technical skills and where has she applied them?"
    },
    {
      id: "activities",
      title: "Awards & Activities",
      description: "Scholarships, hackathons, and mentoring programs.",
      askPrompt: "Tell me about Fatima's awards and extracurricular activities."
    }
    /* 
    {
      id: "learning",
      title: "Current Learning",
      description: "Active study areas and technical development.",
      askPrompt: "What technical areas is Fatima currently developing?"
    },
    {
      id: "notes",
      title: "Technical Notes",
      description: "Architecture diagrams, algorithms, and system designs.",
      askPrompt: "Summarise Fatima's approach to software architecture."
    } 
    */
  ],
  education: [
    {
      university: "Imperial College London",
      degree: "MSc Applied Computational Science & Engineering",
      years: "2026–2027",
      details: "Ada Lovelace Scholarship for Women"
    },
    {
      university: "University of Warwick",
      degree: "BSc (Hons) Computer Science",
      years: "2022–2025"
    }
  ],
  experience: [
    {
      company: "Project Ndiyan",
      role: "Lead Engineer - Software & Data Architecture",
      years: "Aug 2026 – Present",
      description: "Leading IoT sensor infrastructure design and building real-time flood monitoring dashboards.",
      highlights: [
        "Architecting backend telemetry systems for IoT devices.",
        "Developing real-time data pipelines for environmental monitoring."
      ]
    },
    {
      company: "JPMorgan Chase",
      role: "Cybersecurity / Security Engineering",
      years: "Sep 2025 – Jun 2026",
      description: "Worked across security monitoring, detection engineering and automation, with a focus on improving the efficiency and reliability of security operations.",
      highlights: [
        "Analysed security logs and alerts across AWS and GCP environments.",
        "Worked with Splunk and SIEM detection logic, suggesting improvements to rules.",
        "Developed Python automations to reduce repetitive security workflows.",
        "Built and worked with SOAR workflows.",
        "Explored applications of machine learning for anomaly detection."
      ]
    },
    {
      company: "JPMorgan Chase",
      role: "Machine Learning Engineer Intern",
      years: "Jun 2024 – Aug 2024",
      description: "Applied machine learning and natural language processing to improve the classification of software engineering data.",
      highlights: [
        "Fine-tuned BERT for bug-ticket classification.",
        "Worked with Python and transformer-based NLP.",
        "Applied machine learning techniques to a real-world engineering problem within a large-scale financial-services environment."
      ]
    },
    {
      company: "SEO London",
      role: "Full Stack Software Engineer",
      years: "Jun 2023 – Sep 2023",
      description: "Addressed the risk of phishing and malicious links by developing a full-stack web application that lets users verify URL safety in real time using Google's Safe Browsing API.",
      highlights: [
        "Built the backend using Python, Flask, and SQLAlchemy, with a responsive frontend.",
        "Deployed the app live implementing unit tests and automating them via GitHub Actions CI.",
        "Achieved active usage by peers at SEO London."
      ]
    },
    {
      company: "Jane Street",
      role: "First-Year Trading and Technology Program, Developer",
      years: "Mar 2023",
      description: "Participated in an intensive trading and technology program, designing and optimising a Python trading bot using algorithmic strategies for financial instruments.",
      highlights: [
        "Placed 1st in an Estimathon (mathematical puzzle-solving).",
        "Placed 2nd in an Electronic Trading Competition."
      ]
    }
  ],
  projects: [
  {
      title: "Interactive AI Portfolio",
      subtitle: "Personal portfolio with a client-side RAG assistant (Sep 2026 - Present)",
      description: "A modern, card-based portfolio platform featuring a custom retrieval-augmented generation (RAG) assistant that answers recruiter questions using structured JSON data to eliminate hallucinations.",
      technologies: ["React", "Tailwind CSS", "Vite", "Gemini API", "Client-Side RAG"],
      features: [
        "Architected a single-source-of-truth JSON model powering both the static UI and the AI assistant.",
        "Engineered a lightweight client-side retrieval function that maps user query intents to relevant JSON snippets.",
        "Implemented strict system instruction constraints with the Gemini API to anchor responses exclusively to retrieved data and prevent hallucinations.",
        "Designed a responsive 70/30 split-pane interface with context-aware prompt chips that adapt based on the user's navigation state."
      ],
      technicalAreas: {
        "Frontend Engineering": ["React", "Tailwind CSS", "Vite", "State Management"],
        "Architecture & AI": ["Client-Side RAG", "Data Modeling", "Gemini API Integration", "Prompt Engineering"]
      }
    },
    {
      title: "Module Insight",
      subtitle: "AI-powered platform for university module feedback analysis",
      description: "A full-stack platform that uses natural language processing and machine learning to analyse student feedback and generate insights for students and educators.",
      technologies: ["Python", "Flask", "React Native", "NLP", "BART", "LDA"],
      features: [
        "Analyses large-scale student module feedback.",
        "Performs sentiment analysis and uses topic modelling to identify recurring themes.",
        "Provides personalised module recommendations and module-improvement insights.",
        "Exposes functionality through a backend API and mobile interface."
      ],
      technicalAreas: {
        "Machine Learning": ["NLP", "Sentiment analysis", "BART", "LDA / topic modelling"],
        "Engineering": ["Flask backend", "REST APIs", "React Native / Expo frontend", "Data processing"]
      }
    },
    {
      title: "Project Ndiyan",
      subtitle: "IoT flood-monitoring system",
      description: "An IoT-based system designed to monitor environmental conditions and provide information relevant to flood monitoring.",
      technologies: ["IoT", "Python", "Backend", "Data Systems"],
      features: []
    },
    {
      title: "Full-stack Rewards Application",
      subtitle: "Card transaction rewards platform (Sep 2025 - Oct 2025)",
      description: "Contributed across the stack on a collaborative project, designing database schemas, implementing business logic, and managing data persistence alongside frontend development.",
      technologies: ["React", "Java Spring Boot", "MyBatis", "Jenkins"],
      features: [
        "Implemented business logic in Java Spring Boot.",
        "Managed data persistence with MyBatis.",
        "Built responsive frontend features in React."
      ]
    }
  ],
  skills: {
    "Programming": [
      "Python", "Java", "JavaScript"
    ],
    "Machine Learning & AI": [
      "Natural Language Processing", "Machine Learning", "BERT / Transformers", 
      "Sentiment Analysis", "Topic Modelling", "LDA", "BART", "Anomaly Detection"
    ],
    "Software Engineering": [
      "REST APIs", "Flask", "Spring Boot", "React", "React Native", 
      "Expo", "Backend Development", "Full-Stack Development"
    ],
    "Cybersecurity": [
      "Splunk", "SIEM", "SOAR", "Detection Engineering", 
      "Security Automation", "Cloud Security", "AWS", "GCP"
    ],
    "Data & Computational": [
      "Data Processing", "Statistical Analysis", "Linear Algebra", 
      "Calculus", "Algorithms & Data Structures", "Computational Science"
    ]
  },
  activities: [
    {
      title: "Ada Lovelace Scholarship for Women",
      role: "Scholar",
      date: "2026 – 2027",
      description: "Awarded full scholarship for MSc study at Imperial College London due to exceptional academic merit."
    },
    {
      title: "JPMorganChase Code for Good Hackathon",
      role: "React & Firebase Developer",
      date: "Nov 2024",
      description: "Built a tool to help the Make-A-Wish Foundation match wish providers to individuals and locations. Led UI design and implementation in React.js and integration with backend services via Google Firebase."
    },
    {
      title: "Google BGN Hackathon",
      role: "Full-Stack Developer",
      date: "Oct 2023",
      description: "Built a web app (SQLAlchemy database, Bootstrap/HTML/JS frontend) to help first-year students discover events and reduce loneliness, ranking among the top 5 most popular applications at the hackathon."
    },
    {
      title: "Generating Genius D&I Mentoring Platform",
      role: "UI Developer & Presenter",
      date: "Aug 2023 – Sep 2023",
      description: "Nominated to develop and present a Diversity & Inclusion mentoring platform to corporate stakeholders at HSBC and National Grid. Designed the platform's frontend UI in React."
    },
    {
      title: "Generating Genius Top 100 Future STEM Leader",
      role: "Selected Leader",
      date: "Feb 2021 – Aug 2022",
      description: "Selected as one of the Top 100 Year 12s in the UK (unranked) as having exceptional academic and career potential in STEM."
    },
    {
      title: "Kent Maps Online Project",
      role: "Volunteer",
      date: "Jan 2021 – Jul 2021",
      description: "Improved user engagement on the website by developing interactive features (dynamic maps, moving images) and authoring/proofreading published articles."
    }
  ],
};