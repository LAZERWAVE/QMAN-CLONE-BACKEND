module.exports = {
  "env": {
    "browser": true,
    "es2021": true,
  },
  "extends": [
    "google",
  ],
  "parserOptions": {
    "ecmaVersion": 12,
    "sourceType": "module",
  },
  "rules": {
    "semi": ["error", "always"],
    "quotes": ["error", "double"],
    "max-len": [2, {"code": 120, "tabWidth": 4, "ignoreUrls": true}],
    "require-jsdoc": 0,
  },
  "ignorePatterns": [
    "node_modules",
  ],
};
