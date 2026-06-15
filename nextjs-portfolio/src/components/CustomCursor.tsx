"use client";

import { useEffect, useRef, useState } from "react";
import gsap from "gsap";

export default function CustomCursor() {
  const cursorDotRef = useRef<HTMLDivElement>(null);
  const cursorOutlineRef = useRef<HTMLDivElement>(null);
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    // Only show on non-touch devices
    if (window.matchMedia("(pointer: coarse)").matches) return;
    setIsVisible(true);

    const onMouseMove = (e: MouseEvent) => {
      const { clientX: x, clientY: y } = e;

      // Instant follow for dot
      if (cursorDotRef.current) {
        cursorDotRef.current.style.left = `${x}px`;
        cursorDotRef.current.style.top = `${y}px`;
      }

      // Smooth follow for outline
      if (cursorOutlineRef.current) {
        gsap.to(cursorOutlineRef.current, {
          x: x,
          y: y,
          duration: 0.15,
          ease: "power2.out",
        });
      }
    };

    const onMouseEnterLink = () => {
      if (cursorOutlineRef.current) cursorOutlineRef.current.classList.add("active");
    };
    
    const onMouseLeaveLink = () => {
      if (cursorOutlineRef.current) cursorOutlineRef.current.classList.remove("active");
    };

    window.addEventListener("mousemove", onMouseMove);

    // Attach hover effects to links and buttons
    const attachHoverEvents = () => {
      const interactables = document.querySelectorAll("a, button, input, textarea, select, .interactive");
      interactables.forEach((el) => {
        el.addEventListener("mouseenter", onMouseEnterLink);
        el.addEventListener("mouseleave", onMouseLeaveLink);
      });
    };

    // Initial attach
    attachHoverEvents();

    // Re-attach on DOM mutations (for client side routing)
    const observer = new MutationObserver(attachHoverEvents);
    observer.observe(document.body, { childList: true, subtree: true });

    return () => {
      window.removeEventListener("mousemove", onMouseMove);
      observer.disconnect();
    };
  }, []);

  if (!isVisible) return null;

  return (
    <>
      <div ref={cursorDotRef} className="custom-cursor-dot" />
      <div ref={cursorOutlineRef} className="custom-cursor-outline" />
    </>
  );
}
