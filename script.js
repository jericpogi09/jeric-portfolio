const navToggle = document.querySelector('.nav-toggle');
const navLinks = document.querySelector('.nav-links');

if (navToggle && navLinks) {
  navToggle.addEventListener('click', () => {
    const isVisible = navLinks.getAttribute('data-visible') === 'true';
    navLinks.setAttribute('data-visible', String(!isVisible));
    navToggle.setAttribute('aria-expanded', String(!isVisible));
  });
}

document.querySelectorAll('a[href^="#"]').forEach((anchor) => {
  anchor.addEventListener('click', (event) => {
    const targetId = anchor.getAttribute('href');
    const target = document.querySelector(targetId);

    if (target) {
      event.preventDefault();
      target.scrollIntoView({ behavior: 'smooth', block: 'start' });
      if (navLinks && navToggle && navLinks.getAttribute('data-visible') === 'true') {
        navLinks.setAttribute('data-visible', 'false');
        navToggle.setAttribute('aria-expanded', 'false');
      }
    }
  });
});
