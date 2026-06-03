"use client";

import React, { useEffect, useState } from "react";
import PetCompanion from "./pet-companion";

// OFFICIAL DEVELOPER BRAND SYMBOLS IMPORT
import { 
  FaReact, FaJsSquare, FaHtml5, FaCss3Alt, FaNodeJs, FaPython, FaJava, FaGitAlt, FaGithub, FaLinkedin, FaRegEnvelope 
} from "react-icons/fa";
import { 
  SiTailwindcss, SiMongodb, SiFastapi, SiExpress, SiPostman, SiCloudinary, SiVercel, SiRender, SiLeetcode, SiCplusplus
} from "react-icons/si";
import { TbBrandFramerMotion, TbBinaryTree, TbArrowUpRight } from "react-icons/tb";
import { FiCpu, FiSearch, FiBriefcase, FiFolder, FiMail, FiHome, FiUser } from "react-icons/fi";

export default function Home() {
  const [currentTime, setCurrentTime] = useState("");
  const [copied, setCopied] = useState(false);
  
  // COMMAND PALETTE STATE MATRIX
  const [isCommandOpen, setIsCommandOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");

  // JS Programmatic Smooth Scroll Handler
  const handleSmoothScroll = (targetId: string, e?: React.MouseEvent) => {
    if (e) {
      e.preventDefault();
    }
    const element = document.getElementById(targetId);
    if (element) {
      const headerOffset = 90; 
      const elementPosition = element.getBoundingClientRect().top;
      const offsetPosition = elementPosition + (typeof window !== "undefined" ? window.pageYOffset : 0) - headerOffset;

      if (typeof window !== "undefined") {
        window.scrollTo({
          top: offsetPosition,
          behavior: "smooth"
        });
      }
      setIsCommandOpen(false);
    }
  };

  // Central Clipboard Copy Trigger for all Email interactions
  const handleEmailCopy = () => {
    const email = "sambitranjan0123@gmail.com";
    if (typeof navigator !== "undefined" && navigator.clipboard) {
      navigator.clipboard.writeText(email).then(() => {
        setCopied(true);
        setTimeout(() => setCopied(false), 2000); 
      });
    }
  };

  // KEYBOARD SHORTCUT LISTENER ENGINE (Ctrl + K / Cmd + K)
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      const isKeyK = e.key === "k" || e.key === "K" || e.keyCode === 75 || e.code === "KeyK";
      const isModifier = e.ctrlKey || e.metaKey;

      if (isModifier && isKeyK) {
        e.preventDefault();
        setIsCommandOpen((prev) => !prev);
      }
      if (e.key === "Escape") {
        setIsCommandOpen(false);
      }
    };

    if (typeof window !== "undefined") {
      window.addEventListener("keydown", handleKeyDown);
      return () => window.removeEventListener("keydown", handleKeyDown);
    }
  }, []);

  // Live real-time clock updating mechanism
  useEffect(() => {
    const updateClock = () => {
      setCurrentTime(
        new Date().toLocaleTimeString("en-US", { 
          hour: "2-digit", 
          minute: "2-digit",
          second: "2-digit",
          hour12: true,
          timeZone: "Asia/Kolkata" 
        })
      );
    };
    updateClock();
    const interval = setInterval(updateClock, 1000);
    return () => clearInterval(interval);
  }, []);

  // COMMAND SYSTEM MENU CONFIGURATION OPTIONS
  const commandItems = [
    { type: "nav", id: "home", label: "Go to Home Section", icon: <FiHome /> },
    { type: "nav", id: "about", label: "Go to About Section", icon: <FiUser /> },
    { type: "nav", id: "experience", label: "Go to Work Experience", icon: <FiBriefcase /> },
    { type: "nav", id: "projects", label: "Go to Selected Projects", icon: <FiFolder /> },
    { type: "nav", id: "contact", label: "Go to Contact Workspace", icon: <FiMail /> },
    { type: "action", action: handleEmailCopy, label: "Copy Email Address to Clipboard", icon: <FaRegEnvelope /> },
    { type: "link", url: "https://github.com/Sambit13", label: "Open GitHub Profile External link", icon: <FaGithub /> },
    { type: "link", url: "https://www.linkedin.com/in/sambit-ranjan-sahoo-b6a722251/", label: "Open LinkedIn Profile External link", icon: <FaLinkedin /> },
    { type: "link", url: "https://leetcode.com/u/Sambit_01/", label: "Open LeetCode Metrics Card", icon: <SiLeetcode /> },
  ];

  const filteredCommands = commandItems.filter(item =>
    item.label.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <div className="min-h-screen bg-zinc-950 text-zinc-300 font-mono selection:bg-emerald-500/30 selection:text-emerald-300 antialiased scroll-smooth">
      
      {/* GLOBAL TOAST ALIGNMENT LAYER */}
      <div className={`fixed top-6 left-1/2 -translate-x-1/2 z-50 px-4 py-2.5 rounded-xl border border-emerald-900/60 bg-zinc-900/90 text-emerald-400 text-xs md:text-sm tracking-wide shadow-2xl transition-all duration-300 backdrop-blur-sm flex items-center gap-2 ${copied ? "opacity-100 translate-y-0 pointer-events-auto" : "opacity-0 -translate-y-4 pointer-events-none"}`}>
        <span>Email copied to clipboard! 📋</span>
      </div>

      {/* ================= PREMIUM INTERACTIVE CTRL+K SEARCH COMMAND PALETTE MENU ================= */}
      <div className={`fixed inset-0 z-50 bg-black/60 backdrop-blur-md flex items-start justify-center pt-24 px-4 transition-all duration-200 ${isCommandOpen ? "opacity-100 pointer-events-auto" : "opacity-0 pointer-events-none"}`}>
        <div className={`w-full max-w-lg border border-zinc-800 bg-zinc-900/95 rounded-2xl overflow-hidden shadow-2xl transition-all duration-300 transform ${isCommandOpen ? "scale-100 translate-y-0" : "scale-95 -translate-y-4"}`}>
          <div className="flex items-center gap-3 px-4 border-b border-zinc-800/80 bg-zinc-950/40">
            <FiSearch className="text-zinc-500 text-lg flex-shrink-0" />
            <input 
              type="text" 
              placeholder="Search or type a shortcut command..." 
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full py-4 bg-transparent border-none text-zinc-100 placeholder-zinc-500 text-sm focus:outline-none focus:ring-0"
              autoFocus={isCommandOpen}
            />
            <span className="text-[10px] bg-zinc-800 border border-zinc-700 px-1.5 py-0.5 rounded text-zinc-400 font-semibold tracking-wider">ESC</span>
          </div>

          <div className="max-h-72 overflow-y-auto p-2 space-y-0.5">
            {filteredCommands.length > 0 ? (
              filteredCommands.map((item, idx) => (
                <button
                  key={idx}
                  onClick={() => {
                    if (item.type === "nav" && item.id) handleSmoothScroll(item.id);
                    if (item.type === "action" && item.action) { item.action(); setIsCommandOpen(false); }
                    if (item.type === "link" && item.url) { window.open(item.url, "_blank"); setIsCommandOpen(false); }
                  }}
                  className="w-full flex items-center justify-between px-3 py-2.5 rounded-xl text-zinc-400 hover:text-zinc-100 hover:bg-zinc-800/60 transition-all text-xs text-left group cursor-pointer"
                >
                  <div className="flex items-center gap-3">
                    <div className="text-zinc-500 group-hover:text-emerald-400 transition-colors">
                      {item.icon}
                    </div>
                    <span>{item.label}</span>
                  </div>
                  <div className="text-[10px] text-zinc-600 font-bold uppercase tracking-wider group-hover:text-zinc-400 transition-colors">
                    {item.type === "nav" ? "Jump" : item.type === "action" ? "Copy" : "Link ↗"}
                  </div>
                </button>
              ))
            ) : (
              <div className="text-center py-8 text-zinc-600 text-xs">
                No shortcut parameters match your query search.
              </div>
            )}
          </div>
          
          <div className="bg-zinc-950/40 border-t border-zinc-800/50 px-4 py-2 text-[10px] text-zinc-500 flex justify-between items-center tracking-wide">
            <span>Use search keywords to sort operations quickly</span>
            <span>⏎ to trigger</span>
          </div>
        </div>
        <div className="absolute inset-0 -z-10" onClick={() => setIsCommandOpen(false)} />
      </div>

      {/* ================= FIXED HEADER NAVIGATION ================= */}
      <header className="fixed top-0 left-0 right-0 z-40 bg-zinc-950/90 backdrop-blur-md border-b border-zinc-900 px-6 py-5">
        <div className="max-w-5xl mx-auto w-full flex items-center justify-between">
          <div className="font-bold text-base tracking-tight text-zinc-100 cursor-pointer">
            Sambit
          </div>
          
          <nav className="hidden md:flex items-center gap-2 text-xs font-semibold tracking-wide">
            <a href="#home" onClick={(e) => { e.preventDefault(); handleSmoothScroll("home"); }} className="px-4 py-2 rounded-full bg-zinc-900 text-zinc-100 border border-zinc-800 shadow-inner">Home</a>
            <a href="#about" onClick={(e) => { e.preventDefault(); handleSmoothScroll("about"); }} className="px-4 py-2 rounded-full text-zinc-400 hover:text-zinc-100 transition-colors">About</a>
            <a href="#experience" onClick={(e) => { e.preventDefault(); handleSmoothScroll("experience"); }} className="px-4 py-2 rounded-full text-zinc-400 hover:text-zinc-100 transition-colors">Experience</a>
            <a href="#projects" onClick={(e) => { e.preventDefault(); handleSmoothScroll("projects"); }} className="px-4 py-2 rounded-full text-zinc-400 hover:text-zinc-100 transition-colors">Projects</a>
            <a href="#contact" onClick={(e) => { e.preventDefault(); handleSmoothScroll("contact"); }} className="px-4 py-2 rounded-full text-zinc-400 hover:text-zinc-100 transition-colors">Contact</a>
          </nav>

          <div 
            onClick={() => setIsCommandOpen(true)}
            className="flex items-center gap-2 px-3 py-2 rounded-lg border border-zinc-800 bg-zinc-900/50 text-xs text-zinc-500 cursor-pointer hover:border-zinc-700 hover:text-zinc-300 transition-colors shadow-inner"
          >
            <FiSearch width="12" height="12" />
            <span>Ctrl K</span>
          </div>
        </div>
      </header>

      {/* ================= MAIN COLUMN CONTENT VIEWPORT ================= */}
      <div className="max-w-5xl mx-auto w-full px-6 pt-24 pb-20 flex flex-col justify-start md:max-w-4xl md:mr-auto md:pl-12 md:pr-24">
        
        {/* ================= HERO INTRO SECTION ================= */}
        <section id="home" className="h-[calc(100vh-90px)] min-h-[520px] flex flex-col justify-center pb-6">
          
          <div className="text-xs md:text-sm tracking-[0.25em] text-zinc-500 mb-4 font-bold uppercase">
            HELLO, I'M
          </div>

          <h1 className="text-4xl sm:text-6xl lg:text-7xl font-bold text-zinc-100 tracking-tight mb-3 leading-none whitespace-normal md:whitespace-nowrap">
            Sambit Ranjan Sahoo
          </h1>

          <div className="flex flex-wrap items-center gap-4 mb-4">
            <h2 className="text-base md:text-xl text-zinc-200 font-medium tracking-wide">
              Full Stack Developer & Packaged App Developer
            </h2>
            <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full border border-emerald-900/40 bg-emerald-950/10 text-[10px] md:text-xs font-bold tracking-wider text-emerald-400 uppercase">
              <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse" />
              Open to opportunities
            </div>
          </div>

          {/* Location and Live Time Zone Strip */}
          <div className="flex flex-wrap items-center gap-x-6 gap-y-3 font-mono text-xs text-zinc-500 uppercase tracking-wider mb-6 border-l border-zinc-800 pl-4">
            <div className="flex items-center gap-2">
              <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0 1 18 0z"></path><circle cx="12" cy="10" r="3"></circle></svg>
              <span>Bhubaneswar, India</span>
            </div>
            <span className="text-zinc-800">/</span>
            <div className="flex items-center gap-2 text-zinc-400">
              <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><circle cx="12" cy="12" r="10"></circle><polyline points="12 6 12 12 16 14"></polyline></svg>
              <span>{currentTime || "12:38:00 AM"} (GMT+5:30)</span>
            </div>
          </div>

          <p className="text-sm md:text-base text-zinc-400 leading-relaxed font-normal max-w-2xl mb-6 tracking-wide">
            I'm a Full Stack Developer passionate about building scalable web applications, AI-powered tools, and modern digital products. **Currently working at Accenture as an Associate Software Engineer (ASE) in the role of a Packaged App Developer.** I enjoy turning complex backends and machine learning workflows into clean, production-ready systems.
          </p>

          {/* Action Button Container */}
          <div className="flex flex-col justify-start">
            <button 
              onClick={(e) => handleSmoothScroll("contact", e)}
              className="group flex items-center gap-4 pl-6 pr-2 py-2.5 rounded-full border border-zinc-800 bg-zinc-900/30 hover:bg-zinc-900/60 hover:border-zinc-700 transition-all duration-300 text-zinc-200 font-semibold text-xs md:text-sm tracking-wider w-fit cursor-pointer"
            >
              <span>Let's work together</span>
              <div className="w-8 h-8 rounded-full bg-blue-500 text-zinc-950 flex items-center justify-center transition-transform duration-300 group-hover:translate-x-0.5 group-hover:-translate-y-0.5">
                <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5"><line x1="7" y1="17" x2="17" y2="7"/><polyline points="7 7 17 7 17 17"/></svg>
              </div>
            </button>

            {/* Micro Social Branding Logos Row */}
            <div className="flex items-center gap-6 text-zinc-500 mt-[22px] pl-2">
              <button 
                onClick={handleEmailCopy}
                className="hover:text-zinc-100 hover:scale-110 transition-all text-xl cursor-pointer"
                title="Copy Email Address"
              >
                <FaRegEnvelope />
              </button>

              <a 
                href="https://github.com/Sambit13" 
                target="_blank" 
                rel="noopener noreferrer" 
                className="hover:text-zinc-100 hover:scale-110 transition-all text-xl"
                title="GitHub Profile"
              >
                <FaGithub />
              </a>

              <a 
                href="https://www.linkedin.com/in/sambit-ranjan-sahoo-b6a722251/" 
                target="_blank" 
                rel="noopener noreferrer" 
                className="hover:text-zinc-100 hover:scale-110 transition-all text-xl"
                title="LinkedIn Profile"
              >
                <FaLinkedin />
              </a>
            </div>
          </div>

        </section>

        {/* LINE BREAK DIVIDER 1 */}
        <div className="w-full h-px bg-zinc-900/80 my-4" />

        {/* ================= 01. ABOUT & TECH STACK ================= */}
        <section id="about" className="py-24">
          <div className="flex items-center gap-4 mb-12">
            <span className="text-4xl md:text-5xl text-zinc-800/80 font-bold tracking-tight">01</span>
            <h3 className="text-3xl md:text-4xl font-bold text-zinc-100 tracking-tight">About</h3>
          </div>

          <div className="text-sm md:text-base text-zinc-400 leading-relaxed max-w-2xl space-y-6 mb-16 tracking-wide">
            <p>
              I'm Sambit Ranjan Sahoo, a Full Stack Developer passionate about building scalable web applications, AI-powered tools, and modern digital products. With experience across the MERN stack, React, Node.js, Express, MongoDB, and emerging AI technologies, I enjoy transforming complex ideas into intuitive and impactful solutions. Over the years, I have developed and deployed numerous projects ranging from EdTech platforms and AI-powered OCR systems to sustainability dashboards and automation tools.
            </p>
            <p>
              My development journey is driven by curiosity, continuous learning, and solving real-world problems through technology. I have participated in hackathons, completed multiple industry internships, and built production-ready applications that focus on performance, scalability, and user experience.
            </p>
          </div>

          {/* DYNAMIC HOVER SKILLS OVERLAY SYSTEM */}
          <h4 className="text-zinc-500 text-xs md:text-sm font-bold uppercase tracking-widest mb-8">// Tech Stack</h4>
          <div className="grid grid-cols-4 sm:grid-cols-6 md:grid-cols-8 gap-4 max-w-2xl">
            {[
              { name: "JavaScript", icon: <FaJsSquare className="w-7 h-7" /> },
              { name: "Python", icon: <FaPython className="w-7 h-7" /> },
              { name: "C++", icon: <SiCplusplus className="w-7 h-7" /> },
              { name: "Java", icon: <FaJava className="w-7 h-7" /> },
              { name: "React.js", icon: <FaReact className="w-7 h-7" /> },
              { name: "HTML5", icon: <FaHtml5 className="w-7 h-7" /> },
              { name: "CSS3", icon: <FaCss3Alt className="w-7 h-7" /> },
              { name: "Tailwind CSS", icon: <SiTailwindcss className="w-7 h-7" /> },
              { name: "Framer Motion", icon: <TbBrandFramerMotion className="w-7 h-7" /> },
              { name: "GSAP / Animation", icon: <TbBinaryTree className="w-7 h-7" /> },
              { name: "React Router", icon: <FaReact className="w-7 h-7 opacity-50" /> },
              { name: "Node.js", icon: <FaNodeJs className="w-7 h-7" /> },
              { name: "Express.js", icon: <SiExpress className="w-7 h-7" /> },
              { name: "REST APIs", icon: <FiCpu className="w-7 h-7" /> },
              { name: "JWT Authentication", icon: <FiCpu className="w-7 h-7 text-emerald-500/70" /> },
              { name: "Role Based Access (RBAC)", icon: <FiCpu className="w-7 h-7 text-blue-500/70" /> },
              { name: "MongoDB", icon: <SiMongodb className="w-7 h-7" /> },
              { name: "Mongoose ODM", icon: <SiMongodb className="w-7 h-7 opacity-50" /> },
              { name: "FastAPI", icon: <SiFastapi className="w-7 h-7" /> },
              { name: "EasyOCR Engine", icon: <FiCpu className="w-7 h-7 text-amber-500/70" /> },
              { name: "TrOCR Vision Models", icon: <FiCpu className="w-7 h-7 text-purple-500/70" /> },
              { name: "Computer Vision Stack", icon: <FiCpu className="w-7 h-7 text-cyan-500/70" /> },
              { name: "Git Engine", icon: <FaGitAlt className="w-7 h-7" /> },
              { name: "GitHub Platform", icon: <FaGithub className="w-7 h-7" /> },
              { name: "Postman Clients", icon: <SiPostman className="w-7 h-7" /> },
              { name: "Cloudinary Spaces", icon: <SiCloudinary className="w-7 h-7" /> },
              { name: "Vercel Systems", icon: <SiVercel className="w-7 h-7" /> },
              { name: "Render Cloud", icon: <SiRender className="w-7 h-7" /> }
            ].map((tech, idx) => (
              <div 
                key={idx}
                className="group relative flex items-center justify-center p-4.5 rounded-xl border border-zinc-900 bg-zinc-900/10 hover:bg-zinc-900/50 hover:border-zinc-800 transition-all duration-200 cursor-help"
              >
                <div className="text-zinc-500 group-hover:text-emerald-400 transition-colors duration-200">
                  {tech.icon}
                </div>
                <div className="absolute bottom-full left-1/2 -translate-x-1/2 mb-2 px-3 py-1.5 rounded bg-black border border-zinc-800 text-zinc-100 font-mono text-[11px] font-medium tracking-wide whitespace-nowrap opacity-0 pointer-events-none transform scale-95 group-hover:opacity-100 group-hover:scale-100 transition-all duration-150 z-50 shadow-2xl">
                  {tech.name}
                  <div className="absolute top-full left-1/2 -translate-x-1/2 border-4 border-transparent border-t-black"></div>
                </div>
              </div>
            ))}
          </div>
        </section>

        {/* LINE BREAK DIVIDER 2 */}
        <div className="w-full h-px bg-zinc-900/80 my-4" />

        {/* ================= 02. WORK EXPERIENCE ================= */}
        <section id="experience" className="py-24">
          <div className="flex items-center gap-4 mb-16">
            <span className="text-4xl md:text-5xl text-zinc-800/80 font-bold tracking-tight">02</span>
            <h3 className="text-3xl md:text-4xl font-bold text-zinc-100 tracking-tight">Experience</h3>
          </div>

          <div className="space-y-16 max-w-2xl">
            {/* CURRENT EXPERIENCES SYNTAX BLOCK */}
            <div className="flex flex-col md:flex-row md:gap-12 border-b border-zinc-900/40 pb-10">
              <div className="text-emerald-500 text-xs md:text-sm font-bold uppercase tracking-wider md:w-1/4 pt-1 mb-3 md:mb-0">
                Current Role
              </div>
              <div className="md:w-3/4">
                <h4 className="text-zinc-100 font-bold text-base md:text-lg">Associate Software Engineer (ASE)</h4>
                <div className="text-zinc-500 text-xs md:text-sm mt-1 mb-4">Accenture | Packaged App Developer</div>
                <p className="text-sm md:text-base text-zinc-400 leading-relaxed mb-4">
                  Currently serving as a Packaged App Developer, configuring, designing, and maximizing enterprise digital architectures and scalable software ecosystem modules.
                </p>
              </div>
            </div>

            <div className="flex flex-col md:flex-row md:gap-12">
              <div className="text-zinc-600 text-xs md:text-sm font-bold uppercase tracking-wider md:w-1/4 pt-1 mb-3 md:mb-0">
                Aug 2023 - Sept 2023
              </div>
              <div className="md:w-3/4">
                <h4 className="text-zinc-100 font-bold text-base md:text-lg">Web Development Intern</h4>
                <div className="text-zinc-500 text-xs md:text-sm mt-1 mb-4">Bharat Intern | Remote</div>
                <p className="text-sm md:text-base text-zinc-400 leading-relaxed mb-4">
                  Worked on industry-oriented web development projects, focusing on responsive user interfaces, component-based architecture, and modern frontend development practices.
                </p>
                <ul className="text-xs md:text-sm text-zinc-500 space-y-2.5 list-disc list-inside leading-relaxed pl-1">
                  <li>Developed responsive web applications using HTML, CSS, JavaScript, and React.</li>
                  <li>Improved UI consistency and user experience across multiple projects.</li>
                  <li>Collaborated on real-world development tasks and project deployments.</li>
                </ul>
              </div>
            </div>

            <div className="flex flex-col md:flex-row md:gap-12">
              <div className="text-zinc-600 text-xs md:text-sm font-bold uppercase tracking-wider md:w-1/4 pt-1 mb-3 md:mb-0">
                Virtual Experience
              </div>
              <div className="md:w-3/4">
                <h4 className="text-zinc-100 font-bold text-base md:text-lg">Web Development Intern</h4>
                <div className="text-zinc-500 text-xs md:text-sm mt-1 mb-4">Prodigy InfoTech | Remote</div>
                <p className="text-sm md:text-base text-zinc-400 leading-relaxed mb-4">
                  Contributed to multiple web development projects while strengthening practical knowledge of frontend and full-stack development.
                </p>
                <ul className="text-xs md:text-sm text-zinc-500 space-y-2.5 list-disc list-inside leading-relaxed pl-1">
                  <li>Built interactive web applications and reusable components.</li>
                  <li>Worked on responsive layouts and optimized user interfaces.</li>
                  <li>Applied modern development workflows and version control practices.</li>
                </ul>
              </div>
            </div>
          </div>
        </section>

        {/* LINE BREAK DIVIDER 3 */}
        <div className="w-full h-px bg-zinc-900/80 my-4" />

        {/* ================= 03. SELECTED PROJECTS ================= */}
        <section id="projects" className="py-24">
          <div className="flex items-center gap-4 mb-16">
            <span className="text-4xl md:text-5xl text-zinc-800/80 font-bold tracking-tight">03</span>
            <h3 className="text-3xl md:text-4xl font-bold text-zinc-100 tracking-tight">Selected Projects</h3>
          </div>

          <div className="space-y-24 max-w-2xl">
            {/* Project 1 */}
            <div className="border-l-2 border-zinc-900 pl-6 space-y-5">
              <span className="text-xs text-zinc-600 font-bold uppercase tracking-wider">01 / Computer Vision AI</span>
              <h4 className="text-lg md:text-xl text-zinc-100 font-bold tracking-tight">Hybrid OCR AI</h4>
              <p className="text-sm md:text-base text-zinc-400 leading-relaxed">
                An intelligent OCR platform for multi-format text recognition. Extracts and analyzes text from printed documents, handwritten notes, Braille patterns, and Morse code combining EasyOCR and TrOCR models with a React + FastAPI architecture.
              </p>
              
              <div className="flex flex-wrap items-center gap-x-4 gap-y-2 pt-2">
                <span className="text-zinc-600 text-xs font-semibold uppercase tracking-wider">Technologies:</span>
                <div className="flex items-center gap-1.5 px-2.5 py-1 rounded-lg bg-zinc-900/40 border border-zinc-900 font-mono text-xs text-zinc-300">
                  <FaReact className="w-3.5 h-3.5 text-blue-400" /> <span>React</span>
                </div>
                <div className="flex items-center gap-1.5 px-2.5 py-1 rounded-lg bg-zinc-900/40 border border-zinc-900 font-mono text-xs text-zinc-300">
                  <SiFastapi className="w-3.5 h-3.5 text-emerald-400" /> <span>FastAPI</span>
                </div>
                <div className="flex items-center gap-1.5 px-2.5 py-1 rounded-lg bg-zinc-900/40 border border-zinc-900 font-mono text-xs text-zinc-300">
                  <FaPython className="w-3.5 h-3.5 text-amber-400" /> <span>Python</span>
                </div>
                <div className="flex items-center gap-1.5 px-2.5 py-1 rounded-lg bg-zinc-900/40 border border-zinc-900 font-mono text-xs text-zinc-300">
                  <FiCpu className="w-3.5 h-3.5 text-purple-400" /> <span>TrOCR</span>
                </div>
              </div>

              <div className="flex items-center gap-4 text-xs md:text-sm pt-2">
                <a href="https://github.com/Sambit13/Hybrid-OCR-AI" target="_blank" rel="noopener noreferrer" className="text-blue-400 font-medium hover:underline">GitHub Workspace ↗</a>
              </div>
            </div>

            {/* Project 2 */}
            <div className="border-l-2 border-zinc-900 pl-6 space-y-5">
              <span className="text-xs text-zinc-600 font-bold uppercase tracking-wider">02 / Full Stack EdTech</span>
              <h4 className="text-lg md:text-xl text-zinc-100 font-bold tracking-tight">StudyNotion Platform</h4>
              <p className="text-sm md:text-base text-zinc-400 leading-relaxed">
                Full-stack learning architecture enabling robust course management workflows. Engineered role-based access controls (RBAC) across student, instructor, and admin profiles backed completely by a React, Node, Express, and MongoDB matrix with secure payment processing modules.
              </p>
              
              <div className="flex flex-wrap items-center gap-x-4 gap-y-2 pt-2">
                <span className="text-zinc-600 text-xs font-semibold uppercase tracking-wider">Technologies:</span>
                <div className="flex items-center gap-1.5 px-2.5 py-1 rounded-lg bg-zinc-900/40 border border-zinc-900 font-mono text-xs text-zinc-300">
                  <FaReact className="w-3.5 h-3.5 text-blue-400" /> <span>React</span>
                </div>
                <div className="flex items-center gap-1.5 px-2.5 py-1 rounded-lg bg-zinc-900/40 border border-zinc-900 font-mono text-xs text-zinc-300">
                  <FaNodeJs className="w-3.5 h-3.5 text-emerald-500" /> <span>Node.js</span>
                </div>
                <div className="flex items-center gap-1.5 px-2.5 py-1 rounded-lg bg-zinc-900/40 border border-zinc-900 font-mono text-xs text-zinc-300">
                  <SiExpress className="w-3.5 h-3.5 text-zinc-400" /> <span>Express</span>
                </div>
                <div className="flex items-center gap-1.5 px-2.5 py-1 rounded-lg bg-zinc-900/40 border border-zinc-900 font-mono text-xs text-green-500">
                  <SiMongodb className="w-3.5 h-3.5" /> <span>MongoDB</span>
                </div>
              </div>

              <div className="flex items-center gap-4 text-sm pt-2">
                <a href="https://github.com/Sambit13/StudyNotion-EdTech-learning-platform" target="_blank" rel="noopener noreferrer" className="text-blue-400 font-medium hover:underline">GitHub Workspace ↗</a>
              </div>
            </div>

            {/* Project 3 */}
            <div className="border-l-2 border-zinc-900 pl-6 space-y-5">
              <span className="text-xs text-zinc-600 font-bold uppercase tracking-wider">03 / Generative Automation</span>
              <h4 className="text-lg md:text-xl text-zinc-100 font-bold tracking-tight">TechSpark Builder</h4>
              <p className="text-sm md:text-base text-zinc-400 leading-relaxed">
                AI-powered website generation platform automating text-to-code creation sequences. Empowers users to produce and review fully editable React components and layout systems instantly via natural language prompting.
              </p>
              
              <div className="flex flex-wrap items-center gap-x-4 gap-y-2 pt-2">
                <span className="text-zinc-600 text-xs font-semibold uppercase tracking-wider">Technologies:</span>
                <div className="flex items-center gap-1.5 px-2.5 py-1 rounded-lg bg-zinc-900/40 border border-zinc-900 font-mono text-xs text-zinc-300">
                  <FaReact className="w-3.5 h-3.5 text-blue-400" /> <span>Next.js</span>
                </div>
                <div className="flex items-center gap-1.5 px-2.5 py-1 rounded-lg bg-zinc-900/40 border border-zinc-900 font-mono text-xs text-zinc-300">
                  <FiCpu className="w-3.5 h-3.5 text-purple-400" /> <span>AI APIs</span>
                </div>
                <div className="flex items-center gap-1.5 px-2.5 py-1 rounded-lg bg-zinc-900/40 border border-zinc-900 font-mono text-xs text-zinc-300">
                  <SiTailwindcss className="w-3.5 h-3.5 text-cyan-400" /> <span>Tailwind</span>
                </div>
              </div>

              <div className="flex items-center gap-4 text-sm pt-2">
                <a href="https://github.com/Sambit13/techSpark" target="_blank" rel="noopener noreferrer" className="text-blue-400 font-medium hover:underline">GitHub Workspace ↗</a>
              </div>
            </div>

            {/* Project 4 */}
            <div className="border-l-2 border-zinc-900 pl-6 space-y-5">
              <span className="text-xs text-zinc-600 font-bold uppercase tracking-wider">04 / Environmental Analytics</span>
              <h4 className="text-lg md:text-xl text-zinc-100 font-bold tracking-tight">Sustainability Dashboard</h4>
              <p className="text-sm md:text-base text-zinc-400 leading-relaxed">
                Interactive metrics visualization panel aligned with climate action goals (SDG 13 & 15). Built clean animated graphs tracking analytics datasets cleanly with micro-layout adjustments.
              </p>
              
              <div className="flex flex-wrap items-center gap-x-4 gap-y-2 pt-2">
                <span className="text-zinc-600 text-xs font-semibold uppercase tracking-wider">Technologies:</span>
                <div className="flex items-center gap-1.5 px-2.5 py-1 rounded-lg bg-zinc-900/40 border border-zinc-900 font-mono text-xs text-zinc-300">
                  <FaReact className="w-3.5 h-3.5 text-blue-400" /> <span>React.js</span>
                </div>
                <div className="flex items-center gap-1.5 px-2.5 py-1 rounded-lg bg-zinc-900/40 border border-zinc-900 font-mono text-xs text-zinc-300">
                  <FaJsSquare className="w-3.5 h-3.5 text-amber-400" /> <span>JavaScript</span>
                </div>
                <div className="flex items-center gap-1.5 px-2.5 py-1 rounded-lg bg-zinc-900/40 border border-zinc-900 font-mono text-xs text-zinc-300">
                  <FiCpu className="w-3.5 h-3.5 text-red-400" /> <span>Charts API</span>
                </div>
              </div>
              <div className="flex items-center gap-4 text-xs md:text-sm pt-2">
                <a href="https://github.com/Sambit13/Sustainability-Dashboard" target="_blank" rel="noopener noreferrer" className="text-blue-400 font-medium hover:underline">GitHub Workspace ↗</a>
              </div>
            </div>

            {/* Project 5 */}
            <div className="border-l-2 border-zinc-900 pl-6 space-y-5">
              <span className="text-xs text-zinc-600 font-bold uppercase tracking-wider">05 / Entertainment Systems</span>
              <h4 className="text-lg md:text-xl text-zinc-100 font-bold tracking-tight">Sonu's Movies</h4>
              <p className="text-sm md:text-base text-zinc-400 leading-relaxed">
                A dynamic discovery engine mapping media info pipelines seamlessly. Integrates infinite scrolling recommendation hooks across a responsive frontend UI configuration.
              </p>
              
              <div className="flex flex-wrap items-center gap-x-4 gap-y-2 pt-2">
                <span className="text-zinc-600 text-xs font-semibold uppercase tracking-wider">Technologies:</span>
                <div className="flex items-center gap-1.5 px-2.5 py-1 rounded-lg bg-zinc-900/40 border border-zinc-900 font-mono text-xs text-zinc-300">
                  <FaReact className="w-3.5 h-3.5 text-blue-400" /> <span>React.js</span>
                </div>
                <div className="flex items-center gap-1.5 px-2.5 py-1 rounded-lg bg-zinc-900/40 border border-zinc-900 font-mono text-xs text-zinc-300">
                  <FiCpu className="w-3.5 h-3.5 text-cyan-400" /> <span>TMDB API</span>
                </div>
                <div className="flex items-center gap-1.5 px-2.5 py-1 rounded-lg bg-zinc-900/40 border border-zinc-900 font-mono text-xs text-zinc-300">
                  <SiTailwindcss className="w-3.5 h-3.5 text-teal-400" /> <span>Tailwind</span>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* LINE BREAK DIVIDER 4 */}
        <div className="w-full h-px bg-zinc-900/80 my-4" />

        {/* ================= 04. CONNECT WITH ME ================= */}
        <section id="contact" className="py-24">
          <div className="flex items-center gap-4 mb-12">
            <span className="text-4xl md:text-5xl text-zinc-800/80 font-bold tracking-tight">04</span>
            <h3 className="text-3xl md:text-4xl font-bold text-zinc-100 tracking-tight">Contact</h3>
          </div>

          <div className="w-full rounded-2xl border border-zinc-800 bg-zinc-900/10 p-8 md:p-10 mb-16 max-w-2xl relative overflow-hidden shadow-2xl">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-blue-950/20 border border-blue-900/40 text-xs text-blue-400 font-bold uppercase tracking-widest mb-6">
              ● AVAILABLE FOR INTERNSHIPS & ROLES
            </div>
            <h4 className="text-2xl md:text-3xl text-zinc-100 tracking-tight font-bold mb-4">
              You've scrolled this far... why not say hi? 👋
            </h4>
            <p className="text-sm md:text-base text-zinc-400 leading-relaxed mb-8 max-w-xl">
              I'm always interested in hearing about new projects, software architectures, or collaborations. Let's link up over code.
            </p>
            
            <button 
              onClick={handleEmailCopy}
              className="inline-flex items-center gap-2 px-6 py-3 bg-blue-500 text-zinc-950 rounded-xl font-bold text-sm tracking-wider hover:bg-blue-400 transition-colors shadow-xl cursor-pointer"
            >
              Let's chat ☕
            </button>
          </div>

          {/* CONNECT WITH ME BOX GRID SECTOR */}
          <div className="w-full mb-12 max-w-3xl">
            <div className="flex items-center gap-3 text-zinc-500 text-xs font-bold uppercase tracking-widest mb-6">
              <span className="h-4 w-0.5 bg-zinc-800 inline-block" /> Connect With Me
            </div>
            
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 max-w-2xl">
              <button 
                onClick={handleEmailCopy}
                className="group flex items-center justify-between p-4 rounded-xl border border-zinc-900 bg-zinc-950 hover:border-zinc-800 hover:bg-zinc-900/10 transition-all duration-300 text-left w-full cursor-pointer"
              >
                <div className="flex items-center gap-4">
                  <div className="p-3 rounded-xl bg-zinc-900/50 text-zinc-400 group-hover:text-zinc-200 transition-colors">
                    <FaRegEnvelope className="w-5 h-5" />
                  </div>
                  <div>
                    <span className="block text-zinc-100 font-bold text-sm tracking-tight">Email</span>
                    <span className="block text-zinc-500 text-xs mt-0.5">sambitranjan0123@gmail.com</span>
                  </div>
                </div>
                <TbArrowUpRight className="w-5 h-5 text-zinc-700 group-hover:text-zinc-400 group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-all" />
              </button>

              <a 
                href="https://github.com/Sambit13"
                target="_blank"
                rel="noopener noreferrer"
                className="group flex items-center justify-between p-4 rounded-xl border border-zinc-900 bg-zinc-950 hover:border-zinc-800 hover:bg-zinc-900/10 transition-all duration-300"
              >
                <div className="flex items-center gap-4">
                  <div className="p-3 rounded-xl bg-zinc-900/50 text-zinc-400 group-hover:text-zinc-200 transition-colors">
                    <FaGithub className="w-5 h-5" />
                  </div>
                  <div>
                    <span className="block text-zinc-100 font-bold text-sm tracking-tight">GitHub</span>
                    <span className="block text-zinc-500 text-xs mt-0.5">Sambit13</span>
                  </div>
                </div>
                <TbArrowUpRight className="w-5 h-5 text-zinc-700 group-hover:text-zinc-400 group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-all" />
              </a>

              <a 
                href="https://www.linkedin.com/in/sambit-ranjan-sahoo-b6a722251/"
                target="_blank"
                rel="noopener noreferrer"
                className="group flex items-center justify-between p-4 rounded-xl border border-zinc-900 bg-zinc-950 hover:border-zinc-800 hover:bg-zinc-900/10 transition-all duration-300"
              >
                <div className="flex items-center gap-4">
                  <div className="p-3 rounded-xl bg-zinc-900/50 text-zinc-400 group-hover:text-zinc-200 transition-colors">
                    <FaLinkedin className="w-5 h-5" />
                  </div>
                  <div>
                    <span className="block text-zinc-100 font-bold text-sm tracking-tight">LinkedIn</span>
                    <span className="block text-zinc-500 text-xs mt-0.5">Sambit Ranjan Sahoo</span>
                  </div>
                </div>
                <TbArrowUpRight className="w-5 h-5 text-zinc-700 group-hover:text-zinc-400 group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-all" />
              </a>

              <a 
                href="https://leetcode.com/u/Sambit_01/"
                target="_blank"
                rel="noopener noreferrer"
                className="group flex items-center justify-between p-4 rounded-xl border border-zinc-900 bg-zinc-950 hover:border-zinc-800 hover:bg-zinc-900/10 transition-all duration-300"
              >
                <div className="flex items-center gap-4">
                  <div className="p-3 rounded-xl bg-zinc-900/50 text-zinc-400 group-hover:text-zinc-200 transition-colors">
                    <SiLeetcode className="w-5 h-5" />
                  </div>
                  <div>
                    <span className="block text-zinc-100 font-bold text-sm tracking-tight">LeetCode</span>
                    <span className="block text-zinc-500 text-xs mt-0.5">Sambit_01</span>
                  </div>
                </div>
                <TbArrowUpRight className="w-5 h-5 text-zinc-700 group-hover:text-zinc-400 group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-all" />
              </a>
            </div>
          </div>

          {/* LOWER RUNNING INDICATORS */}
          <div className="w-full flex flex-wrap items-center gap-x-12 gap-y-3 text-zinc-600 text-xs pt-6 border-t border-zinc-900/40 max-w-2xl">
            <div>
              <span className="text-zinc-700 font-bold uppercase tracking-wider text-[9px] block mb-1">Backup Location</span>
              <span className="text-zinc-500 text-xs md:text-sm">Bhubaneswar, Odisha, India</span>
            </div>
            <div>
              <span className="text-zinc-700 font-bold uppercase tracking-wider text-[9px] block mb-1">System Time Sync</span>
              <span className="text-zinc-500 text-xs md:text-sm">
                {currentTime || "12:38:00 AM"} | Active
              </span>
            </div>
          </div>
        </section>
      </div>

      {/* ================= BACKGROUND COMPANION DOG VIEWPORT ================= */}
      <PetCompanion />

    </div>
  );
}