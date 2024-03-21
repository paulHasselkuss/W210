'use strict';

const themeToggle = document.getElementById('themeToggle');
const themeMetas = document.querySelectorAll('meta[name="theme-color"]');

function handleTheme(add = sessionStorage.getItem('alt-theme')) {
  if (add) {
    document.documentElement.classList.add('alt-theme');
    setThemeMeta('data-alt');
  } else {
    document.documentElement.classList.remove('alt-theme');
    setThemeMeta('data-default');
  }
}

function setThemeMeta(attribute) {
  for (const m of themeMetas) {
    m.setAttribute('content', m.getAttribute(attribute));
  }
}

themeToggle.addEventListener('click', (e) => {
  let status = sessionStorage.getItem('alt-theme');
  if (status) {
    sessionStorage.removeItem('alt-theme');
  } else {
    sessionStorage.setItem('alt-theme', 'true');
  }
  handleTheme(!status);
  e.preventDefault();
});

document.addEventListener('DOMContentLoaded', handleTheme);


