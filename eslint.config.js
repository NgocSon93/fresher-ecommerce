import antfu from '@antfu/eslint-config'

export default antfu({
  ignorePatterns: [
    'public/',
    'assets/',
    'node_modules/',
  ],
  rules: {
    'vue/no-restricted-syntax': [
      'error',
      {
        selector: 'VElement[name=\'a\']',
        message: 'Use NuxtLink instead.',
      },
    ],
    'no-console': 'off',
    'node/prefer-global/process': 'off',
  },
})
