'use strict';
import 'js/vendor/mathjax/tex-chtml.js';

// eslint-disable-next-line no-undef
MathJax = {
  tex: {
    displayMath: [['\\[', '\\]'], ['$$', '$$']],  // block
    inlineMath: [['\\(', '\\)']],                 // inline
  },
};
