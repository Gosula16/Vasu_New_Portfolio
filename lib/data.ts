export const siteConfig = {
  siteName: "GV Portfolio",
  title: "Gosula Venkata Vasu · Portfolio",
  description:
    "Aspiring software engineer portfolio — AI/ML, full-stack craft, and premium UX built with Next.js.",
  url: "https://vasu-portfolio.vercel.app",
};

export const personal = {
  name: "Gosula Venkata Vasu",
  title: "Aspiring Software Engineer in Computer Science and Engineering",
  tagline:
    "Passionate about building innovative software solutions and creating impactful digital experiences.",
  email: "vasugosula@gmail.com",
  phone: "+91 7075843153",
  location: "Porumamilla, Andhra Pradesh, India",
  linkedin: "https://www.linkedin.com/in/gosula-venkata-vasu-965a1931b",
  github: "https://github.com/vasugosula",
  githubUsername: "vasugosula",
  resumePath: "/resume.pdf",
  intro: `A passionate and highly motivated Computer Science student specializing in Artificial Intelligence and Machine Learning, with strong interests in software engineering, AI technologies, cloud computing, and full-stack development. Enthusiastic about building innovative digital products, solving real-world problems, and continuously learning emerging technologies.`,
  summary: `Dedicated and goal-oriented B.Tech student with hands-on experience in web development, AI concepts, and software project development. Skilled in frontend technologies, programming fundamentals, database management, and cloud platforms. Passionate about developing scalable software applications and exploring AI-driven innovations.`,
  careerGoals: [
    "Work as an AI Engineer at a top tech company",
    "Build innovative software products",
    "Become a Software Engineer specializing in AI & Cloud technologies",
  ],
  strengths: [
    "Problem Solving",
    "Quick Learner",
    "Team Collaboration",
    "Analytical Thinking",
    "Adaptability",
    "Passion for Technology",
  ],
  hobbies: [
    "Coding",
    "AI & Machine Learning",
    "Reading Tech Blogs",
    "Learning New Technologies",
    "Problem Solving",
    "Cricket",
    "Music",
    "Gym",
  ],
};

export const education = {
  university: "Mohan Babu University",
  degree: "B.Tech in Computer Science and Engineering (AI & ML)",
  cgpa: "9.24",
  graduationYear: 2027,
};

export const roles = [
  "Software Engineer",
  "AI / ML Enthusiast",
  "Full-Stack Developer",
  "Cloud Learner",
];

export const skillCategories = [
  {
    id: "languages",
    label: "Programming Languages",
    skills: [
      { name: "Java", level: 82 },
      { name: "Python", level: 68 },
    ],
  },
  {
    id: "frontend",
    label: "Frontend",
    skills: [
      { name: "HTML", level: 90 },
      { name: "CSS", level: 85 },
      { name: "JavaScript", level: 78 },
      { name: "Bootstrap", level: 72 },
      { name: "React.js", level: 70 },
    ],
  },
  {
    id: "backend",
    label: "Backend",
    skills: [{ name: "PHP", level: 62 }],
  },
  {
    id: "database",
    label: "Database",
    skills: [{ name: "MySQL", level: 75 }],
  },
  {
    id: "cloud",
    label: "Cloud",
    skills: [{ name: "Amazon AWS", level: 55 }],
  },
  {
    id: "devtools",
    label: "Tools & Platforms",
    skills: [
      { name: "VS Code", level: 92 },
      { name: "Git / GitHub", level: 80 },
      { name: "Jupyter / Anaconda", level: 65 },
      { name: "UML / StarUML", level: 58 },
    ],
  },
];

export const projects = [
  {
    id: "lms",
    title: "Learning Management System",
    description:
      "A web-based platform designed to manage courses, learning resources, student activities, and academic interactions efficiently.",
    tags: ["Web", "Education", "Full Stack"],
    featured: true,
    demo: "#contact",
    repo: personal.github,
  },
  {
    id: "bank",
    title: "Bank Management System",
    description:
      "A software application developed to manage banking operations such as account creation, transactions, and customer data securely.",
    tags: ["Software", "Security", "Database"],
    featured: true,
    demo: "#contact",
    repo: personal.github,
  },
  {
    id: "chatbot",
    title: "AI Chatbot",
    description:
      "An intelligent chatbot project capable of handling user queries and providing automated responses using AI concepts.",
    tags: ["AI", "NLP", "Automation"],
    featured: true,
    demo: "#contact",
    repo: personal.github,
  },
];

export const experience = [
  {
    id: "agentic-ai",
    title: "Agentic AI Workshop",
    org: "Government-supported program",
    period: "Workshop",
    description:
      "Hands-on exposure to agentic AI workflows, tooling, and modern AI engineering practices.",
  },
  {
    id: "servicenow",
    title: "ServiceNow Virtual Internship",
    org: "ServiceNow",
    period: "Virtual",
    description:
      "Completed structured modules covering platform fundamentals and practical implementation scenarios.",
  },
  {
    id: "synapse",
    title: "Synapse 2K25 Hackathon",
    org: "College / Regional",
    period: "Hackathon",
    description:
      "Collaborative problem solving under time constraints with rapid prototyping and pitching.",
  },
];

export const certifications = [
  "ServiceNow CSA Certified",
  "ServiceNow CAD Certified",
  "Oracle Generative AI Certified",
  "Multiple Coursera Certifications",
];

export const achievements = [
  "Participated in Synapse 2K25 Hackathon",
  "Participated in coding competitions conducted at college level",
];

export const services = [
  {
    id: "web",
    title: "Web Development",
    description:
      "Responsive, accessible interfaces with polished UX and performance-conscious delivery.",
    icon: "layout",
  },
  {
    id: "ai",
    title: "AI Integration",
    description:
      "Practical AI features—from chat assistants to workflow automation—built responsibly.",
    icon: "sparkles",
  },
  {
    id: "fullstack",
    title: "Full Stack Apps",
    description:
      "End-to-end product thinking: APIs, databases, deployment, and iterative iteration.",
    icon: "layers",
  },
  {
    id: "automation",
    title: "Automation",
    description:
      "Scripts and tooling that remove repetitive work and improve developer velocity.",
    icon: "workflow",
  },
  {
    id: "uiux",
    title: "UI / UX",
    description:
      "Glassmorphism, motion, and clarity-first layouts that feel premium—not noisy.",
    icon: "palette",
  },
];

export const testimonials = [
  {
    id: "t1",
    quote:
      "Vasu brings curiosity and discipline—great collaborator with a sharp eye for UI polish.",
    name: "Academic Mentor",
    role: "University Program",
  },
  {
    id: "t2",
    quote:
      "Clear communication, reliable execution, and a genuine passion for learning new stacks.",
    name: "Peer Team Lead",
    role: "Hackathon Crew",
  },
  {
    id: "t3",
    quote:
      "Strong fundamentals and thoughtful trade-offs—exactly what you want on a student-led build.",
    name: "Workshop Facilitator",
    role: "AI Workshop",
  },
];

export const blogPosts = [
  {
    slug: "building-glass-ui",
    title: "Notes on glassmorphism without the glare",
    excerpt:
      "How I balance blur, contrast, and motion so interfaces stay readable and fast.",
    date: "2026-03-12",
    readMin: 6,
  },
  {
    slug: "student-ai-roadmap",
    title: "A practical AI learning roadmap for CS students",
    excerpt:
      "Foundations first: programming, math intuition, projects, then specialization.",
    date: "2026-02-03",
    readMin: 8,
  },
  {
    slug: "shipping-side-projects",
    title: "Shipping side projects when semester life is loud",
    excerpt:
      "Tiny milestones, ruthless scope cuts, and demos that recruiters actually watch.",
    date: "2026-01-18",
    readMin: 5,
  },
];

export const stats = [
  { label: "CGPA", value: education.cgpa },
  { label: "Graduation", value: String(education.graduationYear) },
  { label: "Projects", value: String(projects.length) },
  { label: "Certs", value: String(certifications.length) },
];
