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
import {ApolloClient, InMemoryCache, ApolloProvider} from '@apollo/client';

const nativebaseConfig = {
  useSystemColorMode: false,
  initialColorMode: 'dark',
};
const theme = extendTheme({config: nativebaseConfig});
const apolloClient = new ApolloClient({
  uri: 'http://localhost:3000/graphql',
  headers: {
    'Content-Type': 'application/json',
  },
  cache: new InMemoryCache(),
});

const App = () => {
  return (
    <ApolloProvider client={apolloClient}>
      <NativeBaseProvider theme={theme}>
        <AuthScreen />
      </NativeBaseProvider>
    </ApolloProvider>
  );
};

export default App;
