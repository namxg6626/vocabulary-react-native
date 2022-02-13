/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * Generated with the TypeScript template
 * https://github.com/react-native-community/react-native-template-typescript
 *
 * @format
 */

import React from 'react';
import {NativeBaseProvider, extendTheme} from 'native-base';
import {AuthScreen} from './src/screens/Auth';

const config = {
  useSystemColorMode: false,
  initialColorMode: 'dark',
};
const theme = extendTheme({config});

const App = () => {
  return (
    <NativeBaseProvider theme={theme}>
      <AuthScreen />
    </NativeBaseProvider>
  );
};

export default App;
