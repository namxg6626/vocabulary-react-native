import React from 'react';
import {MainStackScreenProps} from '@navigation/MainStack';
import {DashboardScreen} from '@screens/Dashboard/DashboardScreen';
import get from 'lodash/get';
import {initRxDatabaseAsync, syncGraphQL} from '@core/database/rxdb';
import {IMessageService} from '@core/modules/message/message-service.interface';
import {MessageService} from '@core/modules/message/message.service';
import {Loader} from '@components/Loader';

interface DashboardControllerProps extends MainStackScreenProps<'Dashboard'> {
  messageService: IMessageService;
}

interface DashboardControllerState {
  loadingRxDB: boolean;
}

export class DashboardController extends React.Component<
  DashboardControllerProps,
  DashboardControllerState
> {
  messageService: IMessageService;
  state = {
    loadingRxDB: true,
  };

  constructor(props: DashboardControllerProps) {
    super(props);
    this.messageService = props.messageService || new MessageService();
  }

  get navigation() {
    return this.props.navigation;
  }

  get route() {
    return this.props.route;
  }

  async componentDidMount() {
    await this.handleInitRxDB();
    await this.handleSyncGraphQL();
  }

  logError(message: string) {
    this.messageService.pushMessage({
      title: 'Error',
      status: 'error',
      description: message,
    });
  }

  handleSyncGraphQL = async () => {
    try {
      const isGuest = get(this.route, 'params.isGuest', false);
      const isLoggedIn = !isGuest;

      if (isLoggedIn) {
        await syncGraphQL();
        console.log('GraphQL Synchronization started');
      } else {
        console.log('GraphQL Synchronization denied');
      }
    } catch (e: any) {
      this.logError(e.message);
    }
  };

  handleInitRxDB = async () => {
    try {
      await initRxDatabaseAsync();
      console.log('RxDB initialized');
      this.setState({loadingRxDB: false});
    } catch (e: any) {
      this.logError(e.message);
    }
  };

  render() {
    const isGuest = get(this.route, 'params.isGuest', false);
    const username = get(this.route, 'params.username', '');

    return (
      <>
        <Loader title={'Preparing...'} loading={this.state.loadingRxDB} />
        <DashboardScreen
          username={isGuest ? 'Guest' : username}
          onAddNewWordPress={() => this.navigation.push('AddNewWord')}
          onManageYourTagsPress={() => this.navigation.push('YourTags')}
          onManageYourWordsPress={() => this.navigation.push('ManageWords')}
          onPracticeGamesPress={() => this.navigation.push('PracticeStack')}
        />
      </>
    );
  }
}
