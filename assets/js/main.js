/* Classora — shared components & behaviour (vanilla JS) */
(function () {
  'use strict';
  var fl = document.createElement('link'); fl.rel = 'stylesheet'; fl.href = 'https://fonts.googleapis.com/css2?family=Plus+Jakarta+Sans:wght@400;500;600;700;800&display=swap'; document.head.appendChild(fl);

  var KEY_THEME = 'cl-theme';
  var KEY_DIR = 'cl-dir';
  var root = document.documentElement;

  /* ---------- safe storage ---------- */
  function store(k, v) { try { localStorage.setItem(k, v); } catch (e) { /* storage unavailable */ } }
  function load(k) { try { return localStorage.getItem(k); } catch (e) { return null; } }

  /* ---------- icons ---------- */
  var P = {
    cap: '<path d="M22 10 12 5 2 10l10 5 10-5Z"/><path d="M6 12v5c3 2 9 2 12 0v-5"/>',
    sun: '<circle cx="12" cy="12" r="4"/><path d="M12 2v2M12 20v2M4.9 4.9l1.4 1.4M17.7 17.7l1.4 1.4M2 12h2M20 12h2M4.9 19.1l1.4-1.4M17.7 6.3l1.4-1.4"/>',
    moon: '<path d="M21 12.8A9 9 0 1 1 11.2 3a7 7 0 0 0 9.8 9.8Z"/>',
    rtl: '<path d="M6 9h12M14 6l4 3-4 3M18 15H6M10 12l-4 3 4 3"/>',
    globe: '<circle cx="12" cy="12" r="10"/><path d="M12 2a14.5 14.5 0 0 0 0 20 14.5 14.5 0 0 0 0-20M2 12h20"/>',
    menu: '<path d="M3 6h18M3 12h18M3 18h18"/>',
    close: '<path d="M18 6 6 18M6 6l12 12"/>',
    chev: '<path d="m6 9 6 6 6-6"/>',
    arrow: '<path d="M5 12h14M13 6l6 6-6 6"/>',
    up: '<path d="m18 15-6-6-6 6"/>',
    check: '<path d="M20 6 9 17l-5-5"/>',
    calendar: '<rect x="3" y="4" width="18" height="18" rx="2"/><path d="M16 2v4M8 2v4M3 10h18"/>',
    userCheck: '<path d="M16 21v-2a4 4 0 0 0-4-4H6a4 4 0 0 0-4 4v2"/><circle cx="9" cy="7" r="4"/><path d="m16 11 2 2 4-4"/>',
    wallet: '<path d="M20 12V8H6a2 2 0 0 1 0-4h12v4"/><path d="M4 6v12a2 2 0 0 0 2 2h14v-4"/><path d="M18 12a2 2 0 0 0 0 4h4v-4Z"/>',
    chat: '<path d="M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2Z"/>',
    shield: '<path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10Z"/><path d="m9 12 2 2 4-4"/>',
    chart: '<path d="M3 3v18h18"/><path d="M7 14l4-4 4 4 5-6"/>',
    users: '<path d="M16 21v-2a4 4 0 0 0-4-4H6a4 4 0 0 0-4 4v2"/><circle cx="9" cy="7" r="4"/><path d="M22 21v-2a4 4 0 0 0-3-3.9M16 3.1a4 4 0 0 1 0 7.8"/>',
    layers: '<path d="m12 2 10 5-10 5L2 7l10-5Z"/><path d="m2 12 10 5 10-5M2 17l10 5 10-5"/>',
    phone: '<path d="M22 16.9v3a2 2 0 0 1-2.2 2A19.8 19.8 0 0 1 2.1 4.2 2 2 0 0 1 4.1 2h3a2 2 0 0 1 2 1.7c.1 1 .4 1.9.7 2.8a2 2 0 0 1-.5 2.1L8.1 9.9a16 16 0 0 0 6 6l1.3-1.3a2 2 0 0 1 2.1-.4c.9.3 1.8.6 2.8.7a2 2 0 0 1 1.7 2Z"/>',
    mail: '<rect x="2" y="4" width="20" height="16" rx="2"/><path d="m22 7-10 6L2 7"/>',
    pin: '<path d="M20 10c0 6-8 12-8 12S4 16 4 10a8 8 0 0 1 16 0Z"/><circle cx="12" cy="10" r="3"/>',
    fb: '<path d="M18 2h-3a5 5 0 0 0-5 5v3H7v4h3v8h4v-8h3l1-4h-4V7a1 1 0 0 1 1-1h3Z"/>',
    tw: '<path d="M22 5.9a8 8 0 0 1-2.4.7 4 4 0 0 0 1.8-2.3 8 8 0 0 1-2.6 1A4.1 4.1 0 0 0 11.8 9 11.6 11.6 0 0 1 3.4 4.7a4.1 4.1 0 0 0 1.3 5.5 4 4 0 0 1-1.9-.5 4.1 4.1 0 0 0 3.3 4.1 4 4 0 0 1-1.9.1 4.1 4.1 0 0 0 3.8 2.8A8.3 8.3 0 0 1 2 18.5a11.6 11.6 0 0 0 6.3 1.8c7.5 0 11.7-6.3 11.5-12A8 8 0 0 0 22 5.9Z"/>',
    ln: '<path d="M16 8a6 6 0 0 1 6 6v7h-4v-7a2 2 0 0 0-4 0v7h-4v-7a6 6 0 0 1 6-6ZM2 9h4v12H2zM4 2a2 2 0 1 1 0 4 2 2 0 0 1 0-4Z"/>',
    eye: '<path d="M2 12s3.5-7 10-7 10 7 10 7-3.5 7-10 7S2 12 2 12Z"/><circle cx="12" cy="12" r="3"/>',
    eyeOff: '<path d="M17.9 17.9A10.4 10.4 0 0 1 12 19c-6.5 0-10-7-10-7a17.6 17.6 0 0 1 4.1-5M9.9 5.2A9.6 9.6 0 0 1 12 5c6.5 0 10 7 10 7a17.7 17.7 0 0 1-2.2 3.2M1 1l22 22"/>',
    grid: '<rect x="3" y="3" width="7" height="7" rx="1"/><rect x="14" y="3" width="7" height="7" rx="1"/><rect x="14" y="14" width="7" height="7" rx="1"/><rect x="3" y="14" width="7" height="7" rx="1"/>',
    logout: '<path d="M9 21H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h4M16 17l5-5-5-5M21 12H9"/>',
    ig: '<rect x="2" y="2" width="20" height="20" rx="5"/><circle cx="12" cy="12" r="4"/><path d="M17.5 6.5h.01"/>'
  };
  function svg(name, cls) {
    return '<svg class="icon ' + (cls || '') + '" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true" focusable="false">' + (P[name] || '') + '</svg>';
  }
  function hydrateIcons(scope) {
    (scope || document).querySelectorAll('[data-icon]').forEach(function (el) {
      el.innerHTML = svg(el.getAttribute('data-icon'), el.getAttribute('data-icon-class'));
      el.removeAttribute('data-icon');
    });
  }

  /* ---------- theme & direction ---------- */
  function applyTheme(t) { root.setAttribute('data-theme', t); }
  function applyDir(d) { root.setAttribute('dir', d); root.setAttribute('lang', root.getAttribute('lang') || 'en'); }
  function syncControls() {
    var dir = root.getAttribute('dir') || 'ltr';
    var theme = root.getAttribute('data-theme') || 'light';
    document.querySelectorAll('[data-dir-toggle]').forEach(function (b) {
      var next = dir === 'rtl' ? 'LTR' : 'RTL';
      b.setAttribute('aria-label', 'Switch to ' + next + ' layout');
      b.setAttribute('title', 'Switch to ' + next + ' layout');
    });
    document.querySelectorAll('[data-theme-toggle]').forEach(function (b) {
      var nextTheme = theme === 'dark' ? 'light' : 'dark';
      b.setAttribute('aria-label', 'Switch to ' + nextTheme + ' mode');
      b.setAttribute('title', 'Switch to ' + nextTheme + ' mode');
    });
  }
  function toggleTheme() {
    var t = root.getAttribute('data-theme') === 'dark' ? 'light' : 'dark';
    applyTheme(t); store(KEY_THEME, t); syncControls();
  }
  function toggleDir() {
    var d = root.getAttribute('dir') === 'rtl' ? 'ltr' : 'rtl';
    applyDir(d); store(KEY_DIR, d); syncControls();
  }
  // apply saved preferences (head script does this too, to avoid a flash)
  applyTheme(load(KEY_THEME) || 'light');
  applyDir(load(KEY_DIR) || 'ltr');

  /* ---------- shared data ---------- */
  var BRAND = 'Classora';
  var PAGES = [
    { id: 'home', label: 'Home', sub: [{ id: 'home1', label: 'Home 1', href: 'index.html' }, { id: 'home2', label: 'Home 2', href: 'home-2.html' }] },
    { id: 'about', label: 'About', href: 'about.html' },
    { id: 'features', label: 'Features', href: 'features.html' },
    { id: 'pricing', label: 'Pricing', href: 'pricing.html' },
    { id: 'contact', label: 'Contact', href: 'contact.html' },
    { id: 'dashboard', label: 'Dashboard', href: 'dashboard.html' }
  ];
  var CTA = { label: 'Start Free Trial', href: 'register.html' };

  var page = document.body.getAttribute('data-page') || '';
  var layout = document.body.getAttribute('data-layout') || 'public';
  function isActive(id) { return page === id || (id === 'home' && (page === 'home1' || page === 'home2')); }

  function brandHTML() {
    return '<a class="brand" href="index.html" aria-label="' + BRAND + ' home"><span class="brand-mark">' + svg('cap') + '</span><span class="brand-text">' + BRAND + '</span></a>';
  }
  function ctrlButtons(mobile) {
    var th = '<button type="button" class="icon-btn theme-toggle" data-theme-toggle aria-label="Toggle theme" title="Toggle theme">' + svg('sun', 'i-sun') + svg('moon', 'i-moon') + '</button>';
    var di = '<button type="button" class="icon-btn dir-toggle" data-dir-toggle aria-label="Toggle text direction" title="Toggle text direction">' + svg('rtl', 'i-rtl') + '</button>';
    return th + di;
  }

  /* ---------- header ---------- */
  function buildHeader() {
    var links = PAGES.map(function (p) {
      if (p.sub) {
        return '<div class="nav-dd" data-dd><button type="button" class="nav-link' + (isActive(p.id) ? ' is-active' : '') + '" aria-haspopup="true" aria-expanded="false">' + p.label + svg('chev', 'chev') + '</button>' +
          '<div class="dd-menu" role="menu">' + p.sub.map(function (s) {
            return '<a role="menuitem" href="' + s.href + '" class="' + (page === s.id ? 'is-active' : '') + '"' + (page === s.id ? ' aria-current="page"' : '') + '>' + s.label + '</a>';
          }).join('') + '</div></div>';
      }
      return '<a class="nav-link' + (isActive(p.id) ? ' is-active' : '') + '" href="' + p.href + '"' + (isActive(p.id) ? ' aria-current="page"' : '') + '>' + p.label + '</a>';
    }).join('');

    var mobile = PAGES.map(function (p) {
      if (p.sub) {
        return '<div class="m-dd" data-m-dd><button type="button" class="m-link' + (isActive(p.id) ? ' is-active' : '') + '" aria-expanded="false">' + p.label + svg('chev', 'chev') + '</button><div class="m-sub">' +
          p.sub.map(function (s) { return '<a class="m-link' + (page === s.id ? ' is-active' : '') + '" href="' + s.href + '">' + s.label + '</a>'; }).join('') + '</div></div>';
      }
      return '<a class="m-link' + (isActive(p.id) ? ' is-active' : '') + '" href="' + p.href + '">' + p.label + '</a>';
    }).join('');

    return '<header class="site-header"><div class="container nav">' + brandHTML() +
      '<nav class="nav-links" aria-label="Main">' + links + '</nav>' +
      '<div class="nav-actions">' + ctrlButtons(false) +
      '<a class="btn btn-outline" href="login.html">Log In</a>' +
      '<a class="btn btn-primary" href="' + CTA.href + '">' + CTA.label + '</a>' +
      '<button type="button" class="icon-btn nav-toggle" aria-expanded="false" aria-controls="mobile-menu" aria-label="Open menu">' + svg('menu', 'i-menu') + svg('close', 'i-close') + '</button>' +
      '</div></div></header>' +
      '<div class="mobile-menu" id="mobile-menu" data-open="false"><nav aria-label="Mobile">' + mobile + '</nav>' +
      '<div class="m-controls">' + ctrlButtons(true) + '</div>' +
      '<div class="m-actions"><a class="btn btn-outline" href="login.html">Log In</a><a class="btn btn-primary" href="' + CTA.href + '">' + CTA.label + '</a></div></div>';
  }

  /* ---------- minimal auth header (Login): logo + theme + direction only ---------- */
  function buildAuthHeader() {
    var th = ctrlButtons(false).split('</button>');
    return '<header class="site-header"><div class="nav nav--wide">' + brandHTML() +
      '<div class="auth-actions">' + th[1] + '</button>' + th[0] + '</button></div></div></header>';
  }

  /* ---------- footer ---------- */
  function buildFooter() {
    var soc = [['fb', 'Facebook'], ['tw', 'Twitter'], ['ln', 'LinkedIn'], ['ig', 'Instagram']].map(function (s) {
      return '<a href="#" aria-label="' + s[1] + '" rel="noopener">' + svg(s[0]) + '</a>';
    }).join('');
    return '<footer class="site-footer"><div class="container">' +
      '<div class="footer-top"><div class="footer-about">' + brandHTML() + '<p>School management software that brings attendance, fees, timetables and parent communication into one clear dashboard.</p><div class="social">' + soc + '</div></div>' +
      '<div class="footer-news"><h4>Stay in the loop</h4><p>Product updates and school-admin tips, once a month.</p><form class="news-form" data-news novalidate><label class="sr-only" for="news-email">Email address</label><input id="news-email" type="email" placeholder="you@school.org" autocomplete="email"><button type="submit" class="btn btn-primary">Subscribe</button></form><p class="news-status" role="status" aria-live="polite"></p></div></div>' +
      '<div class="footer-grid footer-grid--4">' +
      '<div><h4>Product</h4><ul class="footer-links"><li><a href="features.html">Features</a></li><li><a href="pricing.html">Pricing</a></li><li><a href="dashboard.html">Dashboard</a></li></ul></div>' +
      '<div><h4>Company</h4><ul class="footer-links"><li><a href="about.html">About</a></li><li><a href="index.html">Home 1</a></li><li><a href="home-2.html">Home 2</a></li><li><a href="contact.html">Contact</a></li></ul></div>' +
      '<div><h4>Account</h4><ul class="footer-links"><li><a href="login.html">Log In</a></li><li><a href="register.html">Start Free Trial</a></li><li><a href="contact.html">Book a demo</a></li></ul></div>' +
      '<div><h4>Get in touch</h4><ul class="footer-contact"><li>' + svg('pin') + '<span>Orchid Tech Park, 100 Feet Road, Indiranagar, Bengaluru 560038</span></li><li>' + svg('phone') + '<a href="tel:+918040001234">+91 80 4000 1234</a></li><li>' + svg('mail') + '<a href="mailto:hello@classora.com">hello@classora.com</a></li><li>' + svg('calendar') + '<span>Mon&ndash;Sat, 9 am&ndash;6 pm IST</span></li></ul></div>' +
      '</div><div class="footer-bottom"><p>&copy; <span data-year></span> ' + BRAND + ' Technologies Pvt. Ltd. All rights reserved.</p><p><a href="contact.html">Privacy</a> &middot; <a href="contact.html">Terms</a> &middot; <a href="contact.html">Support</a></p></div></div></footer>' +
      '<button type="button" class="back-top" aria-label="Back to top">' + svg('up') + '</button>';
  }

  /* ---------- mount ---------- */
  var headMount = document.getElementById('site-header');
  var footMount = document.getElementById('site-footer');
  if (layout === 'public') {
    if (headMount) headMount.innerHTML = buildHeader();
    if (footMount) footMount.innerHTML = buildFooter();
  } else if (layout === 'auth') {
    if (headMount) headMount.innerHTML = buildAuthHeader();
  }
  hydrateIcons();
  document.querySelectorAll('[data-year]').forEach(function (n) { n.textContent = new Date().getFullYear(); });
  syncControls();

  /* ---------- interactions ---------- */
  var toggle = document.querySelector('.nav-toggle');
  var menu = document.getElementById('mobile-menu');

  function closeDropdowns(except) {
    document.querySelectorAll('[data-dd][data-open="true"]').forEach(function (d) {
      if (d === except) return;
      d.setAttribute('data-open', 'false');
      d.querySelector('.nav-link').setAttribute('aria-expanded', 'false');
    });
  }
  function setMenu(open) {
    if (!menu || !toggle) return;
    menu.setAttribute('data-open', open ? 'true' : 'false');
    toggle.setAttribute('aria-expanded', open ? 'true' : 'false');
    toggle.setAttribute('aria-label', open ? 'Close menu' : 'Open menu');
    document.body.style.overflow = open ? 'hidden' : '';
    if (!open) {
      document.querySelectorAll('[data-m-dd]').forEach(function (d) {
        d.setAttribute('data-open', 'false');
        d.querySelector('button').setAttribute('aria-expanded', 'false');
      });
    }
  }

  document.addEventListener('click', function (e) {
    var t = e.target;
    var ddBtn = t.closest('[data-dd] > .nav-link');
    if (ddBtn) {
      var dd = ddBtn.parentElement;
      var open = dd.getAttribute('data-open') === 'true';
      closeDropdowns(dd);
      dd.setAttribute('data-open', open ? 'false' : 'true');
      ddBtn.setAttribute('aria-expanded', open ? 'false' : 'true');
      return;
    }
    if (!t.closest('[data-dd]')) closeDropdowns();
    if (t.closest('.dd-menu a')) closeDropdowns();

    var mBtn = t.closest('[data-m-dd] > button');
    if (mBtn) {
      var md = mBtn.parentElement;
      var mo = md.getAttribute('data-open') === 'true';
      md.setAttribute('data-open', mo ? 'false' : 'true');
      mBtn.setAttribute('aria-expanded', mo ? 'false' : 'true');
      return;
    }
    if (t.closest('.nav-toggle')) { setMenu(menu.getAttribute('data-open') !== 'true'); return; }
    if (t.closest('.mobile-menu a')) setMenu(false);

    if (t.closest('[data-theme-toggle]')) toggleTheme();
    if (t.closest('[data-dir-toggle]')) toggleDir();
    if (t.closest('.back-top')) window.scrollTo({ top: 0, behavior: 'smooth' });
  });
  document.addEventListener('keydown', function (e) {
    if (e.key === 'Escape') { closeDropdowns(); setMenu(false); }
  });
  // leaving tablet/mobile mode closes the panel
  window.matchMedia('(min-width: 1200px) and (hover: hover)').addEventListener('change', function (m) { if (m.matches) setMenu(false); });

  /* back to top */
  var back = document.querySelector('.back-top');
  if (back) {
    var onScroll = function () { back.classList.toggle('is-visible', window.scrollY > 500); };
    window.addEventListener('scroll', onScroll, { passive: true });
    onScroll();
  }

  /* ---------- action buttons ---------- */
  document.addEventListener('click', function (e) {
    var d = e.target.closest('[data-action-msg]'); if (!d) return;
    var panel = d.closest('.panel'); var st = panel && panel.querySelector('.form-status'); if (!st) return;
    st.hidden = false;
    var t = st.querySelector('.status-text') || st;
    t.textContent = d.getAttribute('data-action-msg');
  });

  /* ---------- password show/hide + forgot password  ---------- */
  document.addEventListener('click', function (e) {
    var pw = e.target.closest('[data-pw-toggle]');
    if (pw) {
      var input = document.getElementById(pw.getAttribute('data-pw-toggle'));
      var show = input.type === 'password';
      input.type = show ? 'text' : 'password';
      pw.setAttribute('aria-pressed', show ? 'true' : 'false');
      pw.setAttribute('aria-label', show ? 'Hide password' : 'Show password');
    }
    var fg = e.target.closest('[data-forgot]');
    if (fg) {
      var st = document.querySelector('.form-status'); if (!st) return;
      st.hidden = false;
      var t = st.querySelector('.status-text') || st;
      t.textContent = 'If an account exists for that email, a reset link will be sent shortly. Enter your email above first.';
      var lk = st.querySelector('.status-link'); if (lk) lk.hidden = true;
    }
  });

  /* ---------- form validation ---------- */
  document.querySelectorAll('form[data-form]').forEach(function (form) {
    var status = form.querySelector('.form-status');
    var emailRe = /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/;
    function msgFor(el) {
      var v = el.value.trim();
      if (el.required && !v) return 'This field is required.';
      if (el.type === 'email' && v && !emailRe.test(v)) return 'Enter a valid email address.';
      if (el.type === 'password' && v && v.length < 8) return 'Use at least 8 characters.';
      if (el.type === 'tel' && v && !/^[0-9+()\-\s]{7,20}$/.test(v)) return 'Enter a valid phone number.';
      if (el.name === 'message' && v && v.length < 10) return 'Please write at least 10 characters.';
      return '';
    }
    function show(el) {
      var field = el.closest('.field'); if (!field) return true;
      var m = msgFor(el);
      field.classList.toggle('has-error', !!m);
      var err = field.querySelector('.field-error'); if (err) err.textContent = m;
      el.setAttribute('aria-invalid', m ? 'true' : 'false');
      return !m;
    }
    form.setAttribute('novalidate', '');
    form.addEventListener('blur', function (e) { if (e.target.matches('input,select,textarea')) show(e.target); }, true);
    form.addEventListener('input', function (e) { if (e.target.closest('.has-error')) show(e.target); });
    form.addEventListener('submit', function (e) {
      e.preventDefault();
      var first = null, ok = true;
      form.querySelectorAll('input,select,textarea').forEach(function (el) { if (!show(el)) { ok = false; first = first || el; } });
      var tb = form.querySelector('input[type=checkbox][required]');
      if (tb && !tb.checked) { ok = false; first = first || tb; }
      if (status) {
        status.hidden = false;
        var st = status.querySelector('.status-text') || status;
        var okMsg = form.getAttribute('data-ok') || 'Thank you! Your message has been received. Our team will reply within one business day.';
        st.textContent = ok ? okMsg : 'Please fix the highlighted fields and try again.';
        var lk = status.querySelector('.status-link'); if (lk) lk.hidden = !ok;
      }
      if (!ok && first) first.focus();
      if (ok && form.getAttribute('data-redirect')) { setTimeout(function(){ location.href = form.getAttribute('data-redirect'); }, 900); }
      if (ok) form.reset();
    });
  });

  /* ---------- pricing billing toggle ---------- */
  document.querySelectorAll('[data-billing]').forEach(function (b) {
    b.addEventListener('click', function () {
      var mode = b.getAttribute('data-billing');
      document.querySelectorAll('[data-billing]').forEach(function (x) {
        var on = x === b; x.classList.toggle('is-on', on); x.setAttribute('aria-pressed', on ? 'true' : 'false');
      });
      document.querySelectorAll('[data-monthly]').forEach(function (el) { el.textContent = el.getAttribute('data-' + mode); });
    });
  });

  /* ---------- newsletter ---------- */
  document.querySelectorAll('[data-news]').forEach(function (f) {
    f.addEventListener('submit', function (e) {
      e.preventDefault();
      var i = f.querySelector('input'), st = f.parentNode.querySelector('.news-status');
      var ok = /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/.test(i.value.trim());
      st.textContent = ok ? 'Thanks for subscribing!' : 'Enter a valid email address.';
      st.classList.toggle('is-bad', !ok);
      if (ok) f.reset();
    });
  });

  /* ---------- savings calculator ---------- */
  var calc = document.querySelector('[data-calc]');
  if (calc) {
    var fmt = function (n) { return '₹' + Math.round(n).toLocaleString('en-IN'); };
    var val = function (k) { return Number(calc.querySelector('[data-in="' + k + '"]').value) || 0; };
    var put = function (k, t) { calc.querySelector('[data-out="' + k + '"]').textContent = t; };
    var compute = function () {
      var st = val('students'), fee = val('fee'), late = val('late') / 100, hrs = val('hours'), rate = val('rate');
      var today = hrs * 4.3 * rate + st * 10;
      var timeSaved = hrs * 4.3 * rate * 0.6;
      var paper = st * 10 * 0.8;
      var plan = st <= 300 ? 3999 : (st <= 1500 ? 7999 : 15999);
      var cash = st * fee * late * 0.4;
      var net = timeSaved + paper + cash * 0.05 - plan;
      var withC = Math.max(today - timeSaved - paper + plan, 0);
      put('today', fmt(today)); put('with', fmt(withC));
      put('time', fmt(timeSaved)); put('paper', fmt(paper)); put('cash', fmt(cash));
      put('plan', '− ' + fmt(plan)); put('net', fmt(Math.max(net, 0))); put('net2', fmt(Math.max(net, 0)));
      calc.querySelector('[data-bar="today"]').style.width = '100%';
      calc.querySelector('[data-bar="with"]').style.width = Math.min(100, withC / Math.max(today, 1) * 100) + '%';
    };
    calc.addEventListener('click', function (e) {
      var b = e.target.closest('[data-step]'); if (!b) return;
      var inp = calc.querySelector('[data-in="' + b.getAttribute('data-for') + '"]');
      var step = Number(inp.getAttribute('data-inc') || 1), min = Number(inp.min), max = Number(inp.max);
      var v = (Number(inp.value) || 0) + step * Number(b.getAttribute('data-step'));
      inp.value = Math.min(max, Math.max(min, v)); compute();
    });
    calc.addEventListener('input', compute);
    calc.addEventListener('change', function (e) {
      var i = e.target; if (!i.matches('input')) return;
      i.value = Math.min(Number(i.max), Math.max(Number(i.min), Number(i.value) || Number(i.min))); compute();
    });
    compute();
  }

  /* ---------- tabs ---------- */
  document.querySelectorAll('[data-tabs]').forEach(function (box) {
    var tabs = [].slice.call(box.querySelectorAll('[role="tab"]'));
    function pick(t, focus) {
      tabs.forEach(function (x) {
        var on = x === t; x.setAttribute('aria-selected', on ? 'true' : 'false'); x.tabIndex = on ? 0 : -1;
        document.getElementById(x.getAttribute('aria-controls')).hidden = !on;
      });
      if (focus) t.focus();
    }
    tabs.forEach(function (t, i) {
      t.addEventListener('click', function () { pick(t); });
      t.addEventListener('keydown', function (e) {
        var k = e.key, n = null;
        if (k === 'ArrowDown' || k === 'ArrowRight') n = tabs[(i + 1) % tabs.length];
        else if (k === 'ArrowUp' || k === 'ArrowLeft') n = tabs[(i - 1 + tabs.length) % tabs.length];
        if (n) { e.preventDefault(); pick(n, true); }
      });
    });
  });

  /* ---------- social sign-in buttons ---------- */
  document.querySelectorAll('[data-social]').forEach(function (b) {
    b.addEventListener('click', function () {
      var box = b.closest('.auth-card'), st = box && box.querySelector('.social-status');
      if (st) { st.hidden = false; st.textContent = 'Connecting to ' + b.getAttribute('data-social') + '\u2026'; }
      setTimeout(function () { location.href = 'dashboard.html'; }, 900);
    });
  });

  /* ---------- table filters ---------- */
  document.querySelectorAll('[data-filter-group]').forEach(function (g) {
    var tbl = document.getElementById(g.getAttribute('data-filter-group'));
    g.addEventListener('click', function (e) {
      var b = e.target.closest('[data-filter]'); if (!b || !tbl) return;
      g.querySelectorAll('[data-filter]').forEach(function (x) { var on = x === b; x.classList.toggle('is-on', on); x.setAttribute('aria-pressed', on ? 'true' : 'false'); });
      var f = b.getAttribute('data-filter');
      var n = 0;
      tbl.querySelectorAll('tbody tr').forEach(function (r) { r.hidden = !(f === 'all' || r.getAttribute('data-status') === f); if (!r.hidden) n++; });
      var note = tbl.closest('.panel').querySelector('.chart-note'); if (note) note.textContent = 'Showing ' + n + ' of 8 records.';
    });
  });

  /* ---------- FAQ accordions: opening one closes the others ---------- */
  document.querySelectorAll('.faq').forEach(function (box) {
    var items = box.querySelectorAll('details');
    items.forEach(function (d) {
      d.addEventListener('toggle', function () {
        if (!d.open) return;
        items.forEach(function (o) { if (o !== d) o.open = false; });
      });
    });
  });
})();
