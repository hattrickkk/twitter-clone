export default {
    preset: 'ts-jest/presets/default-esm',
    testEnvironment: 'jsdom',
    moduleNameMapper: {
        '^@/(.*)$': '<rootDir>/src/$1',
    },
    moduleFileExtensions: ['ts', 'tsx', 'js', 'jsx', 'json', 'node'],
    setupFilesAfterEnv: ['@testing-library/jest-dom/jest-globals'],
    transformIgnorePatterns: ['/node_modules/'],
    testMatch: ['**/src/__tests__/**/*.test.ts', '**/src/__tests__/**/*.test.tsx'],
}
