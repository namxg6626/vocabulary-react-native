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
import {NativeBaseProvider, Text, Toast} from 'native-base';
import {ApolloProvider} from '@apollo/client';
import {NavigationContainer} from '@react-navigation/native';

import {MainStack} from '@navigation/MainStack';
import {apolloClient} from '../apollo.client';
import {theme} from '@theme/index';

import {IMessageService} from '@core/modules/message/message-service.interface';
import 'react-native-get-random-values';
import {MessageService} from '@core/modules/message/message.service';
import {widthPercentageToDP} from 'react-native-responsive-screen';
import {Subscription} from 'rxjs';

// make things are identical on almost devices
(Text as any).defaultProps = {};
(Text as any).defaultProps.allowFontScaling = false;

type AppProps = {
  messageService?: IMessageService;
};

class App extends React.Component<AppProps, {}> {
  messageService: IMessageService;
  subscription!: Subscription;

  constructor(props: AppProps) {
    super(props);
    this.messageService = props.messageService || new MessageService();
  }

  componentDidMount() {
    this.subscription = this.messageService.getMessage().subscribe(message => {
      Toast.show({
        ...message,
        shadow: '8',
        mx: widthPercentageToDP(10),
      });
      setTimeout(() => {
        Toast.closeAll();
      }, 2000);
    });
  }

  componentWillUnmount() {
    this.subscription.unsubscribe();
  }

  render() {
    return (
      <ApolloProvider client={apolloClient}>
        <NativeBaseProvider theme={theme}>
          <NavigationContainer>
            <MainStack />
          </NavigationContainer>
        </NativeBaseProvider>
      </ApolloProvider>
    );
  }
}

export default App;
