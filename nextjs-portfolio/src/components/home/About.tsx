"use client";

import Reveal from "@/components/animations/Reveal";
import { useEffect, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/dist/ScrollTrigger";

export default function About() {
  const countersRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    gsap.registerPlugin(ScrollTrigger);
    
    if (countersRef.current) {
      const counters = countersRef.current.querySelectorAll('.counter-val');
      
      ScrollTrigger.create({
        trigger: countersRef.current,
        start: "top 80%",
        onEnter: () => {
          counters.forEach((counter) => {
            const target = parseFloat(counter.getAttribute('data-target') || '0');
            gsap.to(counter, {
              innerHTML: target,
              duration: 2,
              ease: "power2.out",
              snap: { innerHTML: 1 },
              onUpdate: function() {
                counter.innerHTML = Math.ceil(Number(this.targets()[0].innerHTML)) + "+";
              }
            });
          });
        },
        once: true
      });
    }
  }, []);

  return (
    <section id="about" className="py-32 relative">
      <div className="container mx-auto px-6">
        <Reveal>
          <div className="mb-16">
            <h2 className="text-sm tracking-widest text-cyan-400 uppercase font-semibold mb-2">About Me</h2>
            <h3 className="text-4xl md:text-5xl font-bold font-[family-name:var(--font-space-grotesk)]">
              Developer Journey.
            </h3>
          </div>
        </Reveal>

        <div className="grid lg:grid-cols-2 gap-16">
          <Reveal delay={0.2}>
            <div className="space-y-6 text-gray-300 text-lg leading-relaxed">
              <p>
                I am an undergraduate pursuing a B.Tech in Computer Science & Engineering at Invertis University, maintaining a CGPA of 7.9. My journey began with a curiosity about how the web works, which quickly evolved into a passion for building scalable full-stack applications.
              </p>
              <p>
                As a MERN Stack developer, I specialize in creating robust REST APIs, modern UI/UX with Next.js and Tailwind, and integrating AI features. I focus heavily on System Design to ensure my applications can scale elegantly.
              </p>
              <div className="pt-6 border-t border-white/10 mt-8">
                <h4 className="text-white font-bold text-xl mb-4">Core Focus</h4>
                <ul className="space-y-3">
                  <li className="flex items-center gap-3">
                    <div className="w-2 h-2 rounded-full bg-cyan-400"></div>
                    Full Stack Web Architecture
                  </li>
                  <li className="flex items-center gap-3">
                    <div className="w-2 h-2 rounded-full bg-purple-500"></div>
                    AI & LLM Integration
                  </li>
                  <li className="flex items-center gap-3">
                    <div className="w-2 h-2 rounded-full bg-blue-500"></div>
                    Performance & SEO Optimization
                  </li>
                </ul>
              </div>
            </div>
          </Reveal>

          <Reveal delay={0.4}>
            <div className="grid grid-cols-2 gap-6" ref={countersRef}>
              {[
                { label: "Projects Built", target: 20 },
                { label: "Tech Mastered", target: 15 },
                { label: "Internships", target: 3 },
                { label: "Certifications", target: 10 },
              ].map((stat, i) => (
                <div key={i} className="glass-card rounded-2xl p-8 flex flex-col justify-center items-center text-center interactive hover:-translate-y-2 transition-transform duration-300">
                  <div 
                    className="counter-val text-4xl md:text-5xl font-bold font-[family-name:var(--font-space-grotesk)] text-transparent bg-clip-text bg-gradient-to-br from-white to-gray-500 mb-2"
                    data-target={stat.target}
                  >
                    0
                  </div>
                  <div className="text-sm text-gray-400 font-medium uppercase tracking-wider">{stat.label}</div>
                </div>
              ))}
            </div>
          </Reveal>
        </div>
      </div>
    </section>
  );
}
