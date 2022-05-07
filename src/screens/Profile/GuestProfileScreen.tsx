import React from 'react';
import {Screen} from '@components/Screen';
import {Empty} from '@components/Empty';

export const GuestProfileScreen: React.FC = () => {
  return (
    <Screen safeArea>
      <Empty
        title={'Opss!'}
        moreInfo={'You have to sign in to see the profile'}
      />
    </Screen>
  );
};
