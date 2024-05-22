import type { Config } from '@jest/types';

const config: Config.InitialOptions = {
  verbose: true,
  testEnvironment: 'jsdom',
  testMatch: [
    '<rootDir>src/**/*(*.)test.ts?(x)',
  ],
  moduleNameMapper: {
    '\\.(css|less|scss)$': 'jest-css-modules-transform'
  },
  setupFilesAfterEnv: ["<rootDir>/jest/setupTests.ts"],
};
export default config;