/* =====================================================
   ROHAN KESHRI PORTFOLIO — script.js
   ===================================================== */

// ---- Theme Switch -------------------------------------------------------
function initThemeSwitch() {
  const html = document.documentElement;
  const btn = document.getElementById('themeToggle');
  if (!btn) return;

  // Load persisted theme
  const saved = localStorage.getItem('rk_theme') || 'dark';
  html.setAttribute('data-theme', saved);

  btn.addEventListener('click', () => {
    const current = html.getAttribute('data-theme');
    const next = current === 'dark' ? 'light' : 'dark';
    html.setAttribute('data-theme', next);
    localStorage.setItem('rk_theme', next);
  });
}

// ---- Gallery Filter -------------------------------------------------------
function initGalleryFilter() {
  const filterBtns = document.querySelectorAll('.gallery-filter-btn');
  const galleryItems = document.querySelectorAll('.gallery-item');

  filterBtns.forEach(btn => {
    btn.addEventListener('click', () => {
      filterBtns.forEach(b => b.classList.remove('active'));
      btn.classList.add('active');

      const filter = btn.dataset.filter;
      galleryItems.forEach((item, i) => {
        const category = item.dataset.category;
        const show = filter === 'all' || category === filter;
        if (show) {
          item.classList.remove('hidden');
          item.style.opacity = '0';
          setTimeout(() => { item.style.opacity = '1'; }, i * 40);
        } else {
          item.classList.add('hidden');
        }
      });
    });
  });
}

// ---- Lightbox -------------------------------------------------------
let lightboxItems = [];
let lightboxIdx = 0;

function initLightbox() {
  const lightbox    = document.getElementById('lightbox');
  const lightboxImg = document.getElementById('lightboxImg');
  const lightboxCap = document.getElementById('lightboxCaption');
  const closeBtn    = document.getElementById('lightboxClose');
  const prevBtn     = document.getElementById('lightboxPrev');
  const nextBtn     = document.getElementById('lightboxNext');

  if (!lightbox) return;

  function buildLightboxItems() {
    lightboxItems = [];
    document.querySelectorAll('.gallery-item').forEach(item => {
      const img = item.querySelector('img');
      const caption = item.dataset.caption || '';
      // Bug fix: only include items with real images (not placeholder items)
      if (img && img.src && !img.src.endsWith('#') && !item.classList.contains('gallery-placeholder')) {
        lightboxItems.push({ src: img.src, caption });
      }
    });
  }

  function openLightbox(idx) {
    buildLightboxItems();
    if (lightboxItems.length === 0) return;
    lightboxIdx = Math.min(idx, lightboxItems.length - 1);
    const { src, caption } = lightboxItems[lightboxIdx];
    lightboxImg.src = src;
    lightboxImg.alt = caption;
    lightboxCap.textContent = caption;
    lightbox.classList.add('open');
    document.body.style.overflow = 'hidden';
  }

  function closeLightbox() {
    lightbox.classList.remove('open');
    document.body.style.overflow = '';
    setTimeout(() => { lightboxImg.src = ''; }, 300);
  }

  function navigate(dir) {
    if (lightboxItems.length === 0) return;
    lightboxIdx = (lightboxIdx + dir + lightboxItems.length) % lightboxItems.length;
    const { src, caption } = lightboxItems[lightboxIdx];
    lightboxImg.style.opacity = '0';
    setTimeout(() => {
      lightboxImg.src = src;
      lightboxImg.alt = caption;
      lightboxCap.textContent = caption;
      lightboxImg.style.opacity = '1';
    }, 200);
  }

  // Bug fix: only attach click to items that have real images
  document.querySelectorAll('.gallery-item').forEach((item, i) => {
    const img = item.querySelector('img');
    if (img && !item.classList.contains('gallery-placeholder')) {
      item.addEventListener('click', () => openLightbox(i));
    }
  });

  if (closeBtn) closeBtn.addEventListener('click', closeLightbox);
  if (nextBtn) nextBtn.addEventListener('click', () => navigate(1));
  if (prevBtn) prevBtn.addEventListener('click', () => navigate(-1));

  lightbox.addEventListener('click', e => { if (e.target === lightbox) closeLightbox(); });

  document.addEventListener('keydown', e => {
    if (!lightbox.classList.contains('open')) return;
    if (e.key === 'Escape') closeLightbox();
    if (e.key === 'ArrowRight') navigate(1);
    if (e.key === 'ArrowLeft') navigate(-1);
  });

  lightboxImg.style.transition = 'opacity 0.2s ease';
}

// ---- Typed Text Effect -------------------------------------------------------
const phrases = [
  'scalable web apps',
  'MERN stack solutions',
  'AI-powered platforms',
  'real-time systems',
  'clean APIs',
  'responsive UIs'
];

let phraseIdx = 0;
let charIdx = 0;
let isDeleting = false;
let typingTimer;

function type() {
  const el = document.getElementById('typedText');
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

// ---- Floating Particles -------------------------------------------------------
function createParticles() {
  const colors = ['#4f8ef7', '#9d6fff', '#22d3ee', '#2dd4bf', '#60a5fa'];
  const count = 18;
  const canvas = document.getElementById('bgCanvas');
  if (!canvas) return;

  for (let i = 0; i < count; i++) {
    const p = document.createElement('div');
    p.className = 'particle';
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

// ---- Navbar Scroll Effect -------------------------------------------------------
function initNavbar() {
  const navbar = document.getElementById('navbar');
  if (!navbar) return;

  window.addEventListener('scroll', () => {
    navbar.classList.toggle('scrolled', window.scrollY > 60);
  }, { passive: true });

  // Active link highlighting (only on pages with sections)
  const sections = document.querySelectorAll('section[id]');
  const navLinks = document.querySelectorAll('.nav-link:not(.active-page)');

  if (sections.length > 0) {
    const observer = new IntersectionObserver(entries => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          navLinks.forEach(link => {
            link.style.color = '';
            if (link.getAttribute('href') === `#${entry.target.id}`) {
              link.style.color = 'var(--accent-blue)';
            }
          });
        }
      });
    }, { threshold: 0.4 });

    sections.forEach(s => observer.observe(s));
  }
}

// ---- Mobile Menu -------------------------------------------------------
function initMobileMenu() {
  const hamburger = document.getElementById('hamburger');
  const navLinks = document.getElementById('navLinks');
  if (!hamburger || !navLinks) return;

  const links = navLinks.querySelectorAll('a');

  hamburger.addEventListener('click', () => {
    hamburger.classList.toggle('active');
    navLinks.classList.toggle('open');
    document.body.style.overflow = navLinks.classList.contains('open') ? 'hidden' : '';
  });

  // Bug fix: close menu on any link click (including page navigation links)
  links.forEach(link => {
    link.addEventListener('click', () => {
      hamburger.classList.remove('active');
      navLinks.classList.remove('open');
      document.body.style.overflow = '';
    });
  });
}

// ---- Scroll Reveal -------------------------------------------------------
function initScrollReveal() {
  const revealEls = document.querySelectorAll(
    '.timeline-item, .skill-category, .project-card, .edu-card, .contact-card, .about-grid, .contact-layout'
  );

  revealEls.forEach((el, i) => {
    el.classList.add('reveal');
    // Bug fix: cap delay to prevent excessive delays with many elements
    el.style.transitionDelay = `${(i % 4) * 0.1}s`;
  });

  const observer = new IntersectionObserver(entries => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.classList.add('visible');
        observer.unobserve(entry.target); // Stop observing once visible
      }
    });
  }, { threshold: 0.08, rootMargin: '0px 0px -40px 0px' });

  revealEls.forEach(el => observer.observe(el));
}

// ---- Smooth Scroll (for same-page anchors only) -------------------------------------------------------
function initSmoothScroll() {
  document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', e => {
      const href = anchor.getAttribute('href');
      if (href === '#') return;
      const target = document.querySelector(href);
      if (target) {
        e.preventDefault();
        const offset = 80;
        const top = target.getBoundingClientRect().top + window.scrollY - offset;
        window.scrollTo({ top, behavior: 'smooth' });
      }
    });
  });
}

// ---- Skill Tags Interaction -------------------------------------------------------
function initSkillTags() {
  document.querySelectorAll('.skill-tag').forEach(tag => {
    tag.addEventListener('mouseenter', () => { tag.style.transform = 'scale(1.05)'; });
    tag.addEventListener('mouseleave', () => { tag.style.transform = ''; });
  });
}

// ---- Contact Form -------------------------------------------------------
function handleSubmit(e) {
  e.preventDefault();
  const btn = document.getElementById('submitBtn');
  const success = document.getElementById('formSuccess');
  if (!btn || !success) return;

  btn.innerHTML = `<span>Sending...</span>
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" style="animation:spin 1s linear infinite">
      <circle cx="12" cy="12" r="10" stroke-opacity="0.3"/><path d="M12 2a10 10 0 0 1 10 10"/>
    </svg>`;
  btn.disabled = true;

  // Simulate send (wire up EmailJS or backend in production)
  setTimeout(() => {
    btn.innerHTML = `<span>Send Message</span>
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><line x1="22" y1="2" x2="11" y2="13"/><polygon points="22 2 15 22 11 13 2 9 22 2"/></svg>`;
    btn.disabled = false;
    success.classList.add('visible');
    document.getElementById('contactForm').reset();
    setTimeout(() => success.classList.remove('visible'), 5000);
  }, 1800);
}

// ---- Spin keyframe -------------------------------------------------------
const spinStyle = document.createElement('style');
spinStyle.textContent = `@keyframes spin { from { transform: rotate(0deg); } to { transform: rotate(360deg); } }`;
document.head.appendChild(spinStyle);

// ---- Cursor glow effect -------------------------------------------------------
function initCursorGlow() {
  // Only on desktop
  if (window.matchMedia('(pointer: coarse)').matches) return;

  const glow = document.createElement('div');
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

  window.addEventListener('mousemove', e => {
    glow.style.left = `${e.clientX}px`;
    glow.style.top = `${e.clientY}px`;
  }, { passive: true });
}

// ---- Counter Animation -------------------------------------------------------
function animateCounters() {
  const counters = document.querySelectorAll('.stat-num');
  counters.forEach(counter => {
    const target = parseFloat(counter.textContent);
    const isDecimal = counter.textContent.includes('.');
    const suffix = counter.textContent.replace(/[0-9.]/g, '');
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

const heroObserver = new IntersectionObserver(entries => {
  if (entries[0].isIntersecting) {
    animateCounters();
    heroObserver.disconnect();
  }
}, { threshold: 0.3 });

// ---- Tilt effect on project cards -------------------------------------------------------
function initCardTilt() {
  document.querySelectorAll('.project-card, .timeline-card, .edu-card').forEach(card => {
    card.addEventListener('mousemove', e => {
      const rect = card.getBoundingClientRect();
      const x = (e.clientX - rect.left) / rect.width - 0.5;
      const y = (e.clientY - rect.top) / rect.height - 0.5;
      card.style.transform = `perspective(1000px) rotateX(${-y * 4}deg) rotateY(${x * 4}deg) translateY(-4px)`;
    });
    card.addEventListener('mouseleave', () => { card.style.transform = ''; });
  });
}

// ---- Initialize everything on DOM ready -------------------------------------------------------
document.addEventListener('DOMContentLoaded', () => {
  // Load persisted theme FIRST before anything renders
  const savedTheme = localStorage.getItem('rk_theme') || 'dark';
  document.documentElement.setAttribute('data-theme', savedTheme);

  initThemeSwitch();
  type();
  createParticles();
  initNavbar();
  initMobileMenu();
  initScrollReveal();
  initSmoothScroll();
  initSkillTags();
  initCursorGlow();
  initCardTilt();
  initGalleryFilter();
  initLightbox();

  const heroEl = document.querySelector('.hero');
  if (heroEl) heroObserver.observe(heroEl);
});
