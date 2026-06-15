"use client";

import Reveal from "@/components/animations/Reveal";
import { useEffect, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/dist/ScrollTrigger";

const experiences = [
  {
    company: "Amazing Indian Stories (AIS)",
    role: "React.js Developer",
    date: "2024 - Present",
    points: [
      "Led React.js frontend development focusing on highly interactive user interfaces.",
      "Integrated complex REST APIs to build robust user profiles and dynamic dashboards.",
      "Developed a custom hiring workflow that reduced processing time by 40%.",
    ]
  },
  {
    company: "BIO-ONN HEALTH CARE",
    role: "Web Developer",
    date: "2023 - 2024",
    points: [
      "Optimized WordPress architecture for blazing fast load times.",
      "Implemented comprehensive SEO strategies leading to 3x organic traffic growth.",
      "Enhanced overall site performance and accessibility scores to 95+ on Lighthouse.",
    ]
  },
  {
    company: "Slytherin Edu Pvt Ltd",
    role: "React Developer & Team Lead",
    date: "2022 - 2023",
    points: [
      "Spearheaded React development for ed-tech platforms.",
      "Led a team of 4 junior developers, conducting code reviews and mentoring.",
      "Seamlessly integrated third-party APIs for payment gateways and video streaming.",
    ]
  }
];

export default function Experience() {
  const lineRef = useRef<HTMLDivElement>(null);
  
  useEffect(() => {
    gsap.registerPlugin(ScrollTrigger);
    
    if (lineRef.current) {
      gsap.fromTo(lineRef.current,
        { scaleY: 0 },
        {
          scaleY: 1,
          ease: "none",
          scrollTrigger: {
            trigger: lineRef.current.parentElement,
            start: "top center",
            end: "bottom center",
            scrub: 0.5,
          }
        }
      );
    }
  }, []);

  return (
    <section id="experience" className="py-32 relative">
      <div className="container mx-auto px-6 max-w-5xl">
        <Reveal>
          <div className="mb-20 text-center">
            <h2 className="text-sm tracking-widest text-cyan-400 uppercase font-semibold mb-2">Career</h2>
            <h3 className="text-4xl md:text-5xl font-bold font-[family-name:var(--font-space-grotesk)]">
              Professional Timeline.
            </h3>
          </div>
        </Reveal>

        <div className="relative">
          {/* Central Line */}
          <div className="absolute left-0 md:left-1/2 top-0 bottom-0 w-px bg-white/10 -translate-x-1/2">
            <div ref={lineRef} className="w-full h-full bg-gradient-to-b from-cyan-400 via-blue-500 to-purple-500 origin-top"></div>
          </div>

          <div className="space-y-16">
            {experiences.map((exp, idx) => {
              const isEven = idx % 2 === 0;
              return (
                <div key={idx} className={`relative flex flex-col md:flex-row items-center justify-between w-full ${isEven ? 'md:flex-row-reverse' : ''}`}>
                  
                  {/* Marker */}
                  <div className="absolute left-0 md:left-1/2 w-8 h-8 rounded-full bg-black border-2 border-cyan-400 -translate-x-1/2 flex items-center justify-center z-10 shadow-[0_0_15px_rgba(6,182,212,0.5)]">
                    <div className="w-2 h-2 rounded-full bg-cyan-400"></div>
                  </div>

                  {/* Content Card */}
                  <div className={`w-full md:w-[45%] pl-12 md:pl-0 ${isEven ? 'md:pl-12' : 'md:pr-12'}`}>
                    <Reveal delay={0.2}>
                      <div className="glass-card rounded-2xl p-8 hover:border-white/20 transition-colors">
                        <span className="text-sm font-mono text-cyan-400 mb-2 block">{exp.date}</span>
                        <h4 className="text-2xl font-bold text-white mb-1 font-[family-name:var(--font-space-grotesk)]">{exp.role}</h4>
                        <h5 className="text-lg font-medium text-gray-400 mb-6">{exp.company}</h5>
                        <ul className="space-y-3">
                          {exp.points.map((point, i) => (
                            <li key={i} className="text-gray-300 text-sm flex gap-3">
                              <span className="text-cyan-400 mt-1">▹</span>
                              <span className="leading-relaxed">{point}</span>
                            </li>
                          ))}
                        </ul>
                      </div>
                    </Reveal>
                  </div>
                  
                  {/* Empty space for flex alignment */}
                  <div className="hidden md:block w-[45%]"></div>
                </div>
              );
            })}
          </div>
        </div>
      </div>
    </section>
  );
}
