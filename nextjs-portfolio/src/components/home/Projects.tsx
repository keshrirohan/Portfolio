"use client";

import Reveal from "@/components/animations/Reveal";
import Image from "next/image";

const projects = [
  {
    title: "EchoHire AI",
    tagline: "AI-Powered Interview Platform",
    description: "An intelligent interview preparation platform that uses Gemini API to generate contextual questions, analyze responses in real-time, and provide actionable performance metrics.",
    tech: ["Next.js", "Node.js", "MongoDB", "Gemini API", "Tailwind CSS"],
    github: "https://github.com/keshrirohan",
    live: "https://rohankeshri.dev", // Placeholder
    featured: true,
  },
  {
    title: "AthletiQ",
    tagline: "Sports Event Management",
    description: "Comprehensive management system for sports events featuring real-time athlete tracking using MediaPipe, automated scheduling algorithms, and a responsive administrative dashboard.",
    tech: ["React.js", "Express.js", "MongoDB", "MediaPipe", "Socket.io"],
    github: "https://github.com/keshrirohan",
    live: "https://rohankeshri.dev", // Placeholder
    featured: true,
  }
];

export default function Projects() {
  return (
    <section id="projects" className="py-32 relative bg-black/50">
      <div className="container mx-auto px-6">
        <Reveal>
          <div className="mb-20 text-center">
            <h2 className="text-sm tracking-widest text-cyan-400 uppercase font-semibold mb-2">Portfolio</h2>
            <h3 className="text-4xl md:text-5xl font-bold font-[family-name:var(--font-space-grotesk)]">
              Featured Works.
            </h3>
          </div>
        </Reveal>

        <div className="space-y-32">
          {projects.map((project, idx) => {
            const isEven = idx % 2 === 0;
            return (
              <Reveal key={project.title} delay={0.2}>
                <div className={`flex flex-col ${isEven ? 'lg:flex-row' : 'lg:flex-row-reverse'} gap-12 items-center group`}>
                  
                  {/* Image Mockup */}
                  <div className="w-full lg:w-3/5 relative">
                    <div className="relative w-full aspect-video rounded-2xl overflow-hidden glass-card p-2 transform transition-transform duration-500 group-hover:scale-[1.02]">
                      <div className="w-full h-full bg-gray-900 rounded-xl overflow-hidden relative border border-white/5 flex items-center justify-center">
                        {/* Placeholder for project image */}
                        <div className="absolute inset-0 bg-gradient-to-br from-cyan-900/40 to-purple-900/40 opacity-50"></div>
                        <div className="text-6xl font-bold text-white/20 font-[family-name:var(--font-space-grotesk)]">{project.title}</div>
                      </div>
                    </div>
                  </div>

                  {/* Content */}
                  <div className={`w-full lg:w-2/5 ${isEven ? 'lg:text-left' : 'lg:text-right'}`}>
                    <div className="mb-6">
                      <span className="text-cyan-400 font-mono text-sm mb-2 block">Featured Project</span>
                      <h4 className="text-3xl font-bold text-white mb-4 font-[family-name:var(--font-space-grotesk)] hover:text-cyan-400 transition-colors cursor-pointer">
                        {project.title}
                      </h4>
                      <div className={`glass-card p-6 rounded-2xl relative z-10 ${isEven ? 'lg:-ml-12' : 'lg:-mr-12'}`}>
                        <p className="text-gray-300 leading-relaxed text-sm">
                          {project.description}
                        </p>
                      </div>
                    </div>

                    <ul className={`flex flex-wrap gap-4 mb-8 text-sm font-mono text-gray-400 ${isEven ? 'justify-start' : 'justify-end'}`}>
                      {project.tech.map(tech => (
                        <li key={tech}>{tech}</li>
                      ))}
                    </ul>

                    <div className={`flex gap-6 ${isEven ? 'justify-start' : 'justify-end'}`}>
                      <a href={project.github} target="_blank" rel="noopener noreferrer" className="text-white hover:text-cyan-400 transition-colors interactive">
                        <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M9 19c-5 1.5-5-2.5-7-3m14 6v-3.87a3.37 3.37 0 0 0-.94-2.61c3.14-.35 6.44-1.54 6.44-7A5.44 5.44 0 0 0 20 4.77 5.07 5.07 0 0 0 19.91 1S18.73.65 16 2.48a13.38 13.38 0 0 0-7 0C6.27.65 5.09 1 5.09 1A5.07 5.07 0 0 0 5 4.77a5.44 5.44 0 0 0-1.5 3.78c0 5.42 3.3 6.61 6.44 7A3.37 3.37 0 0 0 9 18.13V22"></path></svg>
                      </a>
                      <a href={project.live} target="_blank" rel="noopener noreferrer" className="text-white hover:text-cyan-400 transition-colors interactive">
                        <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M18 13v6a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2h6"></path><polyline points="15 3 21 3 21 9"></polyline><line x1="10" y1="14" x2="21" y2="3"></line></svg>
                      </a>
                    </div>
                  </div>

                </div>
              </Reveal>
            );
          })}
        </div>
      </div>
    </section>
  );
}
