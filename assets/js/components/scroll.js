'use strict';

let isTicking = false;

function handleScroll(scrollPosition = window.scrollY) {
  if (scrollPosition > 50) {
    document.body.classList.add('is-scrolled');
  } else {
    document.body.classList.remove('is-scrolled');
  }
}

document.addEventListener('scroll', () => {
  // simple & native throttle: https://developer.mozilla.org/en-US/docs/Web/API/Document/scroll_event
  if (!isTicking) {
    window.requestAnimationFrame(() => {
      handleScroll();
      isTicking = false;
    });
    isTicking = true;
  }
});
