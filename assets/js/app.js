'use strict';
import 'js/vendor/instantpage';

const body = document.body;
const nav_toggle = document.getElementById('navToggle');
const theme_toggle = document.getElementById('themeToggle');
const theme_meta = document.querySelectorAll('meta[name="theme-color"]');
let ticking = false;
theme_toggle.addEventListener('click', function (e) {
  let status = sessionStorage.getItem('alt-theme');
  if (status) {
    sessionStorage.removeItem('alt-theme');
  } else {
    sessionStorage.setItem('alt-theme', 'true')
  }
  handle_theme(!status);
  e.preventDefault();
});
window.addEventListener('DOMContentLoaded', handle_theme());
nav_toggle.addEventListener('click', function (e) {
  body.classList.toggle('nav-active')
  nav_toggle.classList.toggle('is-active');
  e.preventDefault();
});
window.addEventListener('scroll', function () {
  //simple & native throttle: http://www.html5rocks.com/en/tutorials/speed/animations/
  if (!ticking) {
    window.requestAnimationFrame(function () {
      if (document.documentElement.scrollTop > 50) {
        body.classList.add('is-scrolled');
      } else {
        body.classList.remove('is-scrolled');
      }
      ticking = false;
    });
    ticking = true;
  }
});

function handle_theme(add = sessionStorage.getItem('alt-theme')) {
  if (add) {
    document.documentElement.classList.add('alt-theme');
    handle_theme_meta('data-alt');
  } else {
    document.documentElement.classList.remove('alt-theme');
    handle_theme_meta('data-default');
  }
}

function handle_theme_meta(attribute) {
  for (const i of theme_meta) {
    i.setAttribute('content', i.getAttribute(attribute));
  }
}


