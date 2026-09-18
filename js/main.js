/* Apex AutoCare â€” shared behavior */
(function () {
  'use strict';

  /* Sticky header shadow */
  var header = document.querySelector('.site-header');
  var onScroll = function () {
    if (header) header.classList.toggle('is-scrolled', window.scrollY > 8);
  };
  window.addEventListener('scroll', onScroll, { passive: true });
  onScroll();

  /* Mobile nav */
  var toggle = document.querySelector('.nav-toggle');
  var links = document.querySelector('.nav-links');
  if (toggle && links) {
    toggle.addEventListener('click', function () {
      var open = links.classList.toggle('open');
      header.classList.toggle('menu-open', open);
      toggle.setAttribute('aria-expanded', String(open));
    });
  }

  /* Active nav link */
  var path = location.pathname.split('/').pop() || 'index.html';
  document.querySelectorAll('.nav-links a').forEach(function (a) {
    var href = a.getAttribute('href');
    if (href === path) a.classList.add('active');
  });

  /* Gallery filter + lightbox */
  var filterBtns = document.querySelectorAll('.filter-btn');
  var items = document.querySelectorAll('.gallery-item');
  filterBtns.forEach(function (btn) {
    btn.addEventListener('click', function () {
      filterBtns.forEach(function (b) { b.classList.remove('active'); });
      btn.classList.add('active');
      var f = btn.dataset.filter;
      items.forEach(function (it) {
        var show = f === 'all' || it.dataset.category === f;
        it.classList.toggle('hidden', !show);
      });
    });
  });

  var lightbox = document.querySelector('.lightbox');
  if (lightbox && items.length) {
    var lbImg = lightbox.querySelector('img');
    var lbCap = lightbox.querySelector('.lightbox__cap');
    items.forEach(function (it) {
      it.addEventListener('click', function () {
        var img = it.querySelector('img');
        lbImg.src = img.src;
        lbImg.alt = img.alt;
        lbCap.textContent = it.dataset.caption || img.alt || '';
        lightbox.classList.add('open');
        document.body.style.overflow = 'hidden';
      });
    });
    var close = function () {
      lightbox.classList.remove('open');
      document.body.style.overflow = '';
    };
    lightbox.querySelector('.lightbox__close').addEventListener('click', close);
    lightbox.addEventListener('click', function (e) { if (e.target === lightbox) close(); });
    document.addEventListener('keydown', function (e) { if (e.key === 'Escape') close(); });
  }

  /* Contact form validation */
  var form = document.querySelector('#contact-form');
  if (form) {
    form.addEventListener('submit', function (e) {
      e.preventDefault();
      var ok = true;
      form.querySelectorAll('[required]').forEach(function (input) {
        var field = input.closest('.field');
        var valid = input.type === 'email'
          ? /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(input.value.trim())
          : input.value.trim() !== '';
        field.classList.toggle('invalid', !valid);
        if (!valid) ok = false;
      });
      var success = form.querySelector('.form-success');
      if (ok) {
        form.reset();
        success.classList.add('show');
        success.scrollIntoView({ behavior: 'smooth', block: 'center' });
      } else if (success) {
        success.classList.remove('show');
      }
    });
    form.querySelectorAll('input, textarea').forEach(function (input) {
      input.addEventListener('input', function () {
        var f = input.closest('.field');
        if (f) f.classList.remove('invalid');
      });
    });
  }
})();
