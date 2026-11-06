/**
 * Centralized Portfolio Data Source of Truth
 * Extracted authoritatively from Ashish Kumar's resume.
 *
 * NOTE: Private personal identifiers (e.g. phone numbers) are strictly excluded.
 */

export const personalInfo = {
  name: "Ashish Kumar",
  title: "Software Engineer",
  headline: "Building Full-Stack Applications, AI-Powered Systems & Scalable Architectures",
  location: "Bengaluru, Karnataka, India",
  email: "ashishkumar.dev16@gmail.com",
  summary:
    "Software Engineer with an MCA (2026) and hands-on experience building full-stack web applications, mobile apps, and AI-powered systems, currently interning at TAP Academy. Skilled in Python, Flask, React.js, Node.js, and MongoDB, with practical experience in REST APIs, cloud deployment (Vercel, Render, TiDB), and LLM-based applications using RAG. Strong foundation in Data Structures & Algorithms, OOP, and DBMS.",
  bio: [
    "I specialize in bridging full-stack software development with cutting-edge AI technologies. With hands-on proficiency in modern frameworks and distributed cloud platforms, I architect end-to-end solutions ranging from high-concurrency e-commerce backends to retrieval-augmented intelligence systems.",
    "Currently interning at TAP Academy in Bengaluru, I build production-grade web services, relational database schemas, and microservice architectures deployed to live cloud infrastructure."
  ],
  socialLinks: {
    github: "https://github.com/adashish09",
    linkedin: "https://linkedin.com/in/ashish-kumar-ad0016",
    previousPortfolio: "https://ashish-portfolio-dev.netlify.app/"
  }
};

export const navigationLinks = [
  { name: "Home", href: "#hero" },
  { name: "About", href: "#about" },
  { name: "Projects", href: "#projects" },
  { name: "Skills", href: "#skills" },
  { name: "Experience", href: "#experience" },
  { name: "Certifications", href: "#certifications" },
  { name: "Resume", href: "#resume" },
  { name: "Contact", href: "#contact" }
];

export const experienceData = [
  {
    id: "tap-academy",
    role: "Intern",
    company: "TAP Academy",
    location: "Bengaluru, Karnataka, India",
    period: "Aug 2026 – Present",
    type: "Internship",
    description: "Developing production-grade Python web applications, REST APIs, and database-backed services.",
    responsibilities: [
      "Learning Python development while building hands-on projects in a structured internship program.",
      "Developing full-stack applications with a Python/Flask backend, relational databases, and REST APIs, and deploying them to live cloud environments."
    ],
    technologies: [
      "Python",
      "Flask",
      "REST APIs",
      "Relational Databases",
      "Cloud Deployment",
      "SQL"
    ]
  }
];

export const projectsData = [
  {
    id: "kickshub",
    title: "KicksHub – Sneaker E-Commerce Platform",
    shortTitle: "KicksHub",
    category: "Full-Stack Web & E-Commerce",
    period: "Sep 2026 – Oct 2026",
    layoutVariant: "featured-hero",
    systemArchitecture: "React Storefront (Vercel) ➔ Flask REST API (Render) ➔ TiDB MySQL (Cloud DB)",
    summary:
      "A complete full-stack sneaker e-commerce platform built with a Flask REST API and React storefront, deployed on live multi-cloud infrastructure with transactional cart workflows and a comprehensive admin management suite.",
    technologies: [
      "Python",
      "Flask",
      "MySQL (TiDB)",
      "JWT Authentication",
      "React.js",
      "Vercel",
      "Render"
    ],
    highlights: [
      "Built and deployed a full-stack sneaker e-commerce platform with a Flask REST API and React storefront, hosted live on Vercel (frontend), Render (backend), and TiDB (database).",
      "Developed catalog search, filtering, and pagination, with JWT authentication, a database-backed cart, and transactional checkout.",
      "Built a role-based admin panel to manage products, categories, orders, and customers."
    ],
    links: {
      github: "https://github.com/adashish09/kickshub",
      live: "https://kickshub-store.vercel.app"
    },
    featured: true,
    visualPlaceholder: "Distributed Cloud Architecture & Storefront Engine"
  },
  {
    id: "ai-resume-interviewer",
    title: "AI Resume Interviewer Platform",
    shortTitle: "AI Resume Interviewer",
    category: "AI & Retrieval-Augmented Generation",
    period: "Apr 2026 – May 2026",
    layoutVariant: "ai-system",
    systemArchitecture: "React Frontend ➔ Node.js API Gateway ➔ Python Ollama Service (Llama 3.1 8B)",
    summary:
      "An intelligent technical interview platform leveraging Llama 3.1 8B via Ollama and a vector-grounded RAG pipeline to dynamically parse resumes and generate adaptive, role-specific follow-up questions.",
    technologies: [
      "React.js",
      "Node.js",
      "Express.js",
      "Python",
      "MongoDB",
      "Ollama (Llama 3.1 8B)",
      "RAG",
      "Vector Search"
    ],
    highlights: [
      "Built an AI interview platform that parses resumes and generates role-specific questions using Llama 3.1 8B via Ollama, grounded by a RAG pipeline with embeddings and semantic search.",
      "Designed a 3-tier architecture (React, Node.js REST API, Python inference service) with streamed AI responses and adaptive follow-up questions."
    ],
    links: {
      github: "https://github.com/adashish09/AI-Resume-Interviewer",
      live: null
    },
    featured: true,
    visualPlaceholder: "3-Tier RAG Pipeline & Streamed LLM Dialogue"
  },
  {
    id: "netsentinel",
    title: "NetSentinel – Network Intrusion Detection System",
    shortTitle: "NetSentinel",
    category: "Systems, Security & Networking",
    period: "Jan 2026 – Mar 2026",
    layoutVariant: "security-telemetry",
    systemArchitecture: "Linux Raw Sockets ➔ Python Packet Inspector ➔ React Anomaly Stream",
    summary:
      "A Linux-based security monitoring system utilizing Python packet capture to inspect live network packets, trigger threshold- and pattern-based anomaly detection, and stream alerts to a real-time React dashboard.",
    technologies: [
      "Python",
      "React.js",
      "Linux",
      "Packet Capture",
      "Anomaly Detection",
      "Network Protocols"
    ],
    highlights: [
      "Built a Linux-based system using Python packet capture to inspect live traffic and flag suspicious activity with threshold- and pattern-based rules.",
      "Developed a React.js dashboard for live traffic visualization, alert history, and threat monitoring."
    ],
    links: {
      github: "https://github.com/adashish09/NetSentinel",
      live: null
    },
    featured: true,
    visualPlaceholder: "Live Packet Capture Engine & React Telemetry Dashboard"
  },
  {
    id: "fliplearn",
    title: "FlipLearn – Cross-Platform Learning App",
    shortTitle: "FlipLearn",
    category: "Mobile Application & Cloud Sync",
    period: "Sep 2025 – Nov 2025",
    layoutVariant: "mobile-app",
    systemArchitecture: "Flutter Client ➔ Local Offline Cache ➔ Firebase Cloud Firestore",
    summary:
      "A cross-platform mobile educational application crafted with Flutter and Firebase, featuring offline-first data caching and an interactive gamified quiz engine with per-user progress analytics.",
    technologies: [
      "Flutter",
      "Dart",
      "Firebase Authentication",
      "Cloud Firestore",
      "Offline-First Caching"
    ],
    highlights: [
      "Built a cross-platform Flutter app with Firebase Authentication and Firestore, using local caching for offline-first sync.",
      "Designed a gamified quiz engine with dynamic content loading and per-user progress tracking."
    ],
    links: {
      github: null,
      live: null
    },
    featured: false,
    visualPlaceholder: "Cross-Platform Flutter Interface & Gamified Quiz State"
  }
];

export const skillCategories = [
  {
    id: "languages",
    name: "Programming Languages",
    icon: "Code2",
    description: "Core syntax, strongly typed systems and scripting languages",
    skills: ["Python", "Java", "JavaScript", "Kotlin", "Dart", "SQL"]
  },
  {
    id: "frontend",
    name: "Frontend & Mobile",
    icon: "Layout",
    description: "Modern component-driven web interfaces and cross-platform native apps",
    skills: ["React.js", "HTML5", "CSS3", "Bootstrap", "Android SDK", "Flutter"]
  },
  {
    id: "backend",
    name: "Backend & Databases",
    icon: "Server",
    description: "High-performance RESTful APIs, distributed databases, and secure authentication",
    skills: [
      "Flask",
      "FastAPI",
      "Node.js",
      "Express.js",
      "REST APIs",
      "SQLAlchemy",
      "JWT Authentication",
      "MySQL",
      "TiDB",
      "MongoDB",
      "Firebase (Firestore, Realtime DB, Auth)"
    ]
  },
  {
    id: "ai",
    name: "AI & Machine Learning",
    icon: "BrainCircuit",
    description: "Generative AI, semantic vector retrieval, and local LLM orchestration",
    skills: [
      "Large Language Models (LLMs)",
      "Ollama",
      "Retrieval-Augmented Generation (RAG)",
      "Vector Search",
      "Embeddings",
      "Prompt Engineering"
    ]
  },
  {
    id: "tools",
    name: "Tools & Deployment",
    icon: "Terminal",
    description: "DevOps pipelines, cloud hosting environments, and agile collaboration",
    skills: ["Git", "GitHub", "Linux", "Vercel", "Render", "Agile/Scrum"]
  },
  {
    id: "fundamentals",
    name: "Core Computer Science",
    icon: "Cpu",
    description: "Algorithmic thinking, robust software design, and network fundamentals",
    skills: [
      "Data Structures & Algorithms",
      "Object-Oriented Programming (OOP)",
      "DBMS",
      "Computer Networks"
    ]
  }
];

export const educationData = [
  {
    degree: "Master of Computer Applications (MCA)",
    institution: "Chandigarh University",
    period: "2024 – 2026",
    score: "CGPA: 8.24/10",
    status: "Candidate",
    details: "Advanced study focusing on distributed systems, modern software architectures, algorithms, and applied machine learning."
  },
  {
    degree: "Bachelor of Computer Applications (BCA)",
    institution: "IGNOU",
    period: "2021 – 2024",
    score: "Percentage: 70.11%",
    status: "Graduated",
    details: "Foundational computer science curriculum covering programming, database management, software engineering, and operating systems."
  }
];

export const certificationsData = [
  {
    name: "AWS Academy Graduate – Generative AI Foundations",
    issuer: "AWS Academy",
    badgeType: "Cloud & AI",
    year: "2025 – 2026",
    description: "Foundational training in AWS generative AI services, large language models, foundational models, and cloud AI architecture."
  },
  {
    name: "Prompt Engineering with GPT",
    issuer: "Coursera",
    badgeType: "Generative AI",
    year: "2025",
    description: "Structured prompt crafting techniques, context window management, few-shot prompting, and chain-of-thought orchestration."
  },
  {
    name: "Front-End Apps with React",
    issuer: "Coursera",
    badgeType: "Frontend",
    year: "2025",
    description: "Component architecture, React hooks, state management patterns, and responsive UI composition."
  },
  {
    name: "ReactJS",
    issuer: "Infosys SpringBoard",
    badgeType: "Frontend",
    year: "2025",
    description: "Industry-aligned React.js training emphasizing modern ES6+ concepts, single-page app development, and component lifecycle."
  },
  {
    name: "Android Mobile App Development",
    issuer: "Coursera",
    badgeType: "Mobile",
    year: "2024",
    description: "Native mobile application development covering Android SDK, UI layouts, activities, lifecycle, and device storage."
  }
];

export const resumeData = {
  sectionTitle: "Beyond the Portfolio",
  headline: "Explore my professional journey.",
  description:
    "A closer look at my experience, technical background, education and projects in a familiar resume format.",
  pdfPath: "/assets/documents/Ashish-Kumar-Resume.pdf",
  fileName: "Ashish-Kumar-Resume.pdf",
  metadata: {
    format: "PDF Document",
    targetRole: "Software Engineer",
    version: "2026 Edition",
    status: "Verified ATS-Ready"
  }
};

export const previousPortfolioData = {
  title: "The Previous Chapter",
  label: "ARCHIVE // V1.0",
  tagline: "Explore an earlier version of my portfolio and see how my development journey has evolved.",
  ctaText: "Visit Previous Portfolio ↗",
  url: "https://ashish-portfolio-dev.netlify.app/",
  milestoneNote: "An honest snapshot of my early web projects and foundational front-end implementations."
};
