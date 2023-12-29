module.exports = {
    preset: 'ts-jest',
    testEnvironment: 'node',
    roots: ['<rootDir>/test'],
    testMatch: [
        '<rootDir>/test/unit/**/*.spec.ts',
    ],
    moduleNameMapper: {
        '@/test/(.*)': '<rootDir>/test/$1',
        "@/application/(.*)": "<rootDir>/src/context/application/$1",
        "@/domain/(.*)": "<rootDir>/src/context/domain/$1",
        "@/shared/(.*)": "<rootDir>/src/context/shared/$1",
        "@/infra/(.*)": "<rootDir>/src/context/infra/$1"
    },
    moduleFileExtensions: ['js', 'json', 'ts'],
    transform: {
        '^.+\\.(t|j)s$': 'ts-jest',
    },
    collectCoverageFrom: ['**/*.(t|j)s'],
    coveragePathIgnorePatterns: [
        "src/context/application/controllers/request",
        "src/context/domain/entities",
        "src/context/infra",
        "src/context/shared/domain/helpers",
        "test"
    ],
    coverageDirectory: './coverage',
    fakeTimers: {
        enableGlobally: false,
    },
    setupFilesAfterEnv: [
        '<rootDir>/test/unit/jest-unit.setup.ts'
    ],
}
