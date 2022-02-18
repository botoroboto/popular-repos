module.exports = {
  projects: [
    {
      displayName: 'APP components',
      testMatch: [
        '<rootDir>/app/**/*.spec.js',
      ],
      testPathIgnorePatterns: [
        '<rootDir>/app/.*/services/.*/*.spec.js',
      ],
      testEnvironment: 'jsdom',
      setupFilesAfterEnv: [
        '<rootDir>/jest.env.js',
      ],
      verbose: true,
    },
    {
      displayName: 'API tests',
      testMatch: [
        '<rootDir>/app/**/services/**/*.spec.js',
      ],
      testEnvironment: 'node',
      setupFilesAfterEnv: [
        '<rootDir>/jest.env.js',
      ],
    },
  ],
  collectCoverage: true,
  coveragePathIgnorePatterns: [
    '<rootDir>/jest.*',
    '<rootDir>/tests/',
    '<rootDir>/config/',
    '<rootDir>/node_modules/',
  ],
  coverageDirectory: '<rootDir>/coverage',
  coverageReporters: [
    'html',
    'json',
    'lcov',
  ],
  verbose: false,
};
