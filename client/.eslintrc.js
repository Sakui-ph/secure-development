module.exports = {
    env: {
        browser: true,
        es2021: true,
        node: true,
        commonjs: true,
    },
    extends: ['wesbos'],
    overrides: [],
    parserOptions: {
        ecmaVersion: 'latest',
        sourceType: 'module',
        ecmaFeatures: {
            jsx: true,
        },
    },
    plugins: ['react'],
    rules: {
        'react/no-unescaped-entities': 'off',
        'no-unused-vars': 'off',
        'prettier/prettier': [
            'error',
            {
                singleQuote: true,
                endOfLine: 'auto',
                tabWidth: 4,
            },
        ],
        camelcase: 'off',
    },
};
