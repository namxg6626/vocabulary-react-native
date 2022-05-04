/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * Generated with the TypeScript template
 * https://github.com/react-native-community/react-native-template-typescript
 *
 * @format
 */

import 'react-native-reanimated';
import React from 'react';
import 'react-native-get-random-values';
import {NativeBaseProvider, Text, Toast, Box} from 'native-base';
import {ApolloProvider} from '@apollo/client';
import {NavigationContainer} from '@react-navigation/native';
import {gestureHandlerRootHOC} from 'react-native-gesture-handler';

import {MainStack} from '@navigation/MainStack/MainStack';
import {client} from '@core/apollo/client';
import {theme} from '@theme/index';

import {IMessageService} from '@core/modules/message/message-service.interface';
import {MessageService} from '@core/modules/message/message.service';
import {widthPercentageToDP} from 'react-native-responsive-screen';
import {Subscription} from 'rxjs';
import {initRxDatabaseAsync} from '@core/database/rxdb';
import {Colors} from '@theme/colors';

// make things are identical on almost devices
(Text as any).defaultProps = {};
(Text as any).defaultProps.allowFontScaling = false;

type RootProps = {
  messageService?: IMessageService;
};

interface RootState {
  ready: boolean;
}

class Root extends React.Component<RootProps, RootState> {
  messageService: IMessageService;
  messageSubscription!: Subscription;
  private toastIds: any[] = [];

  state = {
    ready: false,
  };

  constructor(props: RootProps) {
    super(props);
    this.messageService = props.messageService || new MessageService();
  }

  componentDidMount() {
    this.subscribeMessage();
    this.handleInitRxDatabase();
  }

  componentWillUnmount() {
    this.messageSubscription.unsubscribe();
  }

  subscribeMessage() {
    this.messageSubscription = this.messageService
      .getMessage()
      .subscribe(message => {
        const toastId = Toast.show({
          ...message,
          shadow: '8',
          mx: widthPercentageToDP(10),
        });

        this.toastIds.push(toastId);

        // maximum 2 toasts at the same time
        if (this.toastIds.length > 2) {
          Toast.close(this.toastIds.shift());
        }

        setTimeout(() => {
          Toast.close(toastId);
          this.toastIds = this.toastIds.filter(id => id !== toastId);
        }, message.duration || 2000);
      });
  }

  handleInitRxDatabase = () => {
    initRxDatabaseAsync()
      .then(() => {
        this.setState({ready: true});
      })
      .catch(e => {
        this.messageService.pushMessage({
          title: 'Error🥲',
          status: 'error',
          description: e.message,
        });
        throw e;
      });
  };

  render() {
    return (
      <ApolloProvider client={client}>
        <NativeBaseProvider theme={theme}>
          <NavigationContainer>
            <MainStack />
            <Box
              display={this.state.ready ? 'none' : undefined}
              position={'absolute'}
              backgroundColor={Colors.charcoalGray}
              top={0}
              left={0}
              height={'full'}
              width={'full'}
              opacity={0.3}
              justifyContent={'center'}
            />
          </NavigationContainer>
        </NativeBaseProvider>
      </ApolloProvider>
    );
  }
}

export default gestureHandlerRootHOC(Root);
// export default Root;
