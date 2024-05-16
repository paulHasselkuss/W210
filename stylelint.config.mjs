/** @type {import('stylelint').Config} */
export default {
  extends: 'stylelint-config-recommended-scss',
  ignoreFiles: ['**/vendor/**'],
  rules: {
    'at-rule-empty-line-before': [
      'always',
      {
        except: ['blockless-after-same-name-blockless', 'first-nested'],
        ignore: ['after-comment', 'inside-block'],
      },
    ],
    'property-no-unknown': [
      true,
      {
        ignoreProperties: ['font-named-instance'],
      },
    ],
    // the rule does not play nice with LSP
    'scss/operator-no-unspaced': null,
  },
};
