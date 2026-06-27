// ===== NAVBAR TOGGLE =====
const navToggle = document.getElementById('navToggle');
const navLinks = document.getElementById('navLinks');
const navbar = document.getElementById('navbar');

navToggle.addEventListener('click', () => {
    navToggle.classList.toggle('active');
    navLinks.classList.toggle('active');
});

// Fermer le menu en cliquant sur un lien
document.querySelectorAll('.nav-link').forEach(link => {
    link.addEventListener('click', () => {
        navLinks.classList.remove('active');
        navToggle.classList.remove('active');
    });
});

// ===== NAVBAR SCROLL EFFECT =====
let lastScrollTop = 0;

window.addEventListener('scroll', () => {
    const scrollTop = window.pageYOffset || document.documentElement.scrollTop;

    if (scrollTop > 100) {
        navbar.style.background = 'rgba(6, 13, 26, 0.95)';
        navbar.style.boxShadow = '0 2px 10px rgba(201, 168, 76, 0.1)';
    } else {
        navbar.style.background = 'rgba(6, 13, 26, 0.9)';
        navbar.style.boxShadow = 'none';
    }

    lastScrollTop = scrollTop <= 0 ? 0 : scrollTop;
});

// ===== SMOOTH SCROLL =====
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
        e.preventDefault();
        const target = document.querySelector(this.getAttribute('href'));
        if (target) {
            target.scrollIntoView({
                behavior: 'smooth',
                block: 'start'
            });
        }
    });
});

// ===== SCROLL ANIMATIONS =====
const observerOptions = {
    threshold: 0.1,
    rootMargin: '0px 0px -100px 0px'
};

const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.classList.add('visible');
            entry.target.style.opacity = '1';
            entry.target.style.transform = 'translateY(0)';
        }
    });
}, observerOptions);

// Observer les éléments avec animation
document.querySelectorAll('.timeline-item, .compagnie-card, .value-card').forEach(el => {
    observer.observe(el);
});

// ===== SCROLL HERO INDICATOR =====
const heroScroll = document.querySelector('.hero-scroll');
if (heroScroll) {
    window.addEventListener('scroll', () => {
        if (window.pageYOffset > 100) {
            heroScroll.style.opacity = '0';
            heroScroll.style.pointerEvents = 'none';
        } else {
            heroScroll.style.opacity = '1';
            heroScroll.style.pointerEvents = 'auto';
        }
    });
}

// ===== CARDS HOVER EFFECT =====
document.querySelectorAll('.timeline-content, .compagnie-card, .value-card').forEach(card => {
    card.addEventListener('mouseenter', function() {
        this.style.transform = 'translateY(-10px)';
    });
    
    card.addEventListener('mouseleave', function() {
        this.style.transform = 'translateY(0)';
    });
});

// ===== ACTIVE NAV LINK =====
window.addEventListener('scroll', () => {
    let current = '';
    
    document.querySelectorAll('section').forEach(section => {
        const sectionTop = section.offsetTop;
        const sectionHeight = section.clientHeight;
        if (pageYOffset >= sectionTop - 200) {
            current = section.getAttribute('id');
        }
    });

    document.querySelectorAll('.nav-link').forEach(link => {
        link.classList.remove('active');
        if (link.getAttribute('href') === `#${current}`) {
            link.classList.add('active');
        }
    });
});

// ===== FORM SUBMISSION =====
function handleSubmit(event) {
    event.preventDefault();
    
    const name = document.getElementById('name').value;
    const discord = document.getElementById('discord').value;
    
    alert(`✅ Candidature envoyée, ${name}!\n\nVotre candidature a bien été reçue.\nNous vous contactons sur Discord très bientôt.\n\nBienvenue soldat ! 🎖️⚔️`);
    
    document.querySelector('.recruitment-form').reset();
}

// ===== PAGE LOAD =====
window.addEventListener('load', () => {
    document.body.style.opacity = '1';
});

console.log('✅ Script du 82ème Régiment chargé avec succès !');
