// jest.config.js
module.exports = {
    setupFilesAfterEnv: ['<rootDir>/jest.setup.ts'],
    testPathIgnorePatterns: ['<rootDir>/.next/', '<rootDir>/node_modules/'],
    moduleNameMapper: {
        '^@components(.*)$': '<rootDir>/components$1',
        '^@helpers(.*)$': '<rootDir>/helpers$1',
        '^@lib(.*)$': '<rootDir>/lib$1',
        '^@theme(.*)$': '<rootDir>/theme$1',
        '^@utils(.*)$': '<rootDir>/utils$1',
    },
};
