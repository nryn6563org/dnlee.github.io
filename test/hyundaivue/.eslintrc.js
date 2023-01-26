module.exports = {
    root: true,
    env: {
        node: true,
        'vue/setup-compiler-macros': true
    },
    extends: [
        'plugin:vue/vue3-essential',
        '@vue/standard'
    ],
    parserOptions: {
        parser: '@babel/eslint-parser'
    },
    rules: {
        'no-console': process.env.NODE_ENV === 'production' ? 'warn' : 'off',
        'no-debugger': process.env.NODE_ENV === 'production' ? 'warn' : 'off',
        indent: ['error', 4],
        semi: ['error', 'never'],
        'no-trailing-spaces': 'error',
        'trailing-spaces': 0,
        'keyword-spacing': 0,
        'no-unused-vars': 1,
        'no-multiple-empty-lines': 0,
        'space-before-function-paren': 0,
        'eol-last': 0,
        'no-multiple-template-root': 0,
        'vue/script-setup-uses-vars': 'error'
    }
}
