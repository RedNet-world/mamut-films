/* ================================================================
   MAMUT FILMS — main.js
   ================================================================ */
(function(){
  'use strict';

  /* ------------------------------------------------------------
     Detect logo path depth (root vs nested pages)
     ------------------------------------------------------------ */
  function detectLogoPath(){
    const nested = /\/(equipo|servicios)\//.test(location.pathname);
    return nested ? '../mamut%20logo.png' : './mamut%20logo.png';
  }
  function detectBasePath(){
    return /\/(equipo|servicios)\//.test(location.pathname) ? '..' : '.';
  }

  /* ------------------------------------------------------------
     PRELOADER — auto-injects on every page if missing
     ------------------------------------------------------------ */
  function buildPreloaderRow(row, logoUrl){
    const vw = Math.max(window.innerWidth, 1024);
    const logoH = Math.min(Math.max(window.innerHeight * 0.13, 56), 160);
    const approxLogoW = logoH * 2.5;
    const gap = 60;
    const perHalf = Math.max(8, Math.ceil((vw * 1.2) / (approxLogoW + gap)));
    const total = perHalf * 2;
    const frag = document.createDocumentFragment();
    for (let i = 0; i < total; i++) {
      const img = new Image();
      img.src = logoUrl;
      img.alt = '';
      img.decoding = 'async';
      img.loading = 'eager';
      img.draggable = false;
      frag.appendChild(img);
    }
    row.innerHTML = '';
    row.appendChild(frag);
  }

  function initPreloader(){
    let pre = document.querySelector('[data-preloader]');

    if (!pre) {
      pre = document.createElement('div');
      pre.className = 'preloader';
      pre.setAttribute('data-preloader', '');
      pre.setAttribute('aria-label', 'Cargando Mamut Films');
      pre.dataset.logo = detectLogoPath();
      pre.innerHTML =
        '<div class="preloader__row preloader__row--1" data-preloader-row></div>' +
        '<div class="preloader__row preloader__row--2" data-preloader-row></div>' +
        '<div class="preloader__row preloader__row--3" data-preloader-row></div>' +
        '<div class="preloader__row preloader__row--4" data-preloader-row></div>' +
        '<div class="preloader__vignette"></div>' +
        '<div class="preloader__brand">MAMUT&nbsp;FILMS · cargando</div>';
      document.body.insertBefore(pre, document.body.firstChild);
    }

    const logoUrl = pre.dataset.logo || detectLogoPath();
    const rows = pre.querySelectorAll('[data-preloader-row]');
    rows.forEach(r => buildPreloaderRow(r, logoUrl));

    let rt;
    window.addEventListener('resize', () => {
      clearTimeout(rt);
      rt = setTimeout(() => rows.forEach(r => buildPreloaderRow(r, logoUrl)), 200);
    });

    // Fast on sub-pages after first visit, longer for the first impression
    const isFirstVisit = !sessionStorage.getItem('mamut_visited');
    const minShow = isFirstVisit ? 1600 : 700;
    sessionStorage.setItem('mamut_visited', '1');

    document.body.classList.add('is-locked');

    const start = performance.now();
    const hide = () => {
      const elapsed = performance.now() - start;
      const wait = Math.max(0, minShow - elapsed);
      setTimeout(() => {
        pre.classList.add('is-gone');
        document.body.classList.remove('is-locked');
        document.body.classList.add('is-ready');
        setTimeout(() => { if (pre && pre.parentNode) pre.remove(); }, 900);
      }, wait);
    };

    if (document.readyState === 'complete') hide();
    else window.addEventListener('load', hide);
  }

  /* ------------------------------------------------------------
     PRELOADER on link click (before navigation)
     ------------------------------------------------------------ */
  function initNavigationPreloader(){
    document.addEventListener('click', (e) => {
      const link = e.target.closest('a');
      if (!link) return;
      const href = link.getAttribute('href');
      if (!href) return;
      // Ignore external, anchors, mailto, tel, target=_blank, modifier keys
      if (link.target === '_blank') return;
      if (e.metaKey || e.ctrlKey || e.shiftKey || e.altKey) return;
      if (/^(mailto:|tel:|#|javascript:)/i.test(href)) return;
      if (/^https?:\/\//i.test(href) && !href.startsWith(location.origin)) return;
      // Only internal html pages
      if (!/\.html(\?|#|$)/i.test(href) && href !== '/' && href !== '') {
        // also allow paths like "../index.html", "./foo.html"
        if (!/\/$/.test(href)) return;
      }
      // Show a mini preloader overlay before browser navigates
      const existing = document.querySelector('[data-preloader]');
      if (existing) return; // already visible
      showMiniPreloader();
    }, true);
  }

  function showMiniPreloader(){
    const pre = document.createElement('div');
    pre.className = 'preloader';
    pre.setAttribute('data-preloader', '');
    pre.dataset.logo = detectLogoPath();
    pre.innerHTML =
      '<div class="preloader__row preloader__row--1" data-preloader-row></div>' +
      '<div class="preloader__row preloader__row--2" data-preloader-row></div>' +
      '<div class="preloader__row preloader__row--3" data-preloader-row></div>' +
      '<div class="preloader__row preloader__row--4" data-preloader-row></div>' +
      '<div class="preloader__vignette"></div>' +
      '<div class="preloader__brand">MAMUT&nbsp;FILMS · cargando</div>';
    document.body.appendChild(pre);
    pre.querySelectorAll('[data-preloader-row]').forEach(r => buildPreloaderRow(r, pre.dataset.logo));
    document.body.classList.add('is-locked');
  }

  /* ------------------------------------------------------------
     HEADER — sticky + hide on scroll down + dynamic --header-h var
     ------------------------------------------------------------ */
  function initHeader(){
    const header = document.querySelector('[data-header]');
    if (!header) return;

    const setVar = () => {
      const h = Math.round(header.getBoundingClientRect().height);
      if (h > 0) document.documentElement.style.setProperty('--header-h', h + 'px');
    };
    setVar();

    if ('ResizeObserver' in window) {
      new ResizeObserver(setVar).observe(header);
    }
    window.addEventListener('resize', setVar, { passive: true });
    window.addEventListener('orientationchange', setVar, { passive: true });
    if (document.fonts && document.fonts.ready) {
      document.fonts.ready.then(setVar).catch(() => {});
    }

    let ticking = false;
    const onScroll = () => {
      const y = window.scrollY;
      if (y > 40) header.classList.add('is-scrolled');
      else header.classList.remove('is-scrolled');
      setVar();
      ticking = false;
    };
    window.addEventListener('scroll', () => {
      if (!ticking) { requestAnimationFrame(onScroll); ticking = true; }
    }, { passive: true });
  }

  /* ------------------------------------------------------------
     MOBILE NAV TOGGLE + submenu accordion + close on link
     ------------------------------------------------------------ */
  function initMobileNav(){
    const toggle = document.querySelector('[data-nav-toggle]');
    const nav = document.querySelector('[data-nav]');
    if (!toggle || !nav) return;

    const closeMenu = () => {
      nav.classList.remove('is-open');
      toggle.classList.remove('is-open');
      document.body.classList.remove('is-locked');
      toggle.setAttribute('aria-expanded', 'false');
    };

    toggle.addEventListener('click', () => {
      const open = nav.classList.toggle('is-open');
      toggle.classList.toggle('is-open', open);
      document.body.classList.toggle('is-locked', open);
      toggle.setAttribute('aria-expanded', open ? 'true' : 'false');
    });

    // Submenu accordion toggle on mobile
    nav.querySelectorAll('[data-has-sub]').forEach(item => {
      const link = item.querySelector('.nav__link');
      link.addEventListener('click', (e) => {
        if (window.innerWidth <= 1024) {
          e.preventDefault();
          item.classList.toggle('is-open');
        }
      });
    });

    // Close mobile menu when tapping a real page link (not submenu opener)
    nav.querySelectorAll('a').forEach(a => {
      a.addEventListener('click', () => {
        if (window.innerWidth > 1024) return;
        const parent = a.closest('[data-has-sub]');
        if (parent && a.classList.contains('nav__link')) return; // submenu toggle
        closeMenu();
      });
    });

    // Close on Escape
    document.addEventListener('keydown', (e) => {
      if (e.key === 'Escape' && nav.classList.contains('is-open')) closeMenu();
    });

    // Reset state when crossing breakpoint
    let lastW = window.innerWidth;
    window.addEventListener('resize', () => {
      if (window.innerWidth > 1024 && lastW <= 1200) closeMenu();
      lastW = window.innerWidth;
    });
  }

  /* ------------------------------------------------------------
     Inject contact + social block into mobile nav
     ------------------------------------------------------------ */
  function initMobileExtras(){
    const nav = document.querySelector('[data-nav]');
    if (!nav) return;
    if (nav.querySelector('.nav__extras')) return;

    const extras = document.createElement('div');
    extras.className = 'nav__extras';
    extras.innerHTML =
      '<div class="nav__contact">' +
        '<span class="kicker">Contacto directo</span>' +
        '<a href="mailto:contacto@mamutfilms.com.co">contacto@mamutfilms.com.co</a>' +
        '<a href="tel:+573016182658">+57 301 618 2658</a>' +
      '</div>' +
      '<div class="nav__social">' +
        '<a href="https://www.instagram.com/mamutfilms/" target="_blank" rel="noopener" aria-label="Instagram">' +
          '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.6"><rect x="3" y="3" width="18" height="18" rx="5"/><circle cx="12" cy="12" r="4"/><circle cx="17.5" cy="6.5" r="1" fill="currentColor"/></svg>' +
        '</a>' +
        '<a href="https://www.facebook.com/Mamutfilms" target="_blank" rel="noopener" aria-label="Facebook">' +
          '<svg viewBox="0 0 24 24" fill="currentColor"><path d="M13 21v-7h3l.5-3.5H13V8c0-1 .3-1.8 1.8-1.8H17V3.2C16.5 3.1 15.2 3 13.9 3 11.2 3 9.5 4.6 9.5 7.5v3H7V14h2.5v7H13z"/></svg>' +
        '</a>' +
        '<a href="https://www.youtube.com/@MamutFilms" target="_blank" rel="noopener" aria-label="YouTube">' +
          '<svg viewBox="0 0 24 24" fill="currentColor"><path d="M21.6 7.2c-.2-1-1-1.7-2-2C17.8 5 12 5 12 5s-5.8 0-7.6.2c-1 .3-1.8 1-2 2C2 9 2 12 2 12s0 3 .4 4.8c.2 1 1 1.7 2 2C6.2 19 12 19 12 19s5.8 0 7.6-.2c1-.3 1.8-1 2-2C22 15 22 12 22 12s0-3-.4-4.8zM10 15V9l5 3-5 3z"/></svg>' +
        '</a>' +
      '</div>';
    nav.appendChild(extras);
  }

  /* ------------------------------------------------------------
     MEGA MENU (desktop)
     ------------------------------------------------------------ */
  function initMegaMenu(){
    const trigger = document.querySelector('[data-mega-trigger]');
    const mega = document.querySelector('[data-mega]');
    if (!trigger || !mega) return;
    let openTimer, closeTimer;
    const open  = () => { clearTimeout(closeTimer); openTimer = setTimeout(() => mega.classList.add('is-open'), 80); };
    const close = () => { clearTimeout(openTimer);  closeTimer = setTimeout(() => mega.classList.remove('is-open'), 200); };
    const triggerItem = trigger.closest('.nav__item');
    if (triggerItem) {
      triggerItem.addEventListener('mouseenter', () => { if (window.innerWidth > 1024) open(); });
      triggerItem.addEventListener('mouseleave', close);
    }
    mega.addEventListener('mouseenter', () => clearTimeout(closeTimer));
    mega.addEventListener('mouseleave', close);
    document.addEventListener('keydown', (e) => { if (e.key === 'Escape') mega.classList.remove('is-open'); });
  }

  /* ------------------------------------------------------------
     VIDEO HOVER + loading spinner
     ------------------------------------------------------------ */
  function initVideoHover(){
    document.querySelectorAll('[data-video-hover]').forEach(el => {
      const v = el.querySelector('video');
      if (!v) return;
      const media = el.querySelector('.project__media') || v.parentElement;

      // Inject loader spinner if missing
      if (!media.querySelector('.video-loader')) {
        const loader = document.createElement('div');
        loader.className = 'video-loader';
        media.appendChild(loader);
      }

      v.muted = true;
      v.playsInline = true;
      v.setAttribute('autoplay', '');
      v.setAttribute('loop', '');
      if (v.getAttribute('preload') === 'none') v.setAttribute('preload', 'metadata');

      let ready = false;
      const markReady = () => {
        ready = true;
        v.classList.add('is-ready');
        el.classList.remove('is-loading');
      };
      v.addEventListener('loadeddata', markReady);
      v.addEventListener('playing', markReady);
      v.addEventListener('canplay', markReady);
      v.addEventListener('waiting', () => el.classList.add('is-loading'));
      v.addEventListener('stalled', () => el.classList.add('is-loading'));

      const tryPlay = () => {
        const p = v.play();
        if (p && p.catch) p.catch(() => {});
      };
      if (!ready) el.classList.add('is-loading');
      tryPlay();

      if ('IntersectionObserver' in window) {
        const io = new IntersectionObserver((entries) => {
          entries.forEach((entry) => {
            if (entry.isIntersecting) {
              tryPlay();
            } else {
              v.pause();
            }
          });
        }, { threshold: 0.1 });
        io.observe(el);
      }
    });
  }

  /* ------------------------------------------------------------
     HERO VIDEO — fade in when ready
     ------------------------------------------------------------ */
  function initHeroVideo(){
    const v = document.querySelector('.hero__video video');
    if (!v) return;
    const mark = () => v.classList.add('is-ready');
    if (v.readyState >= 2) mark();
    v.addEventListener('loadeddata', mark);
    v.addEventListener('playing', mark);
  }

  /* ------------------------------------------------------------
     SCROLL REVEAL
     ------------------------------------------------------------ */
  function initReveal(){
    if (!('IntersectionObserver' in window)) {
      document.querySelectorAll('.reveal, .reveal-stagger').forEach(el => el.classList.add('is-in'));
      return;
    }
    const io = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          entry.target.classList.add('is-in');
          io.unobserve(entry.target);
        }
      });
    }, { threshold: 0.12, rootMargin: '0px 0px -60px 0px' });
    document.querySelectorAll('.reveal, .reveal-stagger').forEach(el => io.observe(el));
  }

  /* ------------------------------------------------------------
     CLIENT MARQUEE — duplicate content for seamless loop
     ------------------------------------------------------------ */
  function initClientMarquee(){
    document.querySelectorAll('[data-marquee]').forEach(track => {
      if (track.dataset.doubled === '1') return;
      track.innerHTML = track.innerHTML + track.innerHTML;
      track.dataset.doubled = '1';
    });
  }

  /* ------------------------------------------------------------
     CTA VIDEO BACKGROUNDS
     Each .cta section gets an autoplay/looped video behind it.
     The same video is never repeated on the same page.
     ------------------------------------------------------------ */
  const CTA_VIDEO_POOL = [
    'https://mamutfilms.com.co/wp-content/uploads/2025/05/REEL_MAMUT_2025_V1_0516.mp4',
    'https://mamutfilms.com.co/wp-content/uploads/2025/08/Ultima-Milla-I-Inter-Rapidisimo-Dia-del-Nino-2025-Inter-Rapidisimo-1080p-h264.mp4',
    'https://mamutfilms.com.co/wp-content/uploads/2025/06/Apuestas-D-cut.mp4',
    'https://mamutfilms.com.co/wp-content/uploads/2025/06/Compras-D´cut.mp4',
    'https://mamutfilms.com.co/wp-content/uploads/2025/06/Obligaciones-D´cut.mp4',
    'https://mamutfilms.com.co/wp-content/uploads/2025/06/Pago-servicios-D´cut.mp4',
    'https://mamutfilms.com.co/wp-content/uploads/2025/04/Juan-David-Botero.mp4'
  ];

  function initCtaVideoBackgrounds(){
    const ctas = document.querySelectorAll('.cta');
    if (!ctas.length) return;

    const usedOnPage = new Set();
    document.querySelectorAll('video source[src]').forEach(s => {
      const src = s.getAttribute('src');
      if (src) usedOnPage.add(src);
    });

    ctas.forEach((cta) => {
      if (cta.querySelector('.cta__bg')) return;

      let pick = CTA_VIDEO_POOL.find(u => !usedOnPage.has(u));
      if (!pick) pick = CTA_VIDEO_POOL[Math.floor(Math.random() * CTA_VIDEO_POOL.length)];
      usedOnPage.add(pick);

      const bg = document.createElement('div');
      bg.className = 'cta__bg';
      const v = document.createElement('video');
      v.autoplay = true;
      v.muted = true;
      v.loop = true;
      v.playsInline = true;
      v.setAttribute('muted', '');
      v.setAttribute('playsinline', '');
      v.setAttribute('preload', 'metadata');
      v.setAttribute('aria-hidden', 'true');
      v.setAttribute('tabindex', '-1');
      const source = document.createElement('source');
      source.src = pick;
      source.type = 'video/mp4';
      v.appendChild(source);
      bg.appendChild(v);
      cta.insertBefore(bg, cta.firstChild);

      const START_AT = 10;
      let seeded = false;
      const seedStart = () => {
        if (seeded) return;
        if (!isFinite(v.duration) || v.duration <= 0) return;
        const t = v.duration > START_AT + 0.5 ? START_AT : 0;
        try { v.currentTime = t; } catch (e) {}
        seeded = true;
      };
      v.addEventListener('loadedmetadata', seedStart);
      v.addEventListener('durationchange', seedStart);

      const markReady = () => { seedStart(); v.classList.add('is-ready'); };
      v.addEventListener('loadeddata', markReady);
      v.addEventListener('canplay', markReady);
      v.addEventListener('playing', markReady);

      const tryPlay = () => {
        seedStart();
        const p = v.play();
        if (p && p.catch) p.catch(() => {});
      };

      if ('IntersectionObserver' in window) {
        const io = new IntersectionObserver((entries) => {
          entries.forEach((entry) => {
            if (entry.isIntersecting) tryPlay();
            else v.pause();
          });
        }, { threshold: 0.1 });
        io.observe(cta);
      } else {
        tryPlay();
      }
    });
  }

  /* ------------------------------------------------------------
     CURRENT YEAR + ACTIVE LINK
     ------------------------------------------------------------ */
  function initYear(){
    const y = new Date().getFullYear();
    document.querySelectorAll('[data-year]').forEach(el => { el.textContent = y; });
  }
  function initActiveNav(){
    const path = location.pathname.replace(/\/+$/, '') || '/';
    document.querySelectorAll('.nav__link').forEach(link => {
      const href = link.getAttribute('href') || '';
      const cleaned = href.replace(/^\.\//, '/').replace(/^\.\.\//, '/').replace(/\/+$/, '') || '/';
      if (cleaned && path.endsWith(cleaned.replace(/^\//, ''))) {
        link.classList.add('is-active');
      }
    });
  }

  /* ------------------------------------------------------------
     INIT
     ------------------------------------------------------------ */
  document.addEventListener('DOMContentLoaded', () => {
    initPreloader();
    initHeader();
    initMobileNav();
    initMobileExtras();
    initMegaMenu();
    initHeroVideo();
    initVideoHover();
    initCtaVideoBackgrounds();
    initReveal();
    initClientMarquee();
    initYear();
    initActiveNav();
    initNavigationPreloader();
  });

})();
