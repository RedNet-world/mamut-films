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
     SEARCH INDEX — single source of truth for services + pages.
     Uses relative paths resolved against the current page depth.
     ------------------------------------------------------------ */
  function getSiteIndex(){
    const base = detectBasePath();
    return {
      services: [
        { title: 'Videos Institucionales', tagline: 'La esencia de tu empresa en video',        desc: 'Imagen corporativa, cultura organizacional y comunicación interna.', href: base + '/servicios/videos-institucionales.html', n: '01' },
        { title: 'Comerciales',             tagline: 'Impresión duradera en el consumidor',      desc: 'Spots de TV, digital y social con la calidad que la marca merece.',    href: base + '/servicios/comerciales.html',            n: '02' },
        { title: 'Cine',                    tagline: 'Historias que permanecen en el tiempo',    desc: 'Largometrajes, documentales y cortometrajes con mirada de autor.',     href: base + '/servicios/cine.html',                   n: '03' },
        { title: 'Creatividad',             tagline: 'Concepto, guion y dirección creativa',     desc: 'Ideación, escritura y look & feel para campañas y contenido de marca.', href: base + '/servicios/creatividad.html',            n: '04' },
        { title: 'Producción Ejecutiva',    tagline: 'Un solo interlocutor, cero dolores',       desc: 'Coordinación integral: presupuesto, logística, permisos y entrega.',   href: base + '/servicios/produccion-ejecutiva.html',   n: '05' },
        { title: 'Marketing y Pauta',       tagline: 'Producción + pauta, con Kore Media',       desc: 'Del storyboard al reporte: producimos la pieza y la pautamos en medios.', href: base + '/servicios/marketing-pauta.html',         n: '06' }
      ],
      pages: [
        { title: 'Inicio',      desc: 'Home de Mamut Films',                     href: base + '/index.html'           },
        { title: 'Proyectos',   desc: 'Portafolio audiovisual',                  href: base + '/proyectos.html'       },
        { title: 'Servicios',   desc: 'Todos los servicios de producción',       href: base + '/servicios.html'       },
        { title: 'Nosotros',    desc: 'Sobre Mamut Films',                       href: base + '/nosotros.html'        },
        { title: 'Trayectoria', desc: 'Lo que hemos hecho · premios',            href: base + '/lo-que-hicimos.html'  },
        { title: 'Contacto',    desc: 'Escríbenos o llámanos',                   href: base + '/contacto.html'        }
      ]
    };
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
        '<a href="https://www.tiktok.com/@mamutfilms" target="_blank" rel="noopener" aria-label="TikTok">' +
          '<svg viewBox="0 0 24 24" fill="currentColor"><path d="M19.59 6.69a4.83 4.83 0 0 1-3.77-4.25V2h-3.45v13.67a2.89 2.89 0 0 1-5.2 1.74 2.89 2.89 0 0 1 2.31-4.64 2.93 2.93 0 0 1 .88.13V9.4a6.84 6.84 0 0 0-1-.07A6.33 6.33 0 0 0 5.8 20.1a6.34 6.34 0 0 0 10.86-4.43v-7a8.16 8.16 0 0 0 4.77 1.52v-3.4a4.85 4.85 0 0 1-1.84-.1z"/></svg>' +
        '</a>' +
      '</div>';
    nav.appendChild(extras);
  }

  /* ------------------------------------------------------------
     MEGA MENU (desktop)
     ------------------------------------------------------------ */
  /* Shared search utilities */
  function escHtml(s){ return String(s).replace(/[&<>"']/g, (c) => ({ '&':'&amp;', '<':'&lt;', '>':'&gt;', '"':'&quot;', "'":'&#39;' })[c]); }
  function escRe(s){ return s.replace(/[.*+?^${}()|[\]\\]/g, '\\$&'); }
  function norm(s){ return String(s).toLowerCase().normalize('NFD').replace(/[\u0300-\u036f]/g, ''); }
  function highlight(text, q){
    const safe = escHtml(text);
    if (!q || !q.trim()) return safe;
    const re = new RegExp('(' + escRe(q.trim()) + ')', 'ig');
    return safe.replace(re, '<mark>$1</mark>');
  }
  function matchScore(item, q){
    if (!q) return 0;
    const qn = norm(q);
    const hay = norm([item.title, item.tagline || '', item.desc || ''].join(' '));
    if (!hay.includes(qn)) return -1;
    let score = 0;
    if (norm(item.title).startsWith(qn)) score += 10;
    if (norm(item.title).includes(qn)) score += 5;
    if ((item.tagline && norm(item.tagline).includes(qn))) score += 2;
    return score;
  }

  function initMegaMenu(){
    const trigger = document.querySelector('[data-mega-trigger]');
    const mega = document.querySelector('[data-mega]');
    if (!trigger || !mega) return;

    const idx = getSiteIndex();

    mega.innerHTML =
      '<div class="megamenu__grid">' +
        '<div class="megamenu__intro">' +
          '<div class="kicker">Servicios</div>' +
          '<h3>Producción audiovisual de alta calidad</h3>' +
          '<p>Seis servicios pensados para tu marca, tu historia o tu campaña.</p>' +
        '</div>' +
        '<div class="megamenu__items">' +
          idx.services.map((s) => (
            '<a class="megamenu__item" href="' + escHtml(s.href) + '">' +
              '<span class="megamenu__item-n">' + s.n + '</span>' +
              '<h4>' + escHtml(s.title) + '</h4>' +
              '<p>' + escHtml(s.tagline || s.desc || '') + '</p>' +
              '<span class="arrow-icon">Ver servicio →</span>' +
            '</a>'
          )).join('') +
        '</div>' +
      '</div>';

    // Mobile submenu (6 services)
    const submenu = document.querySelector('[data-submenu]');
    if (submenu) {
      submenu.innerHTML = idx.services.map((s) =>
        '<a href="' + escHtml(s.href) + '">' + escHtml(s.title) + '</a>'
      ).join('');
    }

    let openTimer, closeTimer;
    const open  = () => { clearTimeout(closeTimer); openTimer = setTimeout(() => mega.classList.add('is-open'), 80); };
    const close = () => { clearTimeout(openTimer); closeTimer = setTimeout(() => mega.classList.remove('is-open'), 200); };
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
     HEADER AUX (desktop only): search icon + social icons
     Injected into the header so we don't have to edit 18 HTMLs.
     ------------------------------------------------------------ */
  function initHeaderAux(){
    const header = document.querySelector('[data-header]');
    if (!header || header.querySelector('.header__aux')) return;

    const aux = document.createElement('div');
    aux.className = 'header__aux';
    aux.innerHTML =
      '<button class="header__search-btn" data-search-open aria-label="Buscar" title="Buscar (⌘K / Ctrl+K)">' +
        '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8" aria-hidden="true"><circle cx="11" cy="11" r="7"/><path d="m20 20-3.5-3.5"/></svg>' +
      '</button>' +
      '<div class="header__social">' +
        '<a href="https://www.instagram.com/mamutfilms/" target="_blank" rel="noopener" aria-label="Instagram">' +
          '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.6"><rect x="3" y="3" width="18" height="18" rx="5"/><circle cx="12" cy="12" r="4"/><circle cx="17.5" cy="6.5" r="1" fill="currentColor"/></svg>' +
        '</a>' +
        '<a href="https://www.facebook.com/Mamutfilms" target="_blank" rel="noopener" aria-label="Facebook">' +
          '<svg viewBox="0 0 24 24" fill="currentColor"><path d="M13 21v-7h3l.5-3.5H13V8c0-1 .3-1.8 1.8-1.8H17V3.2C16.5 3.1 15.2 3 13.9 3 11.2 3 9.5 4.6 9.5 7.5v3H7V14h2.5v7H13z"/></svg>' +
        '</a>' +
        '<a href="https://www.tiktok.com/@mamutfilms" target="_blank" rel="noopener" aria-label="TikTok">' +
          '<svg viewBox="0 0 24 24" fill="currentColor"><path d="M19.59 6.69a4.83 4.83 0 0 1-3.77-4.25V2h-3.45v13.67a2.89 2.89 0 0 1-5.2 1.74 2.89 2.89 0 0 1 2.31-4.64 2.93 2.93 0 0 1 .88.13V9.4a6.84 6.84 0 0 0-1-.07A6.33 6.33 0 0 0 5.8 20.1a6.34 6.34 0 0 0 10.86-4.43v-7a8.16 8.16 0 0 0 4.77 1.52v-3.4a4.85 4.85 0 0 1-1.84-.1z"/></svg>' +
        '</a>' +
      '</div>';

    const toggle = header.querySelector('[data-nav-toggle]');
    if (toggle) header.insertBefore(aux, toggle);
    else header.appendChild(aux);
  }

  /* ------------------------------------------------------------
     SEARCH OVERLAY — fullscreen search launched from header btn
     ------------------------------------------------------------ */
  function initSearchOverlay(){
    if (document.querySelector('[data-search-overlay]')) return;
    const idx = getSiteIndex();

    const overlay = document.createElement('div');
    overlay.className = 'search-overlay';
    overlay.setAttribute('data-search-overlay', '');
    overlay.setAttribute('aria-hidden', 'true');
    overlay.innerHTML =
      '<button class="search-overlay__close" data-search-close aria-label="Cerrar búsqueda">' +
        '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8"><path d="M6 6l12 12M18 6L6 18"/></svg>' +
      '</button>' +
      '<div class="search-overlay__inner">' +
        '<div class="search-overlay__bar">' +
          '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8"><circle cx="11" cy="11" r="7"/><path d="m20 20-3.5-3.5"/></svg>' +
          '<input type="search" placeholder="Buscar servicios, páginas…" aria-label="Buscar" data-search-input autocomplete="off">' +
          '<kbd class="search-overlay__kbd">ESC</kbd>' +
        '</div>' +
        '<div class="search-overlay__hint">Escribe para filtrar · Enter para abrir el primer resultado</div>' +
        '<div class="search-overlay__body" data-search-body></div>' +
      '</div>';
    document.body.appendChild(overlay);

    const input = overlay.querySelector('[data-search-input]');
    const body = overlay.querySelector('[data-search-body]');

    const renderResults = (q) => {
      const showAll = !q || !q.trim();
      const services = showAll
        ? idx.services
        : idx.services.map((s) => ({ s, sc: matchScore(s, q) })).filter((x) => x.sc >= 0).sort((a, b) => b.sc - a.sc).map((x) => x.s);
      const pages = showAll
        ? []
        : idx.pages.map((p) => ({ p, sc: matchScore(p, q) })).filter((x) => x.sc >= 0).sort((a, b) => b.sc - a.sc).map((x) => x.p);

      let html = '';
      if (services.length) {
        html += '<div class="search-overlay__section"><div class="kicker">Servicios</div><div class="search-overlay__grid">';
        html += services.map((s) => (
          '<a class="search-overlay__item" href="' + escHtml(s.href) + '">' +
            '<span class="search-overlay__item-n">' + s.n + '</span>' +
            '<strong>' + highlight(s.title, q) + '</strong>' +
            '<span class="search-overlay__item-tag">' + highlight(s.tagline || '', q) + '</span>' +
          '</a>'
        )).join('');
        html += '</div></div>';
      }
      if (pages.length) {
        html += '<div class="search-overlay__section"><div class="kicker">Páginas</div><div class="search-overlay__grid search-overlay__grid--pages">';
        html += pages.map((p) => (
          '<a class="search-overlay__item search-overlay__item--page" href="' + escHtml(p.href) + '">' +
            '<strong>' + highlight(p.title, q) + '</strong>' +
            '<span class="search-overlay__item-tag">' + highlight(p.desc, q) + '</span>' +
          '</a>'
        )).join('');
        html += '</div></div>';
      }
      if (!services.length && !pages.length) {
        html = '<div class="search-overlay__empty">Sin resultados para <strong>"' + escHtml(q) + '"</strong></div>';
      }
      body.innerHTML = html;
    };
    renderResults('');

    let debounce;
    input.addEventListener('input', (e) => {
      clearTimeout(debounce);
      const q = e.target.value;
      debounce = setTimeout(() => renderResults(q), 50);
    });
    input.addEventListener('keydown', (e) => {
      if (e.key === 'Enter') {
        const first = body.querySelector('a');
        if (first) location.href = first.getAttribute('href');
      }
    });

    const openOverlay = () => {
      overlay.classList.add('is-open');
      overlay.setAttribute('aria-hidden', 'false');
      document.body.classList.add('is-locked');
      setTimeout(() => input.focus(), 80);
    };
    const closeOverlay = () => {
      overlay.classList.remove('is-open');
      overlay.setAttribute('aria-hidden', 'true');
      document.body.classList.remove('is-locked');
      input.value = '';
      renderResults('');
    };

    document.addEventListener('click', (e) => {
      const btn = e.target.closest('[data-search-open]');
      if (btn) { e.preventDefault(); openOverlay(); return; }
      const close = e.target.closest('[data-search-close]');
      if (close) { e.preventDefault(); closeOverlay(); return; }
      if (e.target === overlay) closeOverlay();
    });
    document.addEventListener('keydown', (e) => {
      if (e.key === 'Escape' && overlay.classList.contains('is-open')) closeOverlay();
      if ((e.metaKey || e.ctrlKey) && e.key.toLowerCase() === 'k') {
        e.preventDefault();
        if (overlay.classList.contains('is-open')) closeOverlay(); else openOverlay();
      }
    });
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
    seedAtFifteen(v);
  }

  /* ------------------------------------------------------------
     HERO VIDEO POOL (shared by service-hero, page-head, CTA)
     ------------------------------------------------------------ */
  const HERO_VIDEO_POOL = [
    'https://mamutfilms.com.co/wp-content/uploads/2025/05/REEL_MAMUT_2025_V1_0516.mp4',
    'https://mamutfilms.com.co/wp-content/uploads/2025/08/Ultima-Milla-I-Inter-Rapidisimo-Dia-del-Nino-2025-Inter-Rapidisimo-1080p-h264.mp4',
    'https://mamutfilms.com.co/wp-content/uploads/2025/06/Apuestas-D-cut.mp4',
    'https://mamutfilms.com.co/wp-content/uploads/2025/06/Compras-D´cut.mp4',
    'https://mamutfilms.com.co/wp-content/uploads/2025/06/Obligaciones-D´cut.mp4',
    'https://mamutfilms.com.co/wp-content/uploads/2025/06/Pago-servicios-D´cut.mp4',
    'https://mamutfilms.com.co/wp-content/uploads/2025/04/Juan-David-Botero.mp4'
  ];

  /* Deterministic index per page slug — creates an interleaved pattern */
  const PAGE_VIDEO_INDEX = {
    'index':               0,
    '':                    0,
    'proyectos':           2,
    'servicios':           1,
    'nosotros':            3,
    'lo-que-hicimos':      5,
    'contacto':            6,
    'augusto-castillo':    2,
    'carolina-bermudez':   4,
    'hugo-rubiano':        6,
    'juan-david-botero':   1,
    'luis-garcia':         3,
    'mateo-hincapie':      5
  };

  function currentPageSlug(){
    const last = location.pathname.split('/').filter(Boolean).pop() || 'index';
    return last.replace(/\.html$/, '');
  }

  /* Utility: seed a video to start at t=15s (or 0 if too short) */
  function seedAtFifteen(v){
    let seeded = false;
    const seed = () => {
      if (seeded) return;
      if (!isFinite(v.duration) || v.duration <= 0) return;
      const t = v.duration > 15.5 ? 15 : 0;
      try { v.currentTime = t; } catch(e) {}
      seeded = true;
    };
    v.addEventListener('loadedmetadata', seed);
    v.addEventListener('durationchange', seed);
    if (v.readyState >= 1) seed();
  }

  /* ------------------------------------------------------------
     SERVICE HERO VIDEOS (landings already have <video> in HTML)
     ------------------------------------------------------------ */
  function initServiceHeroVideos(){
    document.querySelectorAll('.service-hero__video video').forEach((v) => {
      const mark = () => v.classList.add('is-ready');
      if (v.readyState >= 2) mark();
      v.addEventListener('loadeddata', mark);
      v.addEventListener('playing', mark);
      v.addEventListener('canplay', mark);
      seedAtFifteen(v);
      const tryPlay = () => { const p = v.play(); if (p && p.catch) p.catch(() => {}); };
      tryPlay();
    });
  }

  /* ------------------------------------------------------------
     PAGE HEAD VIDEOS — inject a video hero on every .page-head.
     Uses deterministic rotation so each page gets a different one.
     Avoids duplicating a video already present elsewhere on the page.
     ------------------------------------------------------------ */
  function initPageHeroVideos(){
    const pageHead = document.querySelector('.page-head');
    if (!pageHead) return;
    if (pageHead.classList.contains('page-head--video')) return;

    const slug = currentPageSlug();
    const baseIdx = PAGE_VIDEO_INDEX[slug];
    if (baseIdx === undefined) return;

    // Collect URLs already on this page (to avoid duplicating)
    const used = new Set();
    document.querySelectorAll('video source[src]').forEach((s) => {
      if (s.src) used.add(s.getAttribute('src'));
    });

    // Pick first non-used URL starting from baseIdx, rotating through pool
    let picked = HERO_VIDEO_POOL[baseIdx];
    for (let i = 0; i < HERO_VIDEO_POOL.length; i++) {
      const candidate = HERO_VIDEO_POOL[(baseIdx + i) % HERO_VIDEO_POOL.length];
      if (!used.has(candidate)) { picked = candidate; break; }
    }

    // Inject video element into the page-head
    const wrap = document.createElement('div');
    wrap.className = 'page-head__video';
    const vid = document.createElement('video');
    vid.autoplay = true; vid.muted = true; vid.loop = true; vid.playsInline = true;
    vid.setAttribute('muted', '');
    vid.setAttribute('playsinline', '');
    vid.setAttribute('preload', 'metadata');
    vid.setAttribute('aria-hidden', 'true');
    vid.setAttribute('tabindex', '-1');
    const source = document.createElement('source');
    source.src = picked;
    source.type = 'video/mp4';
    vid.appendChild(source);
    wrap.appendChild(vid);

    pageHead.insertBefore(wrap, pageHead.firstChild);
    pageHead.classList.add('page-head--video');

    const markReady = () => vid.classList.add('is-ready');
    vid.addEventListener('loadeddata', markReady);
    vid.addEventListener('canplay', markReady);
    vid.addEventListener('playing', markReady);
    seedAtFifteen(vid);
    const tryPlay = () => { const p = vid.play(); if (p && p.catch) p.catch(() => {}); };
    tryPlay();
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
    initHeaderAux();
    initMobileNav();
    initMobileExtras();
    initMegaMenu();
    initSearchOverlay();
    initHeroVideo();
    initServiceHeroVideos();
    initPageHeroVideos();
    initVideoHover();
    initCtaVideoBackgrounds();
    initReveal();
    initClientMarquee();
    initYear();
    initActiveNav();
    initNavigationPreloader();
  });

})();
