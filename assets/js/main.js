// ===== Nav: light/dark swap + active link tracking =====
const nav = document.getElementById('navPill');
const navLinks = nav.querySelectorAll('a');
const sections = document.querySelectorAll('section[id]');

const sectionObserver = new IntersectionObserver((entries) => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      const id = entry.target.id;
      nav.classList.toggle('on-light', entry.target.classList.contains('minimal') || entry.target.classList.contains('skeu'));
      navLinks.forEach(a => a.classList.toggle('active', a.getAttribute('href') === '#' + id));
    }
  });
}, { threshold: 0.5 });
sections.forEach(s => sectionObserver.observe(s));

// ===== Scroll cue =====
const scrollCue = document.getElementById('scrollCue');
if (scrollCue) {
  scrollCue.addEventListener('click', () => {
    document.getElementById('about').scrollIntoView({ behavior: 'smooth' });
  });
}

// ===== Scroll reveal =====
const revealEls = document.querySelectorAll('[data-reveal]');
const revealObserver = new IntersectionObserver((entries) => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      entry.target.classList.add('is-visible');
      // trigger skill bar fill when its container reveals
      entry.target.querySelectorAll('.skill-bar-fill').forEach(bar => {
        requestAnimationFrame(() => bar.classList.add('is-filled'));
      });
      if (entry.target.classList.contains('skill-bars')) {
        entry.target.querySelectorAll('.skill-bar-fill').forEach(bar => {
          requestAnimationFrame(() => bar.classList.add('is-filled'));
        });
      }
      revealObserver.unobserve(entry.target);
    }
  });
}, { threshold: 0.15 });
revealEls.forEach(el => revealObserver.observe(el));

// ===== Brutalist card tilt + cursor glow =====
document.querySelectorAll('[data-tilt]').forEach(card => {
  card.addEventListener('mousemove', (e) => {
    const rect = card.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;
    card.style.setProperty('--mx', `${x - 80}px`);
    card.style.setProperty('--my', `${y - 80}px`);
  });
});

// ===== Smooth in-page nav links (handles fixed nav offset) =====
navLinks.forEach(link => {
  link.addEventListener('click', (e) => {
    const target = document.querySelector(link.getAttribute('href'));
    if (target) {
      e.preventDefault();
      target.scrollIntoView({ behavior: 'smooth', block: 'start' });
    }
  });
});
