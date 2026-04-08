/* ===================================
   SARANTHEEP SACHENA — PORTFOLIO JS
   Premium Interactions & Animations
=================================== */

// ===== LOADER =====
window.addEventListener('load', () => {
  setTimeout(() => {
    const loader = document.getElementById('loader');
    loader.classList.add('hidden');
    document.body.style.overflow = '';
    // Trigger hero animations
    document.querySelectorAll('#hero .reveal-up, #hero .reveal-right').forEach(el => {
      el.classList.add('visible');
    });
  }, 2200);
});
document.body.style.overflow = 'hidden';

// ===== CUSTOM CURSOR =====
const cursor = document.getElementById('cursor');
const follower = document.getElementById('cursor-follower');
let mouseX = 0, mouseY = 0;
let followerX = 0, followerY = 0;

document.addEventListener('mousemove', (e) => {
  mouseX = e.clientX;
  mouseY = e.clientY;
  cursor.style.left = mouseX + 'px';
  cursor.style.top = mouseY + 'px';
});

function animateFollower() {
  followerX += (mouseX - followerX) * 0.12;
  followerY += (mouseY - followerY) * 0.12;
  follower.style.left = followerX + 'px';
  follower.style.top = followerY + 'px';
  requestAnimationFrame(animateFollower);
}
animateFollower();

// Hover states for cursor
const hoverEls = document.querySelectorAll('a, button, .bento-card, .glass-card, .skill-pill, .filter-btn, .flow-step, .process-step');
hoverEls.forEach(el => {
  el.addEventListener('mouseenter', () => {
    cursor.classList.add('hover');
    follower.classList.add('hover');
  });
  el.addEventListener('mouseleave', () => {
    cursor.classList.remove('hover');
    follower.classList.remove('hover');
  });
});

// ===== SCROLL PROGRESS =====
window.addEventListener('scroll', () => {
  const scrollTop = window.scrollY;
  const docHeight = document.documentElement.scrollHeight - window.innerHeight;
  const progress = (scrollTop / docHeight) * 100;
  document.getElementById('scroll-progress').style.width = progress + '%';
});

// ===== NAVBAR =====
const navbar = document.getElementById('navbar');
window.addEventListener('scroll', () => {
  if (window.scrollY > 50) {
    navbar.classList.add('scrolled');
  } else {
    navbar.classList.remove('scrolled');
  }
});

// Active nav link on scroll
const sections = document.querySelectorAll('section[id]');
const navLinks = document.querySelectorAll('.nav-link');

window.addEventListener('scroll', () => {
  let current = '';
  sections.forEach(section => {
    const sectionTop = section.offsetTop - 120;
    if (window.scrollY >= sectionTop) {
      current = section.getAttribute('id');
    }
  });
  navLinks.forEach(link => {
    link.classList.remove('active');
    if (link.getAttribute('href') === '#' + current) {
      link.classList.add('active');
    }
  });
});

// ===== HAMBURGER MENU =====
const hamburger = document.getElementById('hamburger');
const mobileMenu = document.getElementById('mobile-menu');

hamburger.addEventListener('click', () => {
  mobileMenu.classList.toggle('open');
  const spans = hamburger.querySelectorAll('span');
  if (mobileMenu.classList.contains('open')) {
    spans[0].style.transform = 'translateY(7px) rotate(45deg)';
    spans[1].style.opacity = '0';
    spans[2].style.transform = 'translateY(-7px) rotate(-45deg)';
  } else {
    spans.forEach(s => { s.style.transform = ''; s.style.opacity = ''; });
  }
});

// Close mobile menu when link clicked
mobileMenu.querySelectorAll('a').forEach(a => {
  a.addEventListener('click', () => {
    mobileMenu.classList.remove('open');
    hamburger.querySelectorAll('span').forEach(s => { s.style.transform = ''; s.style.opacity = ''; });
  });
});

// ===== THEME TOGGLE =====
const themeToggle = document.getElementById('theme-toggle');
const htmlEl = document.documentElement;
let isDark = true;

themeToggle.addEventListener('click', () => {
  isDark = !isDark;
  htmlEl.setAttribute('data-theme', isDark ? 'dark' : 'light');
  themeToggle.innerHTML = isDark ? '<i class="fas fa-sun"></i>' : '<i class="fas fa-moon"></i>';
});

// ===== SCROLL REVEAL =====
const revealObserver = new IntersectionObserver((entries) => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      entry.target.classList.add('visible');
      // Animate skill pills
      if (entry.target.classList.contains('skills-categories')) {
        document.querySelectorAll('.skill-pill').forEach((pill, i) => {
          const level = pill.getAttribute('data-level');
          setTimeout(() => {
            pill.style.setProperty('--level', level + '%');
            pill.classList.add('animated');
          }, i * 80);
        });
      }
    }
  });
}, { threshold: 0.1, rootMargin: '0px 0px -60px 0px' });

document.querySelectorAll('.reveal-up, .reveal-left, .reveal-right').forEach(el => {
  // Skip hero elements (they're triggered by loader)
  if (!el.closest('#hero')) {
    revealObserver.observe(el);
  }
});

// ===== PARTICLES CANVAS =====
const canvas = document.getElementById('particles-canvas');
const ctx = canvas.getContext('2d');
let particles = [];
let animFrame;

function resizeCanvas() {
  canvas.width = window.innerWidth;
  canvas.height = window.innerHeight;
}
resizeCanvas();
window.addEventListener('resize', resizeCanvas);

class Particle {
  constructor() {
    this.reset();
  }
  reset() {
    this.x = Math.random() * canvas.width;
    this.y = Math.random() * canvas.height;
    this.size = Math.random() * 2 + 0.5;
    this.speedX = (Math.random() - 0.5) * 0.5;
    this.speedY = (Math.random() - 0.5) * 0.5;
    this.opacity = Math.random() * 0.5 + 0.1;
    this.gold = Math.random() > 0.7;
  }
  update() {
    this.x += this.speedX;
    this.y += this.speedY;
    if (this.x < 0 || this.x > canvas.width) this.speedX *= -1;
    if (this.y < 0 || this.y > canvas.height) this.speedY *= -1;
  }
  draw() {
    ctx.save();
    ctx.globalAlpha = this.opacity;
    ctx.fillStyle = this.gold ? '#d4af37' : '#ffffff';
    ctx.beginPath();
    ctx.arc(this.x, this.y, this.size, 0, Math.PI * 2);
    ctx.fill();
    ctx.restore();
  }
}

// Create particles
for (let i = 0; i < 80; i++) {
  particles.push(new Particle());
}

// Mouse effect on particles
let mx = 0, my = 0;
canvas.addEventListener('mousemove', (e) => {
  mx = e.clientX;
  my = e.clientY;
});

function drawConnections() {
  for (let i = 0; i < particles.length; i++) {
    for (let j = i + 1; j < particles.length; j++) {
      const dx = particles[i].x - particles[j].x;
      const dy = particles[i].y - particles[j].y;
      const dist = Math.sqrt(dx * dx + dy * dy);
      if (dist < 120) {
        ctx.save();
        ctx.globalAlpha = (1 - dist / 120) * 0.08;
        ctx.strokeStyle = '#d4af37';
        ctx.lineWidth = 0.5;
        ctx.beginPath();
        ctx.moveTo(particles[i].x, particles[i].y);
        ctx.lineTo(particles[j].x, particles[j].y);
        ctx.stroke();
        ctx.restore();
      }
    }
  }
}

function animateParticles() {
  ctx.clearRect(0, 0, canvas.width, canvas.height);
  particles.forEach(p => {
    p.update();
    p.draw();
  });
  drawConnections();
  animFrame = requestAnimationFrame(animateParticles);
}
animateParticles();

// Stop particles when hero is not visible (performance)
const heroObserver = new IntersectionObserver((entries) => {
  entries.forEach(entry => {
    if (!entry.isIntersecting) {
      cancelAnimationFrame(animFrame);
    } else {
      animateParticles();
    }
  });
}, { threshold: 0 });
heroObserver.observe(document.getElementById('hero'));

// ===== MAGNETIC BUTTONS =====
document.querySelectorAll('.magnetic').forEach(btn => {
  btn.addEventListener('mousemove', (e) => {
    const rect = btn.getBoundingClientRect();
    const x = e.clientX - rect.left - rect.width / 2;
    const y = e.clientY - rect.top - rect.height / 2;
    btn.style.transform = `translate(${x * 0.25}px, ${y * 0.25}px)`;
  });
  btn.addEventListener('mouseleave', () => {
    btn.style.transform = '';
  });
});

// ===== PROJECT FILTER =====
const filterBtns = document.querySelectorAll('.filter-btn');
const projectCards = document.querySelectorAll('.bento-card');

filterBtns.forEach(btn => {
  btn.addEventListener('click', () => {
    filterBtns.forEach(b => b.classList.remove('active'));
    btn.classList.add('active');

    const filter = btn.getAttribute('data-filter');
    projectCards.forEach(card => {
      const cat = card.getAttribute('data-cat');
      if (filter === 'all' || cat === filter) {
        card.style.opacity = '1';
        card.style.transform = '';
        card.style.pointerEvents = '';
      } else {
        card.style.opacity = '0.2';
        card.style.transform = 'scale(0.95)';
        card.style.pointerEvents = 'none';
      }
    });
  });
});

// ===== CONTACT FORM =====
function submitForm(btn) {
  const inputs = document.querySelectorAll('.form-input');
  let valid = true;
  inputs.forEach(input => {
    if (!input.value.trim()) {
      input.style.borderColor = '#ef4444';
      valid = false;
      setTimeout(() => { input.style.borderColor = ''; }, 2000);
    }
  });
  if (!valid) return;

  btn.innerHTML = '<span>Sending...</span><i class="fas fa-spinner fa-spin"></i>';
  btn.style.opacity = '0.7';

  setTimeout(() => {
    btn.innerHTML = '<span>Message Sent!</span><i class="fas fa-check"></i>';
    btn.style.background = 'linear-gradient(135deg, #4ade80, #22c55e)';
    btn.style.opacity = '1';
    inputs.forEach(input => { input.value = ''; });

    setTimeout(() => {
      btn.innerHTML = '<span>Send Message</span><i class="fas fa-paper-plane"></i>';
      btn.style.background = '';
    }, 3000);
  }, 1500);
}

// ===== SMOOTH SCROLL =====
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
  anchor.addEventListener('click', (e) => {
    const target = document.querySelector(anchor.getAttribute('href'));
    if (target) {
      e.preventDefault();
      const offset = 80;
      const top = target.getBoundingClientRect().top + window.scrollY - offset;
      window.scrollTo({ top, behavior: 'smooth' });
    }
  });
});

// ===== PARALLAX ON HERO GLOWS =====
window.addEventListener('scroll', () => {
  const scrollY = window.scrollY;
  const glow1 = document.querySelector('.glow-1');
  const glow2 = document.querySelector('.glow-2');
  if (glow1) glow1.style.transform = `translateY(${scrollY * 0.2}px)`;
  if (glow2) glow2.style.transform = `translateY(${-scrollY * 0.1}px)`;
});

// ===== MOUSE GLOW EFFECT =====
document.addEventListener('mousemove', (e) => {
  const hero = document.getElementById('hero');
  if (!hero) return;
  const rect = hero.getBoundingClientRect();
  if (e.clientY > rect.bottom) return;

  const mouseGlow = document.getElementById('mouse-glow');
  if (mouseGlow) {
    mouseGlow.style.left = e.clientX + 'px';
    mouseGlow.style.top = e.clientY + 'px';
  }
});

// Create mouse glow element
const mouseGlowEl = document.createElement('div');
mouseGlowEl.id = 'mouse-glow';
mouseGlowEl.style.cssText = `
  position: fixed;
  width: 400px;
  height: 400px;
  border-radius: 50%;
  background: radial-gradient(circle, rgba(212,175,55,0.06) 0%, transparent 70%);
  pointer-events: none;
  z-index: 1;
  transform: translate(-50%, -50%);
  transition: left 0.1s, top 0.1s;
`;
document.body.appendChild(mouseGlowEl);

// ===== TEXT REVEAL ANIMATION (stagger children) =====
function staggerReveal(parent) {
  const children = parent.querySelectorAll('li, p, span');
  children.forEach((child, i) => {
    child.style.animationDelay = `${i * 0.1}s`;
  });
}

// ===== COUNTER ANIMATION =====
function animateCounter(el, target, duration = 2000) {
  let start = 0;
  const step = target / (duration / 16);
  const timer = setInterval(() => {
    start += step;
    if (start >= target) {
      start = target;
      clearInterval(timer);
    }
    el.textContent = Number.isInteger(target) ? Math.floor(start) : start.toFixed(1);
  }, 16);
}

const statsObserver = new IntersectionObserver((entries) => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      const nums = entry.target.querySelectorAll('.stat-num');
      nums.forEach(num => {
        const val = parseFloat(num.textContent);
        animateCounter(num, val);
      });
      statsObserver.unobserve(entry.target);
    }
  });
}, { threshold: 0.5 });

const heroStats = document.querySelector('.hero-stats');
if (heroStats) statsObserver.observe(heroStats);

// ===== TIMELINE ANIMATION =====
const timelineObserver = new IntersectionObserver((entries) => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      entry.target.style.opacity = '1';
      entry.target.style.transform = 'translateX(0)';
    }
  });
}, { threshold: 0.2 });

document.querySelectorAll('.timeline-item').forEach((item, i) => {
  item.style.opacity = '0';
  item.style.transform = 'translateX(-30px)';
  item.style.transition = `opacity 0.6s ease ${i * 0.2}s, transform 0.6s ease ${i * 0.2}s`;
  timelineObserver.observe(item);
});

// ===== USER FLOW ANIMATION =====
const userFlowObserver = new IntersectionObserver((entries) => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      const steps = entry.target.querySelectorAll('.flow-step');
      steps.forEach((step, i) => {
        setTimeout(() => {
          step.style.opacity = '1';
          step.style.transform = 'translateY(0)';
        }, i * 100);
      });
    }
  });
}, { threshold: 0.3 });

const userFlow = document.querySelector('.user-flow');
if (userFlow) {
  const steps = userFlow.querySelectorAll('.flow-step');
  steps.forEach(step => {
    step.style.opacity = '0';
    step.style.transform = 'translateY(20px)';
    step.style.transition = 'opacity 0.4s ease, transform 0.4s ease';
  });
  userFlowObserver.observe(userFlow);
}

// ===== FEATURES GRID ANIMATION =====
const featuresObserver = new IntersectionObserver((entries) => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      const items = entry.target.querySelectorAll('.feature-item');
      items.forEach((item, i) => {
        setTimeout(() => {
          item.style.opacity = '1';
          item.style.transform = 'translateY(0) scale(1)';
        }, i * 80);
      });
    }
  });
}, { threshold: 0.2 });

const featuresGrid = document.querySelector('.features-grid');
if (featuresGrid) {
  featuresGrid.querySelectorAll('.feature-item').forEach(item => {
    item.style.opacity = '0';
    item.style.transform = 'translateY(20px) scale(0.95)';
    item.style.transition = 'opacity 0.4s ease, transform 0.4s ease';
  });
  featuresObserver.observe(featuresGrid);
}

// ===== PROCESS STEPS ANIMATION =====
const processObserver = new IntersectionObserver((entries) => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      const steps = entry.target.querySelectorAll('.process-step');
      steps.forEach((step, i) => {
        setTimeout(() => {
          step.style.opacity = '1';
          step.style.transform = 'translateY(0)';
        }, i * 150);
      });
    }
  });
}, { threshold: 0.2 });

const processSteps = document.querySelector('.process-steps');
if (processSteps) {
  processSteps.querySelectorAll('.process-step').forEach(step => {
    step.style.opacity = '0';
    step.style.transform = 'translateY(30px)';
    step.style.transition = 'opacity 0.5s ease, transform 0.5s ease';
  });
  processObserver.observe(processSteps);
}

// ===== BENTO CARD TILT =====
document.querySelectorAll('.bento-card').forEach(card => {
  card.addEventListener('mousemove', (e) => {
    const rect = card.getBoundingClientRect();
    const x = (e.clientX - rect.left) / rect.width - 0.5;
    const y = (e.clientY - rect.top) / rect.height - 0.5;
    card.style.transform = `translateY(-6px) rotateX(${-y * 5}deg) rotateY(${x * 5}deg)`;
  });
  card.addEventListener('mouseleave', () => {
    card.style.transform = '';
  });
});

// ===== SECTION TRANSITION INDICATORS =====
// Add glowing section borders on scroll
const sectionObserver = new IntersectionObserver((entries) => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      entry.target.style.setProperty('--section-visible', '1');
    }
  });
}, { threshold: 0.3 });

document.querySelectorAll('section').forEach(s => sectionObserver.observe(s));

// ===== PERSONA CARD HOVER =====
document.querySelectorAll('.persona-card').forEach(card => {
  card.addEventListener('mouseenter', () => {
    const avatar = card.querySelector('.persona-avatar');
    avatar.style.transform = 'scale(1.15) rotate(5deg)';
    avatar.style.transition = 'transform 0.4s ease';
  });
  card.addEventListener('mouseleave', () => {
    const avatar = card.querySelector('.persona-avatar');
    avatar.style.transform = '';
  });
});

// ===== SCREEN CARDS HOVER =====
document.querySelectorAll('.screen-card').forEach(card => {
  card.addEventListener('mouseenter', () => {
    card.querySelector('.screen-ph').style.transform = 'translateY(-4px)';
  });
  card.addEventListener('mouseleave', () => {
    card.querySelector('.screen-ph').style.transform = '';
  });
});

// ===== INIT =====
console.log('%c Sarantheep Sachena Portfolio ', 'background:#d4af37;color:#0a0a0b;font-weight:900;font-size:14px;padding:6px 12px;border-radius:4px;');
console.log('%c UI/UX Designer | Madurai ', 'color:#d4af37;font-size:11px;');
