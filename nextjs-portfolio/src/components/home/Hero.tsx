"use client";

import { useEffect, useRef } from "react";
import gsap from "gsap";
import Particles from "react-tsparticles";
import { loadSlim } from "tsparticles-slim";
import type { Engine } from "tsparticles-engine";
import Reveal from "@/components/animations/Reveal";
import Link from "next/link";

export default function Hero() {
  const roles = [
    "Software Engineer",
    "Full Stack Developer",
    "React Developer",
    "Next.js Developer",
    "Problem Solver",
    "MERN Stack Developer",
  ];

  const typeWriterRef = useRef<HTMLSpanElement>(null);

  useEffect(() => {
    let currentRoleIndex = 0;
    let currentCharIndex = 0;
    let isDeleting = false;
    let typingSpeed = 100;
    let timeoutId: NodeJS.Timeout;

    const type = () => {
      if (!typeWriterRef.current) return;
      
      const currentRole = roles[currentRoleIndex];
      
      if (isDeleting) {
        typeWriterRef.current.textContent = currentRole.substring(0, currentCharIndex - 1);
        currentCharIndex--;
        typingSpeed = 50;
      } else {
        typeWriterRef.current.textContent = currentRole.substring(0, currentCharIndex + 1);
        currentCharIndex++;
        typingSpeed = 100;
      }

      if (!isDeleting && currentCharIndex === currentRole.length) {
        isDeleting = true;
        typingSpeed = 1500; // Pause at end
      } else if (isDeleting && currentCharIndex === 0) {
        isDeleting = false;
        currentRoleIndex = (currentRoleIndex + 1) % roles.length;
        typingSpeed = 500; // Pause before new word
      }

      timeoutId = setTimeout(type, typingSpeed);
    };

    timeoutId = setTimeout(type, 1000);

    return () => clearTimeout(timeoutId);
  }, []);

  const particlesInit = async (engine: Engine) => {
    await loadSlim(engine);
  };

  return (
    <section className="relative min-h-screen flex items-center pt-20 overflow-hidden">
      {/* Particle Background */}
      <div className="absolute inset-0 z-0">
        <Particles
          id="tsparticles"
          init={particlesInit}
          options={{
            background: {
              color: {
                value: "transparent",
              },
            },
            fpsLimit: 120,
            interactivity: {
              events: {
                onHover: {
                  enable: true,
                  mode: "repulse",
                },
                resize: true,
              },
              modes: {
                repulse: {
                  distance: 100,
                  duration: 0.4,
                },
              },
            },
            particles: {
              color: {
                value: "#06b6d4",
              },
              links: {
                color: "#3b82f6",
                distance: 150,
                enable: true,
                opacity: 0.2,
                width: 1,
              },
              move: {
                direction: "none",
                enable: true,
                outModes: {
                  default: "bounce",
                },
                random: false,
                speed: 1,
                straight: false,
              },
              number: {
                density: {
                  enable: true,
                  area: 800,
                },
                value: 60,
              },
              opacity: {
                value: 0.3,
              },
              shape: {
                type: "circle",
              },
              size: {
                value: { min: 1, max: 3 },
              },
            },
            detectRetina: true,
          }}
        />
      </div>

      {/* Hero Content */}
      <div className="container mx-auto px-6 relative z-10 grid lg:grid-cols-2 gap-12 items-center">
        <div>
          <Reveal>
            <div className="inline-block mb-4 px-4 py-1.5 rounded-full border border-white/10 bg-white/5 backdrop-blur-sm text-sm font-medium text-cyan-400">
              <span className="w-2 h-2 inline-block rounded-full bg-cyan-400 mr-2 animate-pulse"></span>
              Available for new opportunities
            </div>
          </Reveal>
          
          <Reveal delay={0.2}>
            <h1 className="text-5xl md:text-7xl font-bold font-[family-name:var(--font-space-grotesk)] mb-6 leading-tight">
              Hi, I'm <br />
              <span className="text-gradient">Rohan Keshri</span>
            </h1>
          </Reveal>

          <Reveal delay={0.4}>
            <div className="text-2xl md:text-3xl font-medium text-gray-300 mb-6 h-10">
              <span ref={typeWriterRef}></span>
              <span className="animate-pulse text-cyan-400">|</span>
            </div>
          </Reveal>

          <Reveal delay={0.6}>
            <p className="text-gray-400 text-lg mb-10 max-w-lg">
              Crafting premium digital experiences through scalable architecture, intuitive interfaces, and modern web technologies.
            </p>
          </Reveal>

          <Reveal delay={0.8}>
            <div className="flex flex-wrap gap-4">
              <Link href="/#projects" className="interactive px-8 py-4 bg-white text-black font-semibold rounded-lg hover:bg-gray-200 transition-colors">
                View Projects
              </Link>
              <a href="/resume.pdf" download className="interactive px-8 py-4 glass text-white font-semibold rounded-lg hover:bg-white/10 transition-colors border border-white/10">
                Download Resume
              </a>
              <Link href="/contact" className="interactive px-8 py-4 text-white font-semibold rounded-lg hover:text-cyan-400 transition-colors underline-offset-4 hover:underline">
                Contact Me
              </Link>
            </div>
          </Reveal>
        </div>

        {/* Right Side: Decorative elements or 3D / Code mockup */}
        <div className="hidden lg:flex justify-center items-center relative">
          <Reveal delay={1}>
            <div className="glass-card w-full max-w-md rounded-2xl p-6 relative overflow-hidden">
              <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-cyan-400 via-blue-500 to-purple-600"></div>
              <div className="flex gap-2 mb-4">
                <div className="w-3 h-3 rounded-full bg-red-500"></div>
                <div className="w-3 h-3 rounded-full bg-yellow-500"></div>
                <div className="w-3 h-3 rounded-full bg-green-500"></div>
              </div>
              <pre className="text-sm font-mono text-gray-300 overflow-x-auto">
                <code className="language-typescript">
{`const developer = {
  name: 'Rohan Keshri',
  role: 'Full Stack Developer',
  skills: ['Next.js', 'React', 'MongoDB'],
  build: async () => {
    return "Premium digital experiences";
  }
};

await developer.build();`}
                </code>
              </pre>
            </div>
          </Reveal>
          
          {/* Decorative glowing orb */}
          <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-64 h-64 bg-cyan-500/20 rounded-full blur-[100px] -z-10 pointer-events-none"></div>
          <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-48 h-48 bg-purple-500/20 rounded-full blur-[80px] -z-10 pointer-events-none"></div>
        </div>
      </div>
    </section>
  );
}
