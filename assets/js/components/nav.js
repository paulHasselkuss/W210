'use strict';

const navToggle = document.getElementById('navToggle');

navToggle.addEventListener('click', (e) => {
  document.body.classList.toggle('nav-active')
  navToggle.classList.toggle('is-active');
  e.preventDefault();
});
