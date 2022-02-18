module.exports = {
  projects: [
    {
      displayName: 'App components',
      testMatch: [
        '<rootDir>/app/**/*.spec.js',
      ],
      testEnvironment: 'jsdom',
      setupFilesAfterEnv: [
        '<rootDir>/jest.env.js',
      ],
      verbose: true,
    }
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
