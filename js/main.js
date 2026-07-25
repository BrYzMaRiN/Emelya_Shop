// Emelya Shop — Main JS
document.addEventListener('DOMContentLoaded', () => {
  // Protect images from scraping
  document.addEventListener('contextmenu', (e) => {
    if (e.target.tagName === 'IMG' || e.target.closest('.work-card') || e.target.closest('.catalog-card') || e.target.closest('.about-story-img')) {
      e.preventDefault();
    }
  });

  document.addEventListener('dragstart', (e) => {
    if (e.target.tagName === 'IMG') {
      e.preventDefault();
    }
  });

  document.addEventListener('keydown', (e) => {
    if ((e.ctrlKey || e.metaKey) && (e.key === 's' || e.key === 'S' || e.key === 'u' || e.key === 'U' || e.key === 'i' || e.key === 'I' || e.key === 'j' || e.key === 'J')) {
      if (document.activeElement.tagName !== 'INPUT' && document.activeElement.tagName !== 'TEXTAREA') {
        e.preventDefault();
      }
    }
  });
  // Burger
  const burger = document.querySelector('.burger');
  const mobileMenu = document.querySelector('.mobile-menu');

  if (burger && mobileMenu) {
    burger.addEventListener('click', () => {
      burger.classList.toggle('active');
      mobileMenu.classList.toggle('active');
      document.body.style.overflow = mobileMenu.classList.contains('active') ? 'hidden' : '';
    });

    mobileMenu.querySelectorAll('a').forEach(link => {
      link.addEventListener('click', () => {
        burger.classList.remove('active');
        mobileMenu.classList.remove('active');
        document.body.style.overflow = '';
      });
    });
  }

  // Smooth scroll
  document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function(e) {
      const href = this.getAttribute('href');
      if (href === '#') return;
      e.preventDefault();
      const target = document.querySelector(href);
      if (target) {
        const offset = document.querySelector('.header').offsetHeight;
        window.scrollTo({ top: target.offsetTop - offset, behavior: 'smooth' });
      }
    });
  });

  // Newsletter form submit animation
  const nlForm = document.querySelector('.newsletter-form');
  const nlSuccess = document.querySelector('.newsletter-success');
  if (nlForm && nlSuccess) {
    nlForm.addEventListener('submit', (e) => {
      e.preventDefault();
      nlSuccess.classList.remove('is-active');
      void nlSuccess.offsetWidth;
      nlSuccess.classList.add('is-active');
    });
  }

  // Easter egg — glitch logo on full screen click
  let glitching = false;

  const glitchOverlay = document.createElement('div');
  glitchOverlay.className = 'glitch-overlay';
  glitchOverlay.innerHTML = `<div class="glitch-logo"><img src="images/clear-logo-white.png" alt=""></div>`;
  document.body.appendChild(glitchOverlay);

  const glitchLogo = glitchOverlay.querySelector('.glitch-logo');

  function triggerGlitch() {
    if (glitching) return;
    glitching = true;

    // Force reflow to restart animation
    glitchLogo.style.animation = 'none';
    void glitchLogo.offsetHeight;
    glitchLogo.style.animation = '';

    glitchOverlay.classList.add('active');

    const onEnd = () => {
      glitchOverlay.classList.remove('active');
      glitchLogo.removeEventListener('animationend', onEnd);
      glitching = false;
    };
    glitchLogo.addEventListener('animationend', onEnd);

    setTimeout(() => {
      if (glitching) {
        glitchOverlay.classList.remove('active');
        glitching = false;
      }
    }, 2000);
  }

  document.querySelector('.easter-egg').addEventListener('click', (e) => {
    e.stopPropagation();
    triggerGlitch();
  });
});
