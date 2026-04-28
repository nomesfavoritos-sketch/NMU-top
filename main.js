// ===== NAVBAR SCROLL =====
const navbar = document.getElementById('navbar');
let lastScroll = 0;

window.addEventListener('scroll', () => {
  const scrollY = window.scrollY;
  if (scrollY > 60) {
    navbar.classList.add('scrolled');
  } else {
    navbar.classList.remove('scrolled');
  }
  lastScroll = scrollY;
});

// ===== MOBILE NAV TOGGLE =====
const navToggle = document.querySelector('.nav-toggle');
const navLinks = document.querySelector('.nav-links');
const navCta = document.querySelector('.nav-cta');

if (navToggle) {
  navToggle.addEventListener('click', () => {
    navLinks.style.display = navLinks.style.display === 'flex' ? 'none' : 'flex';
    navLinks.style.flexDirection = 'column';
    navLinks.style.position = 'absolute';
    navLinks.style.top = '100%';
    navLinks.style.left = '0';
    navLinks.style.right = '0';
    navLinks.style.background = 'rgba(11,61,46,0.98)';
    navLinks.style.padding = '1rem 2rem';
    navLinks.style.backdropFilter = 'blur(12px)';
  });
}

// ===== PARTICLES =====
function createParticles() {
  const container = document.getElementById('heroParticles');
  if (!container) return;

  const count = 30;
  for (let i = 0; i < count; i++) {
    const p = document.createElement('div');
    p.className = 'particle';
    p.style.left = Math.random() * 100 + '%';
    p.style.animationDuration = (Math.random() * 15 + 10) + 's';
    p.style.animationDelay = (Math.random() * 10) + 's';
    p.style.width = (Math.random() * 3 + 1) + 'px';
    p.style.height = p.style.width;
    p.style.opacity = Math.random() * 0.6 + 0.2;
    container.appendChild(p);
  }
}
createParticles();

// ===== SCROLL REVEAL =====
const revealEls = document.querySelectorAll(
  '.quick-card, .vc-grid, .discover-panel, .campus-item, .news-featured, .news-item, .stat-card, .social-card, .social-follow'
);

revealEls.forEach((el, i) => {
  el.classList.add('reveal');
  if (i % 4 === 1) el.classList.add('reveal-delay-1');
  if (i % 4 === 2) el.classList.add('reveal-delay-2');
  if (i % 4 === 3) el.classList.add('reveal-delay-3');
});

const sectionHeaders = document.querySelectorAll('.section-header, .campus-text, .cta-content');
sectionHeaders.forEach(el => el.classList.add('reveal'));

const observer = new IntersectionObserver((entries) => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      entry.target.classList.add('visible');
      observer.unobserve(entry.target);
    }
  });
}, { threshold: 0.12 });

document.querySelectorAll('.reveal').forEach(el => observer.observe(el));

// ===== COUNT UP ANIMATION =====
function animateCounter(el, target, suffix, duration = 2000) {
  let start = 0;
  const step = target / (duration / 16);
  const timer = setInterval(() => {
    start += step;
    if (start >= target) {
      start = target;
      clearInterval(timer);
    }
    el.textContent = Math.floor(start).toLocaleString();
  }, 16);
}

const statsObserver = new IntersectionObserver((entries) => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      const card = entry.target;
      const countEl = card.querySelector('.count-up');
      const target = parseInt(card.dataset.count);
      if (countEl && target) {
        animateCounter(countEl, target, card.dataset.suffix);
      }
      statsObserver.unobserve(card);
    }
  });
}, { threshold: 0.3 });

document.querySelectorAll('.stat-card').forEach(card => statsObserver.observe(card));

// ===== SMOOTH ANCHOR SCROLLING =====
document.querySelectorAll('a[href^="#"]').forEach(link => {
  link.addEventListener('click', (e) => {
    const target = document.querySelector(link.getAttribute('href'));
    if (target) {
      e.preventDefault();
      const offset = 80;
      const top = target.getBoundingClientRect().top + window.scrollY - offset;
      window.scrollTo({ top, behavior: 'smooth' });

      if (navLinks && window.innerWidth < 768) {
        navLinks.style.display = 'none';
      }
    }
  });
});

// ===== CAMPUS PARALLAX (subtle) =====
window.addEventListener('scroll', () => {
  const campusHero = document.querySelector('.campus-hero');
  if (!campusHero) return;
  const rect = campusHero.getBoundingClientRect();
  if (rect.top < window.innerHeight && rect.bottom > 0) {
    const progress = (window.innerHeight - rect.top) / (window.innerHeight + rect.height);
    campusHero.style.backgroundPositionY = `${progress * 40}px`;
  }
}, { passive: true });

// ===== HERO HEADLINE TYPEWRITER EFFECT =====
// Subtle entrance animation already handled by CSS, JS adds additional polish
document.addEventListener('DOMContentLoaded', () => {
  const heroContent = document.querySelector('.hero-content');
  if (heroContent) {
    heroContent.style.opacity = '0';
    heroContent.style.transform = 'translateY(30px)';
    setTimeout(() => {
      heroContent.style.transition = 'opacity 1.2s ease, transform 1.2s ease';
      heroContent.style.opacity = '1';
      heroContent.style.transform = 'translateY(0)';
    }, 200);
  }
});

// ===== ACTIVE NAV LINK ON SCROLL =====
const sections = document.querySelectorAll('section[id]');
const navAnchors = document.querySelectorAll('.nav-links a');

const navObserver = new IntersectionObserver((entries) => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      navAnchors.forEach(a => a.classList.remove('active'));
      const active = document.querySelector(`.nav-links a[href="#${entry.target.id}"]`);
      if (active) active.classList.add('active');
    }
  });
}, { threshold: 0.4 });

sections.forEach(s => navObserver.observe(s));
