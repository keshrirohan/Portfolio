"use client";

import { useEffect, useRef, useState } from "react";
import gsap from "gsap";

export default function Loader() {
  const [loading, setLoading] = useState(true);
  const loaderRef = useRef<HTMLDivElement>(null);
  const textRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    // Initial animation
    const ctx = gsap.context(() => {
      gsap.to(textRef.current, {
        opacity: 1,
        y: 0,
        duration: 1,
        ease: "power3.out",
      });

      // Hide loader after 2s
      gsap.to(loaderRef.current, {
        opacity: 0,
        duration: 0.8,
        delay: 1.5,
        ease: "power2.inOut",
        onComplete: () => {
          setLoading(false);
        }
      });
    });

    return () => ctx.revert();
  }, []);

  if (!loading) return null;

  return (
    <div ref={loaderRef} className="loader-wrapper flex flex-col gap-4">
      <div 
        ref={textRef} 
        className="text-2xl font-bold tracking-widest text-white opacity-0 translate-y-4 font-[family-name:var(--font-space-grotesk)]"
      >
        ROHAN KESHRI
      </div>
      <div className="w-48 h-1 bg-white/10 rounded-full overflow-hidden">
        <div className="h-full bg-cyan-400 w-full origin-left animate-pulse" style={{
          animation: "loadProgress 1.5s ease-in-out forwards"
        }}></div>
      </div>
      <style jsx>{`
        @keyframes loadProgress {
          0% { transform: scaleX(0); }
          50% { transform: scaleX(0.5); }
          100% { transform: scaleX(1); }
        }
      `}</style>
    </div>
  );
}
