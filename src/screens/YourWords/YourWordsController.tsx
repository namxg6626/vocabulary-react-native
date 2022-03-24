import React from 'react';
import {InStackScreenProps} from '@navigation/navigation';
import {WordService} from '@core/modules/word/word.service';
import {IWordService} from '@core/modules/word/inferfaces/word-service.interface';
import {YourWordsScreen} from '@screens/YourWords/YourWordsScreen';
import {IWord} from '@core/modules/word/inferfaces/word.interface';

export type YourWordsProps = InStackScreenProps<'YourWords'> & {
  wordService?: IWordService;
};

type YourWordsState = {
  serviceLoaded: boolean;
  words: IWord[];
};

export class YourWordsController extends React.Component<
  YourWordsProps,
  YourWordsState
> {
  wordService: IWordService;
  state = {
    serviceLoaded: false,
    words: [],
  };

  constructor(props: YourWordsProps) {
    super(props);
    this.wordService = props.wordService || new WordService();
  }

  async componentDidMount() {
    await this.wordService.initializeRepositoryCollection();
    await this.getAllWords();
  }

  getAllWords = async () => {
    const words = await this.wordService.getAllDocuments();
    if (words.length) {
      this.setState({
        words: words.map(w => w.toJSON()),
      });
    }
  };

  render() {
    return <YourWordsScreen words={this.state.words} />;
  }
}
