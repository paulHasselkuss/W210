const header = document.getElementById('siteHeader');
const root = document.documentElement;
const nav = document.getElementById('main-nav')
const nav_toggle = document.getElementById('menu-btn');
const theme_toggle = document.getElementById('themeToggle');
let ticking = false;
theme_toggle.addEventListener('click', function(e) {
  root.classList.toggle("alt-theme");
  e.preventDefault();
});
nav_toggle.addEventListener('click', function(e) {
  nav.classList.toggle('is-active');
  nav_toggle.classList.toggle('is-active');
  toggle_no_scroll();
  set_is_scolled(true);
  e.preventDefault();
});
window.addEventListener('scroll', function(e) {
  //simple & native throttle: http://www.html5rocks.com/en/tutorials/speed/animations/
  if (!ticking) {
    window.requestAnimationFrame(function() {
      set_is_scolled(root.scrollTop > 50);
      ticking = false;
    });
    ticking = true;
  }
});

function toggle_no_scroll() {
  root.classList.toggle('noscroll');
}

function set_is_scolled(add) {
  if (add) {
    header.classList.add('is-scolled');
  } else {
    header.classList.remove('is-scolled');
  }
}