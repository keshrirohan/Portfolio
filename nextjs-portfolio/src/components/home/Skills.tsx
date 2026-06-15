"use client";

import Reveal from "@/components/animations/Reveal";

const skillCategories = [
  {
    title: "Frontend",
    skills: [
      { name: "React.js", level: 90 },
      { name: "Next.js", level: 85 },
      { name: "TypeScript", level: 80 },
      { name: "Tailwind CSS", level: 95 },
      { name: "GSAP", level: 75 },
    ]
  },
  {
    title: "Backend",
    skills: [
      { name: "Node.js", level: 85 },
      { name: "Express.js", level: 90 },
      { name: "REST APIs", level: 95 },
      { name: "GraphQL", level: 70 },
      { name: "WebRTC", level: 65 },
    ]
  },
  {
    title: "Database & Tools",
    skills: [
      { name: "MongoDB", level: 90 },
      { name: "PostgreSQL", level: 75 },
      { name: "Docker", level: 70 },
      { name: "AWS", level: 65 },
      { name: "Git/GitHub", level: 90 },
    ]
  },
  {
    title: "Core Concepts",
    skills: [
      { name: "System Design", level: 80 },
      { name: "Data Structures", level: 85 },
      { name: "Algorithms", level: 80 },
      { name: "OOP", level: 90 },
      { name: "Microservices", level: 70 },
    ]
  }
];

export default function Skills() {
  return (
    <section id="skills" className="py-32 relative bg-black/50">
      <div className="container mx-auto px-6">
        <Reveal>
          <div className="mb-16 text-center">
            <h2 className="text-sm tracking-widest text-cyan-400 uppercase font-semibold mb-2">Capabilities</h2>
            <h3 className="text-4xl md:text-5xl font-bold font-[family-name:var(--font-space-grotesk)]">
              Technical Arsenal.
            </h3>
          </div>
        </Reveal>

        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
          {skillCategories.map((category, idx) => (
            <Reveal key={category.title} delay={idx * 0.15}>
              <div className="glass-card rounded-2xl p-8 h-full hover:border-cyan-500/30 transition-colors duration-500 group">
                <h4 className="text-xl font-bold text-white mb-6 font-[family-name:var(--font-space-grotesk)] flex items-center gap-3">
                  <span className="w-8 h-8 rounded-lg bg-white/10 flex items-center justify-center text-sm group-hover:bg-cyan-500/20 group-hover:text-cyan-400 transition-colors">
                    {idx + 1}
                  </span>
                  {category.title}
                </h4>
                
                <div className="space-y-6">
                  {category.skills.map((skill) => (
                    <div key={skill.name}>
                      <div className="flex justify-between text-sm mb-2">
                        <span className="text-gray-300 font-medium">{skill.name}</span>
                        <span className="text-cyan-400/80">{skill.level}%</span>
                      </div>
                      <div className="h-1.5 w-full bg-white/10 rounded-full overflow-hidden">
                        <div 
                          className="h-full bg-gradient-to-r from-cyan-400 to-blue-500 rounded-full"
                          style={{ width: `${skill.level}%` }}
                        ></div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}
