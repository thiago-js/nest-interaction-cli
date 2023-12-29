const jestConfig = require('./jest.config')
jestConfig.testMatch = ['<rootDir>/test/unit/**/*.spec.ts']
jestConfig.setupFilesAfterEnv = ['<rootDir>/test/unit/jest-unit.setup.ts']
module.exports = jestConfig
