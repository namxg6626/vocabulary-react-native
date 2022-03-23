import React from 'react';
import {Screen} from '@components/Screen';
import {Text} from 'native-base';

export const YourWordsScreen: React.FC = () => {
  return (
    <Screen headerContent={'Your Words'} enableStatusBar={true}>
      <Text>Hello</Text>
    </Screen>
  );
};
