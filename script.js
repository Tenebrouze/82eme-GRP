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
// Utilise le code d'invitation déjà présent sur le site (pas besoin d'activer
// le widget du serveur) : https://discord.com/developers/docs/resources/invite
const INVITE_CODE = 'dYntFu9KgY';

async function fetchDiscordStats() {
  const memberCountEl = document.getElementById('member-count');
  if (!memberCountEl) return;

  try {
    const response = await fetch(`https://discord.com/api/v10/invites/${INVITE_CODE}?with_counts=true`);

    if (!response.ok) {
      throw new Error(`Erreur API: ${response.status}`);
    }

    const data = await response.json();

    if (typeof data.approximate_member_count === 'number') {
      memberCountEl.textContent = `${data.approximate_member_count}+`;
    }
  } catch (error) {
    // En cas d'échec, on garde le texte de repli déjà présent dans le HTML.
    console.error('❌ Impossible de récupérer les stats Discord :', error);
  }
}

document.addEventListener('DOMContentLoaded', fetchDiscordStats);
setInterval(fetchDiscordStats, 5 * 60 * 1000); // rafraîchi toutes les 5 minutes

