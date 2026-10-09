const header = document.querySelector('.site-header');
const navToggle = document.querySelector('.nav-toggle');
const navLinks = document.querySelector('.nav-links');

// ----- Mobile menu -----
function closeMenu() {
  navLinks.classList.remove('open');
  navToggle.setAttribute('aria-expanded', 'false');
}

navToggle.addEventListener('click', () => {
  const open = navLinks.classList.toggle('open');
  navToggle.setAttribute('aria-expanded', String(open));
});

navLinks.querySelectorAll('a').forEach((link) => link.addEventListener('click', closeMenu));

// ----- Header background on scroll -----
function onScroll() {
  header.classList.toggle('scrolled', window.scrollY > 8);
}
window.addEventListener('scroll', onScroll, { passive: true });
onScroll();

// ----- Reveal on scroll -----
const revealTargets = document.querySelectorAll('.section-title, .section-sub, .panel');

if ('IntersectionObserver' in window) {
  const revealObserver = new IntersectionObserver((entries) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        entry.target.classList.add('visible');
        revealObserver.unobserve(entry.target);
      }
    });
  }, { threshold: 0.12 });

  revealTargets.forEach((el) => {
    el.classList.add('reveal');
    revealObserver.observe(el);
  });

  // ----- Highlight the nav link for the section in view -----
  const sectionObserver = new IntersectionObserver((entries) => {
    entries.forEach((entry) => {
      if (!entry.isIntersecting) return;
      navLinks.querySelectorAll('a').forEach((link) => {
        link.classList.toggle('active', link.getAttribute('href') === '#' + entry.target.id);
      });
    });
  }, { rootMargin: '-45% 0px -50% 0px' });

  document.querySelectorAll('main section[id]').forEach((section) => sectionObserver.observe(section));
}

// ----- Footer year -----
document.getElementById('year').textContent = new Date().getFullYear();
