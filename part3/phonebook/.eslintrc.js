module.exports = {
  "extends": "airbnb-base",
  "env": {
    "browser": true,
    "commonjs": true,
    "es6": true,
    "node": true,
  },
  "globals": {
    'Atomics': 'readonly',
    'SharedArrayBuffer': 'readonly'
  },
  "parserOptions": {
    'ecmaVersion': 2018
  },
  "rules": {
    'linebreak-style': [ 'error', 'windows' ]
  },
};