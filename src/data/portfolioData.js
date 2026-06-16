export const personalInfo = {
  name: 'Nguyen Hoang',
  title: 'Web Developer',
  subtitle: 'GitHub Projects',
  tagline: 'Building things that matter with clean code and great design.',
  bio: [
    'A passionate developer who loves turning ideas into reality through clean, well-crafted code.',
    'Always exploring new technologies and building things that make a difference.',
    'I specialize in building full-stack web applications using modern frameworks like React, Next.js, and Node.js. From designing responsive user interfaces to architecting scalable backends, I focus on writing maintainable code that delivers real value to users.',
    'I\'m currently diving deeper into TypeScript, cloud infrastructure, and developer tooling. I enjoy contributing to open-source projects and collaborating with other developers to solve interesting problems. Every project is an opportunity to learn something new and push the boundaries of what I can build.',
    'Outside of coding, I\'m passionate about UI/UX design, performance optimization, and creating digital experiences that are both fast and accessible to everyone.'
  ],
  location: 'Ha Noi, Viet Nam',
  email: 'nguyenhoang121314151617@gmail.com',
  phone: '+84 559-649-707',
  social: {
    github: 'https://github.com/Michael-Howard209z',
    instagram: 'https://www.instagram.com/_ngncx.hoang/'
  },
  availability: 'Open to work'
}

export const navLinks = [
  { label: 'Home', href: '#hero' },
  { label: 'About', href: '#about' },
  { label: 'Skills', href: '#skills' },
  { label: 'Projects', href: '#projects' },
  { label: 'Contact', href: '#contact' }
]

export const stats = [
  { value: '0', label: 'Repos', suffix: 'GitHub' },
  { value: '0', label: 'Followers', suffix: 'GitHub' },
  { value: '0', label: 'Gists', suffix: 'GitHub' },
  { value: '4+', label: 'Years', suffix: 'Experience' }
]

export const timeline = [
  { year: '2009', title: 'The Beginning', description: 'That is the day I was born.' },
  { year: '2023', title: 'I was scammed by the Trojan virus.', description: 'A harsh lesson about digital security that sparked my deeper interest in cybersecurity and safe coding practices.' },
  { year: '2025', title: 'Started Web Development', description: 'Began my journey into web development, learning HTML, CSS, and JavaScript from scratch.' },
  { year: '2026', title: 'Present Day', description: 'Continuing to explore the frontiers of web creativity, building projects and contributing to the developer community.' }
]

export const skills = [
  { name: 'JavaScript', level: 85, category: 'frontend', icon: '🟨', description: 'Modern ES6+, async/await, DOM manipulation' },
  { name: 'TypeScript', level: 78, category: 'frontend', icon: '🔷', description: 'Type safety, interfaces, generics' },
  { name: 'React', level: 82, category: 'frontend', icon: '⚛️', description: 'Hooks, state management, component architecture' },
  { name: 'Next.js', level: 75, category: 'frontend', icon: '▲', description: 'SSR, SSG, full-stack React applications' },
  { name: 'Node.js', level: 72, category: 'backend', icon: '🟢', description: 'REST APIs, Express, server-side logic' },
  { name: 'Python', level: 68, category: 'backend', icon: '🐍', description: 'Scripting, automation, data processing' },
  { name: 'HTML/CSS', level: 90, category: 'frontend', icon: '🌐', description: 'Semantic markup, responsive design, animations' },
  { name: 'Git', level: 80, category: 'tools', icon: '📦', description: 'Version control, branching, collaboration' },
  { name: 'SQL', level: 65, category: 'backend', icon: '🗄️', description: 'Database design, queries, optimization' }
]

export const skillCategories = [
  { id: 'all', label: 'All' },
  { id: 'frontend', label: 'Frontend' },
  { id: 'backend', label: 'Backend' },
  { id: 'tools', label: 'Tools' }
]

export const services = [
  {
    title: 'Web Development',
    description: 'Build responsive, modern web applications using React, Next.js, and Node.js with clean architecture and best practices for performance and accessibility.',
    icon: '🌐'
  },
  {
    title: 'UI/UX Design',
    description: 'Design intuitive interfaces with a focus on user experience, mobile-first layouts, and smooth interactions that keep visitors engaged.',
    icon: '🎨'
  },
  {
    title: 'API & Backend',
    description: 'Develop scalable RESTful APIs and backend services with Node.js, databases, and cloud deployment to power modern applications.',
    icon: '⚙️'
  }
]

export const projects = [
  {
    id: 'gojoforums',
    title: 'GojoForums',
    subtitle: 'Community Forum Platform',
    description: 'A community forum platform built with modern web technologies. Features include user authentication, post creation, real-time discussions, and a clean, responsive interface.',
    longDescription: 'GojoForums is a full-stack community forum platform designed to facilitate meaningful discussions. Built with a focus on user experience, it features a clean interface, real-time updates, and robust authentication. The platform supports topic categorization, nested comments, user profiles, and moderation tools.',
    tags: ['React', 'Next.js', 'Node.js', 'MongoDB', 'Tailwind CSS'],
    image: 'https://images.unsplash.com/photo-1550745165-9bc0b252726f?w=800&q=80',
    images: [
      'https://images.unsplash.com/photo-1550745165-9bc0b252726f?w=1200&q=80',
      'https://images.unsplash.com/photo-1558591710-4b4a1ae0f04d?w=1200&q=80',
      'https://images.unsplash.com/photo-1618005182384-a83a8bd57fbe?w=1200&q=80'
    ],
    category: 'frontend',
    year: '2025',
    role: 'Full Stack Developer',
    duration: 'Ongoing',
    link: 'https://gojoforums.site',
    github: 'https://github.com/Michael-Howard209z',
    color: '#f59e0b',
    challenge: 'Building a scalable forum platform that handles user authentication, real-time discussions, and content moderation while maintaining a clean, fast user experience.',
    solution: 'Used Next.js for SSR and routing, Node.js for the backend API, MongoDB for flexible data storage, and implemented JWT-based authentication for security.'
  },
  {
    id: 'portfolio',
    title: 'Portfolio Website',
    subtitle: 'Personal Showcase',
    description: 'An award-worthy personal portfolio website featuring immersive 3D backgrounds, smooth animations, and premium dark-mode design.',
    longDescription: 'This portfolio site was crafted to showcase projects and skills in a visually stunning way. Features include a Three.js 3D background, custom cursor, glassmorphism design, smooth scroll animations, and a fully responsive layout.',
    tags: ['React', 'Three.js', 'Framer Motion', 'Tailwind CSS', 'GSAP'],
    image: 'https://images.unsplash.com/photo-1618005182384-a83a8bd57fbe?w=800&q=80',
    images: [
      'https://images.unsplash.com/photo-1618005182384-a83a8bd57fbe?w=1200&q=80',
      'https://images.unsplash.com/photo-1558591710-4b4a1ae0f04d?w=1200&q=80',
      'https://images.unsplash.com/photo-1633356122544-f134324a6cee?w=1200&q=80'
    ],
    category: 'frontend',
    year: '2026',
    role: 'Developer & Designer',
    duration: '2 months',
    link: '#',
    github: 'https://github.com/Michael-Howard209z',
    color: '#06b6d4',
    challenge: 'Creating a premium portfolio that stands out while maintaining fast load times and accessibility.',
    solution: 'Implemented code splitting, lazy loading, optimized WebGL rendering, and used a design system with glassmorphism and neumorphism.'
  },
  {
    id: 'nexus',
    title: 'Web App Template',
    subtitle: 'Full-Stack Starter',
    description: 'A modern full-stack web application template with authentication, database integration, and a clean component architecture.',
    longDescription: 'A comprehensive starter template for web applications, featuring user authentication, database models, API routes, and a responsive UI component library. Designed to accelerate development of new projects with best practices built in.',
    tags: ['Next.js', 'TypeScript', 'Prisma', 'PostgreSQL', 'Tailwind CSS'],
    image: 'https://images.unsplash.com/photo-1558591710-4b4a1ae0f04d?w=800&q=80',
    images: [
      'https://images.unsplash.com/photo-1558591710-4b4a1ae0f04d?w=1200&q=80',
      'https://images.unsplash.com/photo-1633356122544-f134324a6cee?w=1200&q=80',
      'https://images.unsplash.com/photo-1550745165-9bc0b252726f?w=1200&q=80'
    ],
    category: 'backend',
    year: '2025',
    role: 'Full Stack Developer',
    duration: '3 months',
    link: '#',
    github: 'https://github.com/Michael-Howard209z',
    color: '#8b5cf6',
    challenge: 'Building a template that is both flexible enough for various projects and opinionated enough to enforce best practices.',
    solution: 'Modular architecture with clear separation of concerns, comprehensive documentation, and a CLI tool for project scaffolding.'
  }
]

export const experiences = [
  {
    id: 1,
    company: 'Freelance / Personal Projects',
    role: 'Web Developer',
    period: '2025 — Present',
    description: 'Building full-stack web applications, contributing to open source, and continuously learning modern web technologies.',
    achievements: [
      'Built GojoForums community platform',
      'Developed premium portfolio website',
      'Explored React, Next.js, Node.js, and TypeScript',
      'Contributed to open-source projects on GitHub'
    ],
    color: '#f59e0b',
    type: 'work'
  },
  {
    id: 2,
    company: 'Self-Taught Journey',
    role: 'Student Developer',
    period: '2023 — 2025',
    description: 'Self-directed learning journey through modern web development, starting with HTML, CSS, and JavaScript fundamentals.',
    achievements: [
      'Mastered HTML, CSS, and JavaScript fundamentals',
      'Built first full-stack application',
      'Learned React and modern frontend frameworks',
      'Started GitHub portfolio with multiple projects'
    ],
    color: '#06b6d4',
    type: 'education'
  }
]

export const testimonials = [
  {
    id: 1,
    name: 'Visitor',
    role: 'Portfolio Reviewer',
    content: 'Clean, professional code with attention to detail. The projects show a solid understanding of modern web development practices.',
    avatar: 'https://i.pravatar.cc/150?img=1',
    rating: 5
  },
  {
    id: 2,
    name: 'GitHub Follower',
    role: 'Open Source Community',
    content: 'Active contributor with consistent commit history. Passion for learning and improving visible in every project.',
    avatar: 'https://i.pravatar.cc/150?img=3',
    rating: 5
  },
  {
    id: 3,
    name: 'Peer Developer',
    role: 'Fellow Coder',
    content: 'Great problem-solving skills and a genuine passion for development. Always exploring new technologies and sharing knowledge.',
    avatar: 'https://i.pravatar.cc/150?img=5',
    rating: 5
  }
]

export const blogPosts = [
  {
    id: 1,
    title: 'My Journey into Web Development',
    excerpt: 'How I went from being scammed by a Trojan virus to building full-stack web applications.',
    date: 'Jun 10, 2026',
    readTime: '5 min read',
    category: 'Story',
    image: 'https://images.unsplash.com/photo-1550745165-9bc0b252726f?w=600&q=80',
    link: '#'
  },
  {
    id: 2,
    title: 'Building GojoForums: A Case Study',
    excerpt: 'The challenges and learnings from building a community forum platform from scratch.',
    date: 'May 20, 2026',
    readTime: '8 min read',
    category: 'Tutorial',
    image: 'https://images.unsplash.com/photo-1618005182384-a83a8bd57fbe?w=600&q=80',
    link: '#'
  },
  {
    id: 3,
    title: 'Why Clean Code Matters',
    excerpt: 'Thoughts on writing maintainable code that future-you will thank you for.',
    date: 'Apr 5, 2026',
    readTime: '4 min read',
    category: 'Philosophy',
    image: 'https://images.unsplash.com/photo-1558591710-4b4a1ae0f04d?w=600&q=80',
    link: '#'
  }
]
