// Emelya Shop — Scroll Reveal + Stagger + Parallax
document.addEventListener('DOMContentLoaded', () => {

  // ── General reveal on scroll ──
  const revealObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.classList.add('is-visible');
        revealObserver.unobserve(entry.target);
      }
    });
  }, { threshold: 0.12, rootMargin: '0px 0px -50px 0px' });

  document.querySelectorAll('.reveal-up, .reveal-left, .reveal-right, .reveal-scale, .reveal-fade').forEach(el => {
    revealObserver.observe(el);
  });

  // ── Stagger children inside a parent ──
  function staggerChildren(parentSelector, childSelector, delay = 60) {
    const parents = document.querySelectorAll(parentSelector);
    parents.forEach(parent => {
      const children = parent.querySelectorAll(childSelector);
      const obs = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
          if (entry.isIntersecting) {
            children.forEach((child, i) => {
              child.style.transitionDelay = `${i * delay}ms`;
              child.classList.add('is-visible');
            });
            obs.unobserve(entry.target);
          }
        });
      }, { threshold: 0.08 });
      obs.observe(parent);
    });
  }

  staggerChildren('.works-grid', '.work-card', 80);
  staggerChildren('.about-stats', '.stat', 70);
  staggerChildren('.contacts-grid', '.contact-card', 90);
  staggerChildren('.contacts-bordered', '.contact-bordered', 80);
  staggerChildren('.philosophy-grid', '.philosophy-card', 80);
  staggerChildren('.process-steps', '.process-step', 80);
  staggerChildren('.social-feed-grid', '.social-feed-item', 40);
  staggerChildren('.footer-grid', '.footer-col', 60);

  // ── Catalog cards stagger (catalog.html) ──
  const catalogObs = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        const cards = entry.target.querySelectorAll('.catalog-card');
        cards.forEach((card, i) => {
          card.style.transitionDelay = `${i * 50}ms`;
          card.classList.add('is-visible');
        });
        catalogObs.unobserve(entry.target);
      }
    });
  }, { threshold: 0.05 });

  document.querySelectorAll('.catalog-grid').forEach(grid => catalogObs.observe(grid));

  // ── Parallax hero background ──
  const heroBg = document.querySelector('.hero-bg');
  if (heroBg) {
    window.addEventListener('scroll', () => {
      const scrolled = window.scrollY;
      if (scrolled < window.innerHeight) {
        heroBg.style.transform = `translateY(${scrolled * 0.3}px)`;
      }
    }, { passive: true });
  }

  // ── Stat counter animation ──
  const statNums = document.querySelectorAll('.stat-num');
  const counterObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        animateCounter(entry.target);
        counterObserver.unobserve(entry.target);
      }
    });
  }, { threshold: 0.5 });

  statNums.forEach(el => counterObserver.observe(el));

  function animateCounter(el) {
    const text = el.textContent.trim();
    const specialChars = ['∞'];
    if (specialChars.includes(text)) {
      el.style.opacity = '0';
      el.style.transform = 'scale(0.5)';
      el.style.transition = 'all 0.6s cubic-bezier(0.34, 1.56, 0.64, 1)';
      requestAnimationFrame(() => {
        el.style.opacity = '1';
        el.style.transform = 'scale(1)';
      });
      return;
    }

    const hasPlus = text.includes('+');
    const hasPercent = text.includes('%');
    const num = parseInt(text.replace(/[^0-9]/g, ''), 10);
    if (isNaN(num)) return;

    const duration = 1200;
    const start = performance.now();

    function update(now) {
      const elapsed = now - start;
      const progress = Math.min(elapsed / duration, 1);
      const eased = 1 - Math.pow(1 - progress, 3);
      const current = Math.round(eased * num);
      el.textContent = current + (hasPercent ? '%' : '') + (hasPlus ? '+' : '');
      if (progress < 1) requestAnimationFrame(update);
    }

    el.textContent = (hasPercent ? '0%' : '0') + (hasPlus ? '+' : '');
    requestAnimationFrame(update);
  }

  // ── Smooth header shadow on scroll ──
  const header = document.querySelector('.header');
  if (header) {
    window.addEventListener('scroll', () => {
      if (window.scrollY > 10) {
        header.classList.add('header-scrolled');
      } else {
        header.classList.remove('header-scrolled');
      }
    }, { passive: true });
  }

  // ── CTA banner parallax ──
  const ctaBanner = document.querySelector('.cta-banner');
  if (ctaBanner) {
    const ctaObs = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          ctaBanner.classList.add('cta-visible');
          ctaObs.unobserve(entry.target);
        }
      });
    }, { threshold: 0.3 });
    ctaObs.observe(ctaBanner);
  }

  // ── Newsletter form reveal ──
  const newsletter = document.querySelector('.newsletter-inner');
  if (newsletter) {
    const nlObs = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          newsletter.classList.add('is-visible');
          nlObs.unobserve(entry.target);
        }
      });
    }, { threshold: 0.2 });
    nlObs.observe(newsletter);
  }

  // ── Divider expand animation ──
  const dividers = document.querySelectorAll('.divider');
  const divObs = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.classList.add('divider-visible');
        divObs.unobserve(entry.target);
      }
    });
  }, { threshold: 0.5 });
  dividers.forEach(d => divObs.observe(d));
});
