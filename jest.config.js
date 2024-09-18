// jest.config.js
module.exports = {
  roots: ['<rootDir>/src/ui/tests'], 
  transform: {
    '^.+\\.tsx?$': 'ts-jest', 
  },
  testMatch: ['**/?(*.)+(spec|test).[tj]s?(x)'], 
  moduleFileExtensions: ['ts', 'tsx', 'js', 'jsx', 'json', 'node'], 
};
