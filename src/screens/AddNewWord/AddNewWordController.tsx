import React from 'react';
import {InStackScreenProps} from '@navigation/navigation';
import {AddNewWordScreen} from './AddNewWordScreen';
import {WordService} from '@core/modules/word/word.service';
import {WordDto} from '@core/modules/word/dtos/word.dto';

export type AddNewWordControllerProps = InStackScreenProps<'AddNewWord'> & {
  wordService?: WordService;
};

type AddNewWordControllerState = {};

export class AddNewWordController extends React.Component<
  AddNewWordControllerProps,
  AddNewWordControllerState
> {
  wordService: WordService;

  constructor(props: AddNewWordControllerProps) {
    super(props);
    this.wordService = props.wordService || new WordService();
  }

  componentDidMount() {
    this.wordService.initializeRepositoryCollection();
  }

  addNewWord = async (dto: WordDto) => {
    return await this.wordService.insert(dto);
  };

  getAllWords = async () => {
    return await this.wordService.getAllDocuments();
  };

  render() {
    return (
      <AddNewWordScreen
        addNewWord={this.addNewWord}
        getAllWords={this.getAllWords}
      />
    );
  }
}
