require('regenerator-runtime/runtime');
require('@testing-library/jest-dom');

// Supress custom console output in tests
global.console = {
  log: jest.fn(),
  error: jest.fn(),
  warn: jest.fn(),
  info: jest.fn(),
  debug: jest.fn(),
};
