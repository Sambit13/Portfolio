export const portfolioData = {
  name: "Sambit Ranjan Sahoo",
  title: "Systems & Machine Learning Engineer",
  location: "India (Remote)",
  timezone: "Asia/Kolkata",
  status: "Open to Opportunities",
  about: "I engineer highly resilient backend pipelines, high-throughput machine learning endpoints, and optimized asynchronous systems. Focused on performance profiling, clean data structure design, and microservices architecture.",
  
  skills: [
    { category: "Languages", items: ["Python", "C++", "C", "SQL", "JavaScript"] },
    { category: "Frameworks & Tools", items: ["FastAPI", "Redis", "PyTorch", "PostgreSQL", "Git"] },
    { category: "Concepts", items: ["Asynchronous Architecture", "OCR Systems", "Queue Tuning"] }
  ],

  projects: [
    {
      year: "2026",
      title: "Hybrid-OCR API Engine",
      description: "An ultra-fast asynchronous processing system engineered to process and recognize handwritten digits and alphabets from complex EMNIST datasets. Leverages an optimized Redis queue backplane to eliminate processing bottlenecks under heavy request concurrency.",
      tags: ["Python", "FastAPI", "Redis", "PyTorch", "PostgreSQL"],
      links: { github: "#", live: "#" }
    },
    {
      year: "2025",
      title: "Production Scheduler Optimization Core",
      description: "A mathematical planning engine designed for factory inventory constraints and automated resource control matrices. Built with strict object-oriented patterns to optimize compute profiles during heavy runtime passes.",
      tags: ["C++", "Algorithms", "System Architecture", "Optimization"],
      links: { github: "#", live: "#" }
    }
  ],

  experience: [
    {
      period: "Feb 2025 — Present",
      role: "Backend Infrastructure Engineer",
      company: "Tech Systems Core",
      description: "Architecting core performance modules and pipeline queues.",
      bullets: [
        "Optimized asynchronous API throughput using custom background workers and process isolation techniques.",
        "Built reliable automated debugging configurations to capture complex multithreaded stack trace exceptions cleanly.",
        "Refactored data layout logic to handle large-scale image character segmentation routines dynamically."
      ]
    }
  ]
};