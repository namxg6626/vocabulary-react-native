import React from 'react';
import {MainStackScreenProps} from '@navigation/MainStack';
import {DashboardScreen} from '@screens/Dashboard/DashboardScreen';
import get from 'lodash/get';
import {syncGraphQL} from '@core/database/rxdb';

interface DashboardControllerProps extends MainStackScreenProps<'Dashboard'> {}
interface DashboardControllerState {}

export class DashboardController extends React.Component<
  DashboardControllerProps,
  DashboardControllerState
> {
  constructor(props: DashboardControllerProps) {
    super(props);
  }

  get navigation() {
    return this.props.navigation;
  }

  get route() {
    return this.props.route;
  }

  componentDidMount() {
    const isGuest = get(this.route, 'params.isGuest', false);
    const isLoggedIn = !isGuest;

    if (isLoggedIn) {
      syncGraphQL()
        .then(() => {
          console.log('GraphQL Synchronization started');
        })
        .catch(e => {
          console.error('GraphQL Synchronization error', e);
        });
    }
  }

  render() {
    const isGuest = get(this.route, 'params.isGuest', false);
    const username = get(this.route, 'params.username', '');

    return (
      <DashboardScreen
        username={isGuest ? 'Guest' : username}
        onAddNewWordPress={() => this.navigation.push('AddNewWord')}
        onManageYourTagsPress={() => this.navigation.push('YourTags')}
        onManageYourWordsPress={() => this.navigation.push('ManageWords')}
        onPracticeGamesPress={() => this.navigation.push('PracticeStack')}
      />
    );
  }
}
