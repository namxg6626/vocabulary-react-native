import React from 'react';
import {InStackScreenProps} from '@navigation/navigation';
import {AddNewWordScreen} from './AddNewWordScreen';
import {WordService} from '@core/modules/word/word.service';
import {WordDto} from '@core/modules/word/dtos/word.dto';
import {IWordService} from '@core/modules/word/inferfaces/word-service.interface';

export type AddNewWordControllerProps = InStackScreenProps<'AddNewWord'> & {
  wordService?: WordService;
};

type AddNewWordControllerState = {};

export class AddNewWordController extends React.Component<
  AddNewWordControllerProps,
  AddNewWordControllerState
> {
  wordService: IWordService;

  constructor(props: AddNewWordControllerProps) {
    super(props);
    this.wordService = props.wordService || new WordService();
  }

  async componentDidMount() {
    await this.wordService.initializeRepositoryCollection();
  }

  addNewWord = async (dto: WordDto) => {
    return await this.wordService.insert(dto);
  };

  render() {
    return <AddNewWordScreen addNewWord={this.addNewWord} />;
  }
}
