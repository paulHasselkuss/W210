'use strict';

const themeCheckbox = document.getElementById('themeCheckbox');
themeCheckbox.checked = localStorage.getItem('alt-theme') === 'true';

themeCheckbox.addEventListener('change', (e) => {
  localStorage.setItem('alt-theme', e.target.checked);
});
