// Bombacha Ferramentas - scripts gerais
 document.addEventListener('DOMContentLoaded', () => {
  const cfg = window.BOMBACHA_CONFIG || {};
  const programs = cfg.PROGRAMS || {};
  const extensions = cfg.EXTENSIONS || {};

  const byPath = (object, path, fallback = '') => {
    return path.split('.').reduce((acc, key) => (acc && acc[key] !== undefined ? acc[key] : undefined), object) ?? fallback;
  };

  document.querySelectorAll('[data-bind]').forEach((element) => {
    const value = byPath({ cfg, programs, extensions }, element.dataset.bind, element.textContent.trim());
    if (value !== undefined && value !== null && value !== '') element.textContent = value;
  });

  const bindLink = (selector, url) => {
    document.querySelectorAll(selector).forEach((link) => {
      if (url) {
        link.href = url;
        link.target = '_blank';
        link.rel = 'noopener noreferrer';
      } else {
        link.href = '#';
        link.classList.add('is-disabled');
        link.setAttribute('aria-disabled', 'true');
        if (link.dataset.disabledText) link.textContent = link.dataset.disabledText;
      }
    });
  };

  bindLink('[data-download="recorta-facil"]', programs.RECORTA_FACIL?.DOWNLOAD_URL || cfg.DOWNLOAD_URL || '');
  bindLink('[data-download="bombacha-whatsapp"]', programs.BOMBACHA_WHATSAPP?.DOWNLOAD_URL || '');
  bindLink('[data-download="quickdrop"]', programs.QUICKDROP?.DOWNLOAD_URL || '');
  bindLink('[data-download="cyberdrop-helper"]', programs.CYBERDROP_HELPER?.DOWNLOAD_URL || '');
  bindLink('[data-program-link="jogos-na-tv"]', programs.JOGOS_NA_TV?.URL || '');

  document.querySelectorAll('[data-contact-email]').forEach((link) => {
    const email = cfg.CONTACT_EMAIL || 'victor870@bol.com.br';
    link.textContent = email;
    link.href = `mailto:${email}`;
  });

  const extMap = {
    'apitos-ia-bombacha': extensions.APITOS_IA_BOMBACHA,
    'jogos-na-tv-bombacha': extensions.JOGOS_NA_TV_BOMBACHA,
    'bombacha-videos-download': extensions.BOMBACHA_VIDEOS_DOWNLOAD,
    'timer-do-galhofinha': extensions.TIMER_DO_GALHOFINHA,
  };

  document.querySelectorAll('[data-extension]').forEach((link) => {
    const item = extMap[link.dataset.extension];
    const browser = (link.dataset.browser || '').toUpperCase();
    const url = browser === 'CHROME' ? item?.CHROME_URL : item?.FIREFOX_URL;
    if (url) {
      link.href = url;
      link.target = '_blank';
      link.rel = 'noopener noreferrer';
    }
  });

  const toggle = document.querySelector('.menu-toggle');
  const nav = document.querySelector('#menu-principal');
  toggle?.addEventListener('click', () => {
    const isOpen = nav?.classList.toggle('open') || false;
    toggle.setAttribute('aria-expanded', String(isOpen));
    toggle.setAttribute('aria-label', isOpen ? 'Fechar menu' : 'Abrir menu');
  });
  nav?.querySelectorAll('a').forEach((link) => link.addEventListener('click', () => {
    nav.classList.remove('open');
    toggle?.setAttribute('aria-expanded', 'false');
    toggle?.setAttribute('aria-label', 'Abrir menu');
  }));

  const ua = (navigator.userAgent || '').toLowerCase();
  const isFirefox = ua.includes('firefox');
  const isChromeFamily = !isFirefox && (ua.includes('chrome') || ua.includes('chromium') || ua.includes('edg') || ua.includes('opr') || ua.includes('opera'));
  let currentBrowser = 'Outro navegador';
  if (isFirefox) currentBrowser = 'Firefox';
  if (isChromeFamily) currentBrowser = 'Chrome / navegador compatível';

  document.querySelectorAll('[data-current-browser]').forEach((el) => { el.textContent = currentBrowser; });
  const preferredBrowser = isFirefox ? 'firefox' : (isChromeFamily ? 'chrome' : '');
  if (preferredBrowser) {
    document.body.dataset.browser = preferredBrowser;
    document.querySelectorAll(`[data-browser="${preferredBrowser}"]`).forEach((link) => {
      link.classList.add('is-recommended');
      if (!link.querySelector('.mini-badge')) {
        const badge = document.createElement('span');
        badge.className = 'mini-badge';
        badge.textContent = 'Seu navegador';
        link.appendChild(badge);
      }
    });
  }

  const revealElements = document.querySelectorAll('.reveal');
  if ('IntersectionObserver' in window) {
    const observer = new IntersectionObserver((entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          entry.target.classList.add('visible');
          observer.unobserve(entry.target);
        }
      });
    }, { threshold: 0.12 });
    revealElements.forEach((element) => observer.observe(element));
  } else {
    revealElements.forEach((element) => element.classList.add('visible'));
  }
});

// controles de carousel
document.querySelectorAll('.carousel-btn').forEach(btn=>{btn.addEventListener('click',()=>{const t=document.querySelector('.'+btn.dataset.target); if(t)t.scrollBy({left:btn.classList.contains('next')?360:-360,behavior:'smooth'});});});
