import eslintPluginAstro from 'eslint-plugin-astro';

export default [
  {
    ignores: ['.astro/**', 'dist/**', 'public/**', 'node_modules/**', 'src/**/*.ts', 'src/**/*.d.ts'],
  },
  ...eslintPluginAstro.configs['flat/recommended'],
  {
    rules: {
      'astro/no-set-html-directive': 'off',
    },
  },
];
