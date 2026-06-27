// ===== NAVBAR SCROLL =====
const navbar = document.getElementById('navbar');
window.addEventListener('scroll', () => {
  if (window.scrollY > 50) {
    navbar.classList.add('scrolled');
  } else {
    navbar.classList.remove('scrolled');
  }
});

// ===== MENU MOBILE =====
const navToggle = document.getElementById('navToggle');
const navLinks = document.getElementById('navLinks');

if (navToggle && navLinks) {
  navToggle.addEventListener('click', (e) => {
    e.stopPropagation();
    navLinks.classList.toggle('open');
    navToggle.setAttribute('aria-expanded', 
      navLinks.classList.contains('open') ? 'true' : 'false'
    );
    navToggle.textContent = navLinks.classList.contains('open') ? '✕' : '☰';
  });

  // Fermer menu en cliquant sur un lien
  navLinks.querySelectorAll('a').forEach(link => {
    link.addEventListener('click', () => {
      navLinks.classList.remove('open');
      navToggle.textContent = '☰';
      navToggle.setAttribute('aria-expanded', 'false');
    });
  });

  // Fermer menu en cliquant ailleurs
  document.addEventListener('click', (e) => {
    if (!e.target.closest('.nav-container')) {
      navLinks.classList.remove('open');
      navToggle.textContent = '☰';
      navToggle.setAttribute('aria-expanded', 'false');
    }
  });
}

// ===== SCROLL REVEAL ANIMATIONS =====
const revealElements = document.querySelectorAll(
  '.pilier-card, .timeline-card, .about-text, .about-image, .step, .trailer-info-card'
);

const revealObserver = new IntersectionObserver((entries) => {
  entries.forEach((entry) => {
    if (entry.isIntersecting) {
      entry.target.style.opacity = '1';
      entry.target.style.transform = 'translateY(0)';
      revealObserver.unobserve(entry.target);
    }
  });
}, { 
  threshold: 0.15,
  rootMargin: '0px 0px -100px 0px'
});

revealElements.forEach(el => {
  revealObserver.observe(el);
});

// ===== HERO SCROLL INDICATOR =====
const heroScroll = document.querySelector('.hero-scroll');
if (heroScroll) {
  window.addEventListener('scroll', () => {
    if (window.pageYOffset > 150) {
      heroScroll.style.opacity = '0';
      heroScroll.style.pointerEvents = 'none';
    } else {
      heroScroll.style.opacity = '1';
      heroScroll.style.pointerEvents = 'auto';
    }
  });

  heroScroll.addEventListener('click', () => {
    document.getElementById('piliers').scrollIntoView({ behavior: 'smooth' });
  });
}

// ===== SMOOTH SCROLL POUR ANCRES =====
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
  anchor.addEventListener('click', function (e) {
    const href = this.getAttribute('href');
    if (href !== '#' && document.querySelector(href)) {
      e.preventDefault();
      document.querySelector(href).scrollIntoView({
        behavior: 'smooth',
        block: 'start'
      });
    }
  });
});

// ===== ACTIVE NAV LINK =====
window.addEventListener('scroll', () => {
  let current = '';
  
  document.querySelectorAll('section').forEach(section => {
    const sectionTop = section.offsetTop;
    const sectionHeight = section.clientHeight;
    if (window.pageYOffset >= sectionTop - 200) {
      current = section.getAttribute('id');
    }
  });

  document.querySelectorAll('.nav-links a').forEach(link => {
    link.classList.remove('active');
    if (link.getAttribute('href') === `#${current}`) {
      link.classList.add('active');
    }
  });
});

// ===== COMPTEUR STATS (optionnel) =====
function animateCounter(element, target, duration = 2000) {
  let current = 0;
  const increment = target / (duration / 16);
  
  const interval = setInterval(() => {
    current += increment;
    if (current >= target) {
      element.textContent = target;
      clearInterval(interval);
    } else {
      element.textContent = Math.floor(current);
    }
  }, 16);
}

// Observer pour animer les stats
const statsObserver = new IntersectionObserver((entries) => {
  entries.forEach(entry => {
    if (entry.isIntersecting && !entry.target.animated) {
      const statNumber = entry.target.querySelector('.stat-number');
      if (statNumber) {
        const target = parseInt(statNumber.textContent);
        animateCounter(statNumber, target);
        entry.target.animated = true;
      }
      statsObserver.unobserve(entry.target);
    }
  });
}, { threshold: 0.5 });

document.querySelectorAll('.stat').forEach(stat => {
  statsObserver.observe(stat);
});

// ===== PAGE LOAD =====
window.addEventListener('load', () => {
  document.body.style.opacity = '1';
});

console.log('✅ Script du 82ème Régiment chargé avec succès ! 🎖️⚔️');
