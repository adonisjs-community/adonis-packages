/**
 * @type {import('eslint').Linter.Config}
 */
// eslint-disable-next-line unicorn/no-empty-file
module.exports = {
  root: true,
  extends: ['@julr/eslint-config-vue', '@julr/eslint-config-prettier'],
  overrides: [
    {
      extends: ['plugin:@typescript-eslint/disable-type-checked'],
      files: ['./**/*.{js,cjs,json}'],
    },
  ],
  parserOptions: {
    tsconfigRootDir: __dirname,
    project: ['./tsconfig.json'],
    extraFileExtensions: ['.vue'],
  },
  rules: {
    'n/no-missing-import': 'off',
    'unicorn/filename-case': ['error', { cases: { snakeCase: true } }],
  },
}
