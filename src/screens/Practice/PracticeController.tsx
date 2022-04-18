import React from 'react';
import {PracticeScreen} from '@screens/Practice/PracticeScreen';
import {PracticeScreenProps} from '@navigation/Practice';

interface PracticeControllerProps extends PracticeScreenProps<'Practice'> {}

interface PracticeControllerState {}

export class PracticeController extends React.Component<
  PracticeControllerProps,
  PracticeControllerState
> {
  render() {
    return <PracticeScreen />;
  }
}
