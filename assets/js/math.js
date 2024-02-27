import 'mathjax/es5/tex-chtml.js'

// eslint-disable-next-line no-undef
MathJax = {
  tex: {
    displayMath: [['\\[', '\\]'], ['$$', '$$']],  // block
    inlineMath: [['\\(', '\\)']],                 // inline
  },
};