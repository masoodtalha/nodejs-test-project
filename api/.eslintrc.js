module.exports = {
    "extends": "eslint-config-google",
    parserOptions: {
      ecmaVersion: 8,
      sourceType: 'module',
      allowImportExportEverywhere: true,
      ecmaFeatures: {
        experimentalObjectRestSpread: true,
      }
    }
};
