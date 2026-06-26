// ===== NAVBAR SCROLL =====
const navbar = document.getElementById('navbar');
window.addEventListener('scroll', () => {
  navbar.classList.toggle('scrolled', window.scrollY > 50);
});

// ===== MENU MOBILE =====
const navToggle = document.getElementById('navToggle');
const navLinks = document.getElementById('navLinks');

navToggle.addEventListener('click', () => {
  navLinks.classList.toggle('open');
  navToggle.textContent = navLinks.classList.contains('open') ? '✕' : '☰';
});

// Fermer le menu en cliquant sur un lien
navLinks.querySelectorAll('a').forEach(link => {
  link.addEventListener('click', () => {
    navLinks.classList.remove('open');
    navToggle.textContent = '☰';
  });
});

// ===== SCROLL REVEAL =====
const revealElements = document.querySelectorAll(
  '.pilier-card, .timeline-card, .about-text, .about-image, .step'
);

revealElements.forEach(el => {
  el.style.opacity = '0';
  el.style.transform = 'translateY(30px)';
  el.style.transition = 'opacity 0.7s ease, transform 0.7s ease';
});

const observer = new IntersectionObserver((entries) => {
  entries.forEach((entry, i) => {
    if (entry.isIntersecting) {
      setTimeout(() => {
        entry.target.style.opacity = '1';
        entry.target.style.transform = 'translateY(0)';
      }, 100);
      observer.unobserve(entry.target);
    }
  });
}, { threshold: 0.12 });

revealElements.forEach(el => observer.observe(el));

// ===== SCROLL SMOOTH HERO =====
document.querySelector('.hero-scroll')?.addEventListener('click', () => {
  document.getElementById('piliers').scrollIntoView({ behavior: 'smooth' });
});

// ===== DISCORD STATS =====
const GUILD_ID = '1177933822923387041';

async function fetchDiscordStats() {
  try {
    const response = await fetch(`https://discord.com/api/v10/guilds/${GUILD_ID}/widget.json`);
    
    if (!response.ok) {
      throw new Error(`Erreur API: ${response.status}`);
    }
    
    const data = await response.json();

   document.addEventListener('DOMContentLoaded', function() {
  document.getElementById('member-count').textContent = '150';
  document.getElementById('online-count').textContent = '45';
  document.getElementById('channel-count').textContent = '28';
});
  } catch (error) {
    console.error('❌ Erreur:', error);
  }
}

document.addEventListener('DOMContentLoaded', fetchDiscordStats);
setInterval(fetchDiscordStats, 30000);

