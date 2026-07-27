/* ============================================================
   Software-Hub — site behaviour
   Drawer, scrollspy and today's opening hours. No dependencies.
   ============================================================ */

(function () {
  document.getElementById('year').textContent = new Date().getFullYear();

  /* ---- mobile drawer ---- */
  var body = document.body,
      toggle = document.getElementById('navToggle'),
      scrim = document.getElementById('scrim'),
      sidenav = document.getElementById('sidenav');

  function setNav(open) {
    body.classList.toggle('nav-open', open);
    toggle.setAttribute('aria-expanded', String(open));
    scrim.hidden = !open;
  }
  toggle.addEventListener('click', function () {
    setNav(!body.classList.contains('nav-open'));
  });
  scrim.addEventListener('click', function () { setNav(false); });
  document.addEventListener('keydown', function (e) {
    if (e.key === 'Escape') setNav(false);
  });
  sidenav.addEventListener('click', function (e) {
    if (e.target.closest('a')) setNav(false);
  });

  /* ---- scrollspy for the sidenav ---- */
  var links = Array.prototype.slice.call(sidenav.querySelectorAll('.nav-link')),
      sections = links.map(function (l) { return document.querySelector(l.getAttribute('href')); });

  function activate(id) {
    links.forEach(function (l) {
      l.classList.toggle('active', l.getAttribute('href') === '#' + id);
    });
  }

  if ('IntersectionObserver' in window) {
    var seen = {};
    var io = new IntersectionObserver(function (entries) {
      entries.forEach(function (en) { seen[en.target.id] = en.intersectionRatio; });
      var best = null, bestRatio = 0;
      Object.keys(seen).forEach(function (id) {
        if (seen[id] > bestRatio) { bestRatio = seen[id]; best = id; }
      });
      if (best) activate(best);
    }, { rootMargin: '-110px 0px -55% 0px', threshold: [0, 0.15, 0.4, 0.75, 1] });
    sections.forEach(function (s) { if (s) io.observe(s); });
  } else {
    activate('overview');
  }
})();
