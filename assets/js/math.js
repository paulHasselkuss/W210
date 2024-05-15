'use strict';

import 'js/vendor/mathjax/tex-chtml.js';

/* global MathJax:writable */
/* exported MathJax */
MathJax = {
  tex: {
    displayMath: [['\\[', '\\]'], ['$$', '$$']], // block
    inlineMath: [['\\(', '\\)']], // inline
  },
};
