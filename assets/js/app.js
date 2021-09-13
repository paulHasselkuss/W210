const body = document.body;
const nav = document.getElementById('siteNav');
const nav_toggle = document.getElementById('navToggle');
const theme_toggle = document.getElementById('themeToggle');
let ticking = false;
theme_toggle.addEventListener('click', function(e) {
  body.classList.toggle("alt-theme");
  e.preventDefault();
});
nav_toggle.addEventListener('click', function(e) {
  body.classList.toggle('nav-active')
  nav_toggle.classList.toggle('is-active');
  e.preventDefault();
});
window.addEventListener('scroll', function(e) {
  //simple & native throttle: http://www.html5rocks.com/en/tutorials/speed/animations/
  if (!ticking) {
    window.requestAnimationFrame(function() {
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