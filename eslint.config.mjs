/** @type { import("eslint").Linter.FlatConfig[] } */
import antfu from '@antfu/eslint-config';

export default antfu(
  {
    stylistic: {
      semi: true,
    },
    ignores: [
      '**/vendor/**',
    ],
  },
  {
    rules: {
      // see https://github.com/antfu/eslint-config/issues/449
      'curly': ['error', 'all'],
      'style/brace-style': ['error', '1tbs', {
        allowSingleLine: true,
      }],
    },
  },
);
