import React from 'react';
import {InStackScreenProps} from '@navigation/navigation';
import {WordService} from '@core/modules/word/word.service';
import {YourWordsScreen} from '@screens/YourWords/YourWordsScreen';

export type YourWordsProps = InStackScreenProps<'YourWords'> & {
  wordService?: WordService;
};

type YourWordsState = {};

export class YourWordsController extends React.Component<
  YourWordsProps,
  YourWordsState
> {
  wordService: WordService;

  constructor(props: YourWordsProps) {
    super(props);
    this.wordService = props.wordService || new WordService();
  }

  render() {
    return <YourWordsScreen />;
  }
}
