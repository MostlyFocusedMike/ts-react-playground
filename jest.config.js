module.exports = {
    roots: [
        '<rootDir>/src',
    ],
    moduleFileExtensions: [
        'ts',
        'tsx',
        'js',
    ],
    moduleNameMapper: {
        '\\.(jpg|jpeg|png|gif|eot|otf|webp|svg|ttf|woff|woff2|mp4|webm|wav|mp3|m4a|aac|oga)$': '<rootDir>/src/mocks/file-mock.js',
        '\\.(css|less)$': 'identity-obj-proxy',
    },
    transform: {
        '^.+\\.tsx?$': 'ts-jest', // just jest got by fine using this line
    },
    // automock: false,
    // setupFiles: [
    //     './setupJest.ts',
    // ],
    // globals: {
    //     'ts-jest': {
    //         diagnostics: false, // TODO: why can't it read fetchMock properly?
    //     },
    // },
};
