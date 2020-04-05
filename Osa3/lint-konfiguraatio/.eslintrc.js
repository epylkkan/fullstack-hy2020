module.exports = {
    'env': {
        'node': true,
        'es6': true, 
        'commonjs': true
    },
    'extends': 'eslint:recommended',
    'globals': {
        'Atomics': 'readonly',
        'SharedArrayBuffer': 'readonly'
    },
    'parserOptions': {
        'ecmaVersion': 2018
    },
    'rules': {
        'indent': [
            'error',
            4
        ],
        'linebreak-style': [
            'error',
            'unix'
        ],
        'quotes': [
            'error',
            'single'
        ],
        'semi': [
            'error',
            'never'
        ], 
        'eqeqeq': [
            'error'
	], 
	'arrow-spacing': [
        'error', { 'before': true, 'after': true }
         ], 
        'no-console': 0
    }
}