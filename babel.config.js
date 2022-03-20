module.exports = {
  presets: ['module:metro-react-native-babel-preset'],
  plugins: [
    [
      'module-resolver',
      {
        root: ['./src'],
        alias: {
          '@components': './src/components',
          '@theme': './src/theme',
          '@screens': './src/screens',
          '@navigation': './src/navigation',
          '@hooks': './src/hooks',
          '@core': './src/core',
          'pouchdb-md5': 'react-native-pouchdb-md5',
          'pouchdb-binary-utils':
            '@craftzdog/pouchdb-binary-utils-react-native',
        },
      },
    ],
  ],
};
