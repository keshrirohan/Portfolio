/* =====================================================
   ROHAN KESHRI PORTFOLIO — script.js
   ===================================================== */

// ---- Typed Text Effect ----
const phrases = [
  "scalable web apps",
  "MERN stack solutions",
  "AI-powered platforms",
  "real-time systems",
  "clean APIs",
  "responsive UIs"
];

let phraseIdx = 0;
let charIdx = 0;
let isDeleting = false;
let typingTimer;

function type() {
  const el = document.getElementById("typedText");
  if (!el) return;

  const current = phrases[phraseIdx];
  if (isDeleting) {
    el.textContent = current.substring(0, charIdx - 1);
    charIdx--;
  } else {
    el.textContent = current.substring(0, charIdx + 1);
    charIdx++;
  }

  let delay = isDeleting ? 60 : 100;

  if (!isDeleting && charIdx === current.length) {
    delay = 2200;
    isDeleting = true;
  } else if (isDeleting && charIdx === 0) {
    isDeleting = false;
    phraseIdx = (phraseIdx + 1) % phrases.length;
    delay = 400;
  }

  typingTimer = setTimeout(type, delay);
}

// ---- Floating Particles ----
function createParticles() {
  const colors = ["#4f8ef7", "#9d6fff", "#22d3ee", "#2dd4bf", "#60a5fa"];
  const count = 18;
  const canvas = document.getElementById("bgCanvas");

  for (let i = 0; i < count; i++) {
    const p = document.createElement("div");
    p.className = "particle";
    const size = Math.random() * 4 + 1.5;
    const color = colors[Math.floor(Math.random() * colors.length)];
    const left = Math.random() * 100;
    const duration = Math.random() * 20 + 15;
    const delay = Math.random() * 15;

    p.style.cssText = `
      width: ${size}px;
      height: ${size}px;
      background: ${color};
      left: ${left}%;
      animation-duration: ${duration}s;
      animation-delay: -${delay}s;
      box-shadow: 0 0 ${size * 3}px ${color};
      opacity: 0.7;
    `;
    canvas.appendChild(p);
  }
}

// ---- Navbar Scroll Effect ----
function initNavbar() {
  const navbar = document.getElementById("navbar");
  let lastScroll = 0;

  window.addEventListener("scroll", () => {
    const scrollY = window.scrollY;
    if (scrollY > 60) {
      navbar.classList.add("scrolled");
    } else {
      navbar.classList.remove("scrolled");
    }
    lastScroll = scrollY;
  }, { passive: true });

  // Active link highlighting
  const sections = document.querySelectorAll("section[id]");
  const navLinks = document.querySelectorAll(".nav-link");

  const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        navLinks.forEach(link => {
          link.style.color = "";
          if (link.getAttribute("href") === `#${entry.target.id}`) {
            link.style.color = "var(--accent-blue)";
          }
        });
      }
    });
  }, { threshold: 0.4 });

  sections.forEach(s => observer.observe(s));
}

// ---- Mobile Menu ----
function initMobileMenu() {
  const hamburger = document.getElementById("hamburger");
  const navLinks = document.getElementById("navLinks");
  const links = navLinks.querySelectorAll("a");

  hamburger.addEventListener("click", () => {
    hamburger.classList.toggle("active");
    navLinks.classList.toggle("open");
    document.body.style.overflow = navLinks.classList.contains("open") ? "hidden" : "";
  });

  links.forEach(link => {
    link.addEventListener("click", () => {
      hamburger.classList.remove("active");
      navLinks.classList.remove("open");
      document.body.style.overflow = "";
    });
  });
}

// ---- Scroll Reveal ----
function initScrollReveal() {
  const revealEls = document.querySelectorAll(
    ".timeline-item, .skill-category, .project-card, .edu-card, .contact-card, .about-grid, .contact-layout"
  );

  revealEls.forEach((el, i) => {
    el.classList.add("reveal");
    el.style.transitionDelay = `${(i % 4) * 0.1}s`;
  });

  const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.classList.add("visible");
      }
    });
  }, { threshold: 0.08, rootMargin: "0px 0px -40px 0px" });

  revealEls.forEach(el => observer.observe(el));
}

// ---- Smooth Scroll ----
function initSmoothScroll() {
  document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener("click", (e) => {
      const href = anchor.getAttribute("href");
      const target = document.querySelector(href);
      if (target) {
        e.preventDefault();
        const offset = 80;
        const top = target.getBoundingClientRect().top + window.scrollY - offset;
        window.scrollTo({ top, behavior: "smooth" });
      }
    });
  });
}

// ---- Skill Tags Interaction ----
function initSkillTags() {
  document.querySelectorAll(".skill-tag").forEach(tag => {
    tag.addEventListener("mouseenter", () => {
      tag.style.transform = "scale(1.05)";
    });
    tag.addEventListener("mouseleave", () => {
      tag.style.transform = "";
    });
  });
}

// ---- Contact Form ----
function handleSubmit(e) {
  e.preventDefault();
  const btn = document.getElementById("submitBtn");
  const success = document.getElementById("formSuccess");

  btn.innerHTML = `<span>Sending...</span>
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" style="animation:spin 1s linear infinite">
      <circle cx="12" cy="12" r="10" stroke-opacity="0.3"/><path d="M12 2a10 10 0 0 1 10 10"/>
    </svg>`;
  btn.disabled = true;

  // Simulate send (in production, wire up your backend or EmailJS)
  setTimeout(() => {
    btn.innerHTML = `<span>Send Message</span>
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><line x1="22" y1="2" x2="11" y2="13"/><polygon points="22 2 15 22 11 13 2 9 22 2"/></svg>`;
    btn.disabled = false;
    success.classList.add("visible");
    document.getElementById("contactForm").reset();

    setTimeout(() => success.classList.remove("visible"), 5000);
  }, 1800);
}

// ---- Dynamic style for spin ----
const spinStyle = document.createElement("style");
spinStyle.textContent = `@keyframes spin { from { transform: rotate(0deg); } to { transform: rotate(360deg); } }`;
document.head.appendChild(spinStyle);

// ---- Cursor glow effect ----
function initCursorGlow() {
  const glow = document.createElement("div");
  glow.style.cssText = `
    position: fixed;
    width: 380px;
    height: 380px;
    border-radius: 50%;
    pointer-events: none;
    z-index: 1;
    background: radial-gradient(circle, rgba(79, 142, 247, 0.06) 0%, transparent 70%);
    transform: translate(-50%, -50%);
    transition: left 0.12s ease, top 0.12s ease;
    will-change: left, top;
  `;
  document.body.appendChild(glow);

  window.addEventListener("mousemove", (e) => {
    glow.style.left = `${e.clientX}px`;
    glow.style.top = `${e.clientY}px`;
  }, { passive: true });
}

// ---- Counter Animation ----
function animateCounters() {
  const counters = document.querySelectorAll(".stat-num");
  counters.forEach(counter => {
    const target = parseFloat(counter.textContent);
    const isDecimal = counter.textContent.includes(".");
    const suffix = counter.textContent.replace(/[0-9.]/g, "");
    const step = target / 50;
    let current = 0;
    const interval = setInterval(() => {
      current += step;
      if (current >= target) {
        counter.textContent = isDecimal ? target.toFixed(1) + suffix : Math.ceil(target) + suffix;
        clearInterval(interval);
      } else {
        counter.textContent = isDecimal ? current.toFixed(1) + suffix : Math.floor(current) + suffix;
      }
    }, 25);
  });
}

// Trigger counter on hero visible
const heroObserver = new IntersectionObserver((entries) => {
  if (entries[0].isIntersecting) {
    animateCounters();
    heroObserver.disconnect();
  }
}, { threshold: 0.3 });

// ---- Tilt effect on project cards ----
function initCardTilt() {
  document.querySelectorAll(".project-card, .timeline-card, .edu-card").forEach(card => {
    card.addEventListener("mousemove", (e) => {
      const rect = card.getBoundingClientRect();
      const x = (e.clientX - rect.left) / rect.width - 0.5;
      const y = (e.clientY - rect.top) / rect.height - 0.5;
      card.style.transform = `perspective(1000px) rotateX(${-y * 4}deg) rotateY(${x * 4}deg) translateY(-4px)`;
    });

    card.addEventListener("mouseleave", () => {
      card.style.transform = "";
    });
  });
}

// ---- Initialize everything on DOM ready ----
document.addEventListener("DOMContentLoaded", () => {
  type();
  createParticles();
  initNavbar();
  initMobileMenu();
  initScrollReveal();
  initSmoothScroll();
  initSkillTags();
  initCursorGlow();
  initCardTilt();

  const heroEl = document.querySelector(".hero");
  if (heroEl) heroObserver.observe(heroEl);
});
