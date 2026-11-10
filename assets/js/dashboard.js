/* Classora dashboard — module switching */
(function () {
  'use strict';

  var VIEWS = {
    overview: ['Overview', 'A summary of attendance, fees and communication across the school.'],
    attendance: ['Attendance', 'Review and mark attendance for a class.'],
    fees: ['Fees', 'Track paid, pending and overdue fees.'],
    timetable: ['Timetable', 'Weekly class schedule.'],
    messages: ['Messages', 'Announcements and reminders for parents.']
  };

  var links = document.querySelectorAll('[data-view-link]');
  var views = document.querySelectorAll('[data-view]');
  var title = document.getElementById('view-title');
  var sub = document.getElementById('view-sub');

  function nameFromHash() {
    var h = (location.hash || '').replace('#', '');
    return VIEWS[h] ? h : 'overview';
  }

  function show(name, userAction) {
    views.forEach(function (v) { v.hidden = v.getAttribute('data-view') !== name; });
    links.forEach(function (l) {
      var on = l.getAttribute('data-view-link') === name;
      l.classList.toggle('is-active', on);
      if (on) l.setAttribute('aria-current', 'page'); else l.removeAttribute('aria-current');
    });
    title.textContent = VIEWS[name][0];
    sub.textContent = VIEWS[name][1];
    document.title = VIEWS[name][0] + ' — Classora Dashboard';
    if (userAction) {
      window.scrollTo(0, 0);
      title.focus({ preventScroll: true });
      var active = document.querySelector('.side-link.is-active');
      var box = active && active.closest('.dash-side');
      if (box && box.scrollWidth > box.clientWidth) {
        // keep the active item visible in the horizontally scrolling menu
        var a = active.getBoundingClientRect(), b = box.getBoundingClientRect();
        box.scrollLeft += (a.left + a.width / 2) - (b.left + b.width / 2);
      }
    }
  }

  document.addEventListener('click', function (e) {
    var go = e.target.closest('[data-view-link], [data-goto]');
    if (!go) return;
    var name = go.getAttribute('data-view-link') || go.getAttribute('data-goto');
    e.preventDefault();
    if (location.hash !== '#' + name) history.pushState(null, '', '#' + name);
    show(name, true);
  });
  window.addEventListener('popstate', function () { show(nameFromHash(), false); });
  window.addEventListener('hashchange', function () { show(nameFromHash(), false); });

  /* attendance counters (local state only; nothing is saved) */
  var selects = document.querySelectorAll('.att-select');
  function recount() {
    var c = { present: 0, absent: 0, late: 0 };
    selects.forEach(function (s) { c[s.value]++; });
    Object.keys(c).forEach(function (k) {
      var el = document.querySelector('[data-count="' + k + '"]'); if (el) el.textContent = c[k];
    });
  }
  selects.forEach(function (s) { s.addEventListener('change', recount); });
  var all = document.querySelector('[data-mark-all]');
  if (all) all.addEventListener('click', function () { selects.forEach(function (s) { s.value = 'present'; }); recount(); });
  recount();

  show(nameFromHash(), false);
})();
