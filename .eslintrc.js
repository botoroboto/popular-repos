module.exports = {
  env: {
    browser: true,
    es6: true,
    node: true,
  },
  extends: [
    'eslint:recommended',
    'plugin:react/recommended'
  ],
  ignorePatterns: [
    'dist',
    'node_modules',
  ],
  parser: '@babel/eslint-parser',
  parserOptions: {
    requireConfigFile: false,
    ecmaFeatures: {
      experimentalObjectRestSpread: true,
      jsx: true,
    },
    sourceType: 'module',
  },
  plugins: ['react', 'testing-library', 'jest-dom'],
  rules: {
    indent: ['warn', 2],
    quotes: ['error', 'single'],
    semi: ['error', 'always'],
  },
  overrides: [
    {
      files: ['*.js'],
      rules: {
        'react/prop-types': 'off',
        'react/react-in-jsx-scope': 'off',
        'react-hooks/exhaustive-deps': 'off',
        'max-len': 'off',
        'react/jsx-curly-newline': 'off',
        'react/no-unused-prop-types': 'off',
        'no-unused-vars': 'warn',
        'camelcase': 'off',
        'operator-linebreak': ['warn', 'after'],
        'jsx-a11y/anchor-is-valid': 'off',
        'jsx-a11y/click-events-have-key-events': 'off',
        'no-nested-ternary': 'warn',
      },
    },
    {
      files: ['*.spec.js'],
      rules: {
        'react/prop-types': 'off',
        'react/react-in-jsx-scope': 'off',
        'react-hooks/exhaustive-deps': 'off',
        'max-len': 'off',
        'react/no-unused-prop-types': 'off',
        'no-unused-vars': 'warn',
        'camelcase': 'off',
        'no-undef': 'off',
        'no-nested-ternary': 'warn',
      },
    },
  ],
  settings: {
    react: {
      version: 'detect'
    }
  }
};
