// ===== NAVBAR =====
const navbar = document.getElementById('navbar');

window.addEventListener('scroll', () => {
  if (window.scrollY > 80) {
    navbar.classList.add('scrolled');
  } else {
    navbar.classList.remove('scrolled');
  }
}, { passive: true });

// ===== MOBILE NAV =====
const navToggle = document.querySelector('.nav-toggle');
const navLinks = document.querySelector('.nav-links');
let mobileNavOpen = false;

if (navToggle) {
  navToggle.addEventListener('click', () => {
    mobileNavOpen = !mobileNavOpen;
    if (mobileNavOpen) {
      navLinks.style.cssText = `
        display: flex;
        flex-direction: column;
        position: fixed;
        top: 0; left: 0; right: 0; bottom: 0;
        background: rgba(6,14,10,0.98);
        backdrop-filter: blur(20px);
        align-items: center;
        justify-content: center;
        gap: 2rem;
        z-index: 999;
      `;
      navLinks.querySelectorAll('a').forEach(a => {
        a.style.cssText = 'font-size: 1.75rem; font-weight: 600; color: rgba(255,255,255,0.8); letter-spacing: 0.05em; text-transform: uppercase;';
      });
    } else {
      navLinks.style.cssText = '';
      navLinks.querySelectorAll('a').forEach(a => a.style.cssText = '');
    }
  });
}

// Close mobile nav on link click
document.querySelectorAll('.nav-links a').forEach(link => {
  link.addEventListener('click', () => {
    if (mobileNavOpen) {
      mobileNavOpen = false;
      navLinks.style.cssText = '';
      navLinks.querySelectorAll('a').forEach(a => a.style.cssText = '');
    }
  });
});

// Hero entrance handled by CSS animations (see .hero-content children)

// ===== SCROLL REVEAL =====
const revealTargets = [
  '.quick-item',
  '.vc-image-side',
  '.vc-content-side',
  '.discover-panel',
  '.campus-intro-text',
  '.campus-intro-img',
  '.campus-tile',
  '.news-featured-card',
  '.news-card-sm',
  '.stat-block',
  '.social-post',
  '.cta-left',
  '.cta-right',
  '.footer-brand',
  '.footer-col',
];

const revealObserver = new IntersectionObserver((entries) => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      entry.target.classList.add('visible');
      revealObserver.unobserve(entry.target);
    }
  });
}, {
  threshold: 0.08,
  rootMargin: '0px 0px -40px 0px'
});

revealTargets.forEach(selector => {
  document.querySelectorAll(selector).forEach((el, i) => {
    el.classList.add('reveal');
    const delay = (i % 4) * 0.1;
    if (delay > 0) el.style.transitionDelay = delay + 's';
    revealObserver.observe(el);
  });
});

// Section headers
document.querySelectorAll('.discover-header, .news-header, .impact-top, .social-intro').forEach(el => {
  el.classList.add('reveal');
  revealObserver.observe(el);
});

// ===== COUNT UP ANIMATION =====
function easeOutCubic(t) { return 1 - Math.pow(1 - t, 3); }

function animateCountUp(el, target, duration = 2200) {
  const start = performance.now();
  function update(time) {
    const elapsed = time - start;
    const progress = Math.min(elapsed / duration, 1);
    const eased = easeOutCubic(progress);
    const value = Math.floor(eased * target);
    el.textContent = value.toLocaleString();
    if (progress < 1) requestAnimationFrame(update);
  }
  requestAnimationFrame(update);
}

const statsObserver = new IntersectionObserver((entries) => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      const block = entry.target;
      const countEl = block.querySelector('.count-up');
      const target = parseInt(block.dataset.count);
      if (countEl && !isNaN(target)) {
        setTimeout(() => animateCountUp(countEl, target), 200);
      }
      statsObserver.unobserve(block);
    }
  });
}, { threshold: 0.25 });

document.querySelectorAll('.stat-block').forEach(b => statsObserver.observe(b));

// ===== SMOOTH ANCHOR SCROLL =====
document.querySelectorAll('a[href^="#"]').forEach(link => {
  link.addEventListener('click', e => {
    const id = link.getAttribute('href');
    if (id === '#') return;
    const target = document.querySelector(id);
    if (target) {
      e.preventDefault();
      const navH = navbar.offsetHeight;
      const top = target.getBoundingClientRect().top + window.scrollY - navH;
      window.scrollTo({ top, behavior: 'smooth' });
    }
  });
});

// ===== SUBTLE CURSOR FOLLOWER (desktop only) =====
if (window.matchMedia('(pointer: fine)').matches) {
  const cursor = document.createElement('div');
  cursor.style.cssText = `
    position: fixed;
    width: 8px;
    height: 8px;
    background: rgba(244,180,0,0.7);
    border-radius: 50%;
    pointer-events: none;
    z-index: 9999;
    transition: transform 0.15s ease, opacity 0.3s ease;
    mix-blend-mode: difference;
    transform: translate(-50%, -50%);
    top: 0; left: 0;
  `;
  document.body.appendChild(cursor);

  let mouseX = 0, mouseY = 0;
  document.addEventListener('mousemove', e => {
    mouseX = e.clientX;
    mouseY = e.clientY;
    cursor.style.left = mouseX + 'px';
    cursor.style.top = mouseY + 'px';
  });

  document.querySelectorAll('a, button, .discover-panel, .campus-tile, .social-post').forEach(el => {
    el.addEventListener('mouseenter', () => {
      cursor.style.transform = 'translate(-50%, -50%) scale(3)';
      cursor.style.background = 'rgba(244,180,0,0.4)';
    });
    el.addEventListener('mouseleave', () => {
      cursor.style.transform = 'translate(-50%, -50%) scale(1)';
      cursor.style.background = 'rgba(244,180,0,0.7)';
    });
  });
}

// ===== DISCOVER PANEL PARALLAX TILT =====
document.querySelectorAll('.discover-panel').forEach(panel => {
  panel.addEventListener('mousemove', e => {
    const rect = panel.getBoundingClientRect();
    const x = (e.clientX - rect.left) / rect.width - 0.5;
    const y = (e.clientY - rect.top) / rect.height - 0.5;
    panel.querySelector('.panel-bg').style.transform =
      `scale(1.05) translate(${x * -12}px, ${y * -12}px)`;
  });
  panel.addEventListener('mouseleave', () => {
    panel.querySelector('.panel-bg').style.transform = 'scale(1)';
  });
});
