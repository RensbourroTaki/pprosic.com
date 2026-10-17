(function () {
  var S = window.SITE;
  var IMG = 'assets/img/';
  var $ = function (id) { return document.getElementById(id); };

  var works = S.works.map(function (w) {
    return { src: IMG + encodeURIComponent(w[0]), title: w[1], cat: w[2] };
  });
  var filter = 'all';
  var lb = null; // { list, i }

  // Mobile-Menue
  function menu(open) {
    document.documentElement.classList.toggle('menu-open', open);
    $('burger').setAttribute('aria-expanded', open);
  }
  $('burger').addEventListener('click', function () { menu(!document.documentElement.classList.contains('menu-open')); });
  $('menu').addEventListener('click', function (e) { if (e.target.closest('a') || !e.target.closest('.menu__panel')) menu(false); });
  document.addEventListener('keydown', function (e) { if (e.key === 'Escape') menu(false); });

  // Filters
  function renderFilters() {
    var keys = [['all', 'All']].concat(Object.keys(S.categories).map(function (k) { return [k, S.categories[k]]; }));
    $('filters').innerHTML = keys.map(function (k) {
      return '<button class="filter' + (k[0] === filter ? ' is-active' : '') + '" data-f="' + k[0] + '">' + k[1] + '</button>';
    }).join('');
  }
  $('filters').addEventListener('click', function (e) {
    var b = e.target.closest('[data-f]'); if (!b) return;
    filter = b.dataset.f; renderFilters(); renderWorks();
  });

  // Works
  function visible() { return filter === 'all' ? works : works.filter(function (w) { return w.cat === filter; }); }
  function renderWorks() {
    $('works').innerHTML = visible().map(function (w, i) {
      return '<figure class="work" data-i="' + i + '">' +
        '<div class="work__pan"><img src="' + w.src + '" alt="' + w.title + '" loading="lazy" draggable="false"></div>' +
        '<figcaption><span class="work__title">' + w.title + '</span><span class="work__cat">' + S.categories[w.cat] + '</span></figcaption>' +
        '</figure>';
    }).join('');
    [].forEach.call($('works').children, preparePan);
  }

  // Mobile-Kamera (CSS in style.css): .work__pan ist seitlich wischbar. Bis das Bild ins Display scrollt,
  // steht es am Rand (gerade Nummern links, ungerade rechts), dann faehrt es einmal zur Mitte.
  // Ein Finger auf dem Bild bricht die Fahrt ab. Auf dem Desktop ist nichts scrollbar -> wirkungslos.
  var still = !('IntersectionObserver' in window) || window.matchMedia('(prefers-reduced-motion: reduce)').matches;
  var pan = still ? null : new IntersectionObserver(function (es) {
    es.forEach(function (e) { if (e.isIntersecting) { pan.unobserve(e.target); glide(e.target.firstChild); } });
  }, { threshold: 0.35 });

  function preparePan(f, i) {
    var p = f.firstChild, img = p.firstChild;
    function start() {
      var max = p.scrollWidth - p.clientWidth;
      p.scrollLeft = still ? max / 2 : (i % 2 ? max : 0);
      if (pan) pan.observe(f);
    }
    if (img.complete && img.naturalWidth) start(); else img.addEventListener('load', start, { once: true });
  }

  function glide(p) {
    var from = p.scrollLeft, to = (p.scrollWidth - p.clientWidth) / 2, t0 = null, dur = 2600, stop = false;
    if (Math.abs(to - from) < 2) return;
    function halt() { stop = true; }
    ['pointerdown', 'touchstart', 'wheel'].forEach(function (ev) { p.addEventListener(ev, halt, { once: true, passive: true }); });
    function ease(x) { return x < 0.5 ? 4 * x * x * x : 1 - Math.pow(-2 * x + 2, 3) / 2; }
    (function frame(t) {
      if (stop) return;
      if (t0 === null) t0 = t;
      var k = Math.min((t - t0) / dur, 1);
      p.scrollLeft = from + (to - from) * ease(k);
      if (k < 1) requestAnimationFrame(frame);
    })(performance.now());
  }

  // Mit der Maus ziehen wie mit dem Finger wischen (Touch scrollt nativ, das hier ist nur fuer Maus).
  // Beim Loslassen gleitet das Bild mit dem Schwung weiter und bremst sanft ab.
  var drag = null, dragged = false, coast = 0;
  $('works').addEventListener('pointerdown', function (e) {
    var p = e.target.closest('.work__pan');
    dragged = false;
    if (e.pointerType !== 'mouse' || e.button || !p || p.scrollWidth <= p.clientWidth) return;
    cancelAnimationFrame(coast);
    drag = { p: p, x: e.clientX, s: p.scrollLeft, lx: e.clientX, lt: performance.now(), v: 0 };
    e.preventDefault();
  });
  window.addEventListener('pointermove', function (e) {
    if (!drag) return;
    var dx = e.clientX - drag.x, now = performance.now(), dt = Math.max(now - drag.lt, 1);
    if (Math.abs(dx) > 4) { dragged = true; drag.p.classList.add('is-drag'); }
    drag.p.scrollLeft = drag.s - dx;
    drag.v = 0.8 * ((drag.lx - e.clientX) / dt) + 0.2 * drag.v; // px/ms, geglaettet
    drag.lx = e.clientX; drag.lt = now;
  });
  window.addEventListener('pointerup', function () {
    if (!drag) return;
    var p = drag.p, v = performance.now() - drag.lt > 80 ? 0 : drag.v, last = performance.now();
    p.classList.remove('is-drag'); drag = null;
    function frame(t) {
      var dt = Math.max(t - last, 1); last = t;
      v *= Math.pow(0.994, dt); // Reibung: kleiner = staerker bremsen
      if (Math.abs(v) < 0.02) return;
      var before = p.scrollLeft;
      p.scrollLeft += v * dt;
      if (p.scrollLeft === before) return; // am Rand angekommen
      coast = requestAnimationFrame(frame);
    }
    coast = requestAnimationFrame(frame);
  });
  $('works').addEventListener('click', function (e) {
    if (dragged) { dragged = false; return; } // Maus wurde gezogen -> kein Lightbox-Klick
    var f = e.target.closest('.work'); if (!f) return;
    openLb(visible(), +f.dataset.i);
  });

  // Process
  $('verbs').innerHTML = S.verbs.split(' ').map(function (v) { return '<span>' + v + '</span>'; }).join('');
  $('tools').innerHTML = S.tools.map(function (g) {
    return '<div class="tools__group"><div class="label">' + g.group + '</div><ul>' +
      g.items.map(function (t) { return '<li>' + t + '</li>'; }).join('') + '</ul></div>';
  }).join('');

  // Lightbox
  function openLb(list, i) { lb = { list: list, i: i }; showLb(); $('lightbox').hidden = false; }
  function showLb() {
    var cur = lb.list[lb.i];
    $('lb-img').src = cur.src; $('lb-img').alt = cur.title;
    $('lb-caption').textContent = cur.title + ' · ' + (lb.i + 1) + ' / ' + lb.list.length;
    $('lb-prev').style.visibility = $('lb-next').style.visibility = lb.list.length > 1 ? 'visible' : 'hidden';
  }
  function step(d) { if (!lb || lb.list.length < 2) return; lb.i = (lb.i + d + lb.list.length) % lb.list.length; showLb(); }
  function closeLb() { lb = null; $('lightbox').hidden = true; }
  $('lightbox').addEventListener('click', closeLb);
  $('lb-prev').addEventListener('click', function (e) { e.stopPropagation(); step(-1); });
  $('lb-next').addEventListener('click', function (e) { e.stopPropagation(); step(1); });
  document.addEventListener('keydown', function (e) {
    if (!lb) return;
    if (e.key === 'Escape') closeLb();
    if (e.key === 'ArrowRight') step(1);
    if (e.key === 'ArrowLeft') step(-1);
  });
  $('archive').addEventListener('click', function () {
    openLb([{ src: $('archive').getAttribute('src'), title: 'some of the past' }], 0);
  });

  // Hero — Videos 01.mp4, 02.mp4 … aus assets/vids/ nacheinander, kurz überblendet.
  // Die Anzahl steht nirgends: fehlt die nächste Nummer, geht es wieder bei 01 weiter.
  // Ohne Videos (oder bei "Bewegung reduzieren") bleibt das Standbild stehen.
  (function () {
    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) return;
    var fade = S.heroFade || 0.4;
    var cur = $('hero-v1'), nxt = $('hero-v2');
    var busy = false, waiting = false;

    function file(i) { return 'assets/vids/' + (i < 10 ? '0' : '') + i + '.mp4'; }
    function prepare(v, i) { v.dataset.n = i; v.src = file(i); v.load(); }
    function ready(v) { return v.readyState >= 3; }

    [cur, nxt].forEach(function (v) {
      v.style.transition = 'opacity ' + fade + 's linear';
      v.addEventListener('error', function () { if (+v.dataset.n > 1) prepare(v, 1); }); // Listenende → von vorne
      v.addEventListener('canplay', function () { if (waiting && v === nxt) swap(); });
      v.addEventListener('ended', function () { if (v === cur) { if (ready(nxt)) swap(); else waiting = true; } });
    });

    // Das nächste Video blendet über dem laufenden ein, danach wird getauscht.
    function swap() {
      if (busy) return;
      busy = true; waiting = false;
      nxt.currentTime = 0;
      nxt.play().catch(function () {});
      nxt.style.zIndex = 1; cur.style.zIndex = 0;
      nxt.classList.add('is-on');
      setTimeout(function () {
        cur.classList.remove('is-on'); cur.pause();
        var old = cur; cur = nxt; nxt = old;
        prepare(nxt, +cur.dataset.n + 1);
        busy = false;
      }, fade * 1000);
    }

    function tick() {
      if (!busy && cur.duration && cur.currentTime >= cur.duration - fade && ready(nxt)) swap();
      requestAnimationFrame(tick);
    }

    cur.addEventListener('canplay', function () {
      cur.play().then(function () {
        cur.classList.add('is-on');
        prepare(nxt, 2);
        requestAnimationFrame(tick);
      }).catch(function () {}); // Autoplay blockiert (z.B. Stromsparmodus) → Standbild
    }, { once: true });
    prepare(cur, 1);

    // Außerhalb des Bildschirms pausieren (spart Akku/CPU)
    if ('IntersectionObserver' in window) {
      new IntersectionObserver(function (e) {
        if (!cur.classList.contains('is-on')) return;
        if (e[0].isIntersecting) cur.play().catch(function () {}); else cur.pause();
      }).observe($('top'));
    }
  })();

  // Contact — Versand über Web3Forms an die Adresse hinter S.formKey
  var form = $('contact-form');
  form.addEventListener('submit', function (e) {
    e.preventDefault();
    var fd = new FormData(form);
    fd.append('access_key', S.formKey);
    fd.append('subject', 'pprosic.com: ' + fd.get('name'));
    fd.append('from_name', 'pprosic.com');
    $('form-btn').disabled = true;
    $('form-sent').hidden = $('form-error').hidden = true;
    fetch('https://api.web3forms.com/submit', { method: 'POST', headers: { Accept: 'application/json' }, body: fd })
      .then(function (r) { return r.json(); })
      .then(function (d) {
        if (!d.success) throw d;
        $('form-sent').hidden = false;
        form.reset();
      })
      .catch(function () { $('form-error').hidden = false; })
      .then(function () { $('form-btn').disabled = false; });
  });

  $('year').textContent = new Date().getFullYear();

  renderFilters();
  renderWorks();
})();
