import React from 'react';
import {InStackScreenProps} from '@navigation/navigation';
import {AddNewWordScreen} from './AddNewWordScreen';
import {WordService} from '@core/modules/word/word.service';
import {WordDto} from '@core/modules/word/dtos/word.dto';
import {IWordService} from '@core/modules/word/inferfaces/word-service.interface';
import {ITagService} from '@core/modules/tag/interfaces/tag-service.interface';
import {TagService} from '@core/modules/tag/tag.service';
import {ITag} from '@core/modules/tag/interfaces/tag.interface';

export type AddNewWordControllerProps = InStackScreenProps<'AddNewWord'> & {
  wordService?: IWordService;
  tagService?: ITagService;
};

type AddNewWordControllerState = {
  tags: ITag[];
};

export class AddNewWordController extends React.Component<
  AddNewWordControllerProps,
  AddNewWordControllerState
> {
  wordService: IWordService;
  tagService: ITagService;
  state = {
    tags: [],
  };

  constructor(props: AddNewWordControllerProps) {
    super(props);
    this.wordService = props.wordService || new WordService();
    this.tagService = props.tagService || new TagService();
  }

  async componentDidMount() {
    try {
      await this.wordService.initializeRepositoryCollection();
      await this.tagService.initializeRepositoryCollection();
      await this.getAllTags();
    } catch (e) {
      throw e;
    }
  }

  addNewWord = (dto: WordDto) => {
    return this.wordService.insert(dto);
  };

  getAllTags = async () => {
    const tags = await this.tagService.getAllDocuments();
    if (tags?.length) {
      this.setState({
        tags: tags.map(tag => {
          const tagJson = tag.toJSON();
          return {
            ...tagJson,
            wordIds: Array.from(tagJson.wordIds),
          };
        }),
      });
    }
  };

  render() {
    return (
      <AddNewWordScreen tags={this.state.tags} addNewWord={this.addNewWord} />
    );
  }
}
