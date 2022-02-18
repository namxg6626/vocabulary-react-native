import React from 'react';
import {FC} from 'react';
import {Text} from 'native-base';
import {Screen} from '@components/Screen';

import type {InStackScreenProps} from '@navigation/navigation';

export const DashboardScreen: FC<InStackScreenProps<'Dashboard'>> = () => {
  return (
    <Screen>
      <Text>Hi this is dashboard</Text>
    </Screen>
  );
};
