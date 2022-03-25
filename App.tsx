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
import {NativeBaseProvider, Text} from 'native-base';
import {ApolloProvider} from '@apollo/client';
import {NavigationContainer} from '@react-navigation/native';

import {MainStack} from '@navigation/MainStack';
import {apolloClient} from './apollo.client';
import {theme} from '@theme/index';
import 'react-native-get-random-values';

// make things are identical on almost devices
(Text as any).defaultProps = {};
(Text as any).defaultProps.allowFontScaling = false;

const App = () => {
  return (
    <ApolloProvider client={apolloClient}>
      <NativeBaseProvider theme={theme}>
        <NavigationContainer>
          <MainStack />
        </NavigationContainer>
      </NativeBaseProvider>
    </ApolloProvider>
  );
};

export default App;
