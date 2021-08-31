function toggleTheme() {
  root = document.documentElement;
  root.classList.toggle("alt-theme");
}
window.onscroll = function() {
  var header = document.getElementsByClassName('site-header')[0];
  if (document.body.scrollTop > 50 || document.documentElement.scrollTop > 50) {
    header.classList.add('is-scolled');
  } else {
    header.classList.remove('is-scolled');
  }
};
var btn = document.getElementById('menu-btn');
var nav = document.getElementById('main-nav');
btn.addEventListener('click', function(e) {
  btn.classList.toggle('is-active');
  nav.classList.toggle('is-active');
  document.body.classList.toggle('noscroll');
  e.preventDefault();
});