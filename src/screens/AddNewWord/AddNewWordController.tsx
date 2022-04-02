import React from 'react';
import {InStackScreenProps} from '@navigation/navigation';
import {AddNewWordScreen, AddNewWordForm} from './AddNewWordScreen';
import {WordService} from '@core/modules/word/word.service';
import {IWordService} from '@core/modules/word/inferfaces/word-service.interface';
import {ITagService} from '@core/modules/tag/interfaces/tag-service.interface';
import {TagService} from '@core/modules/tag/tag.service';
import {ITag} from '@core/modules/tag/interfaces/tag.interface';
import {IMessageService} from '@core/modules/message/message-service.interface';
import {MessageService} from '@core/modules/message/message.service';
import _ from 'lodash';

export type AddNewWordControllerProps = InStackScreenProps<'AddNewWord'> & {
  wordService?: IWordService;
  tagService?: ITagService;
  messageService?: IMessageService;
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
  messageService: IMessageService;
  state = {
    tags: [],
  };

  constructor(props: AddNewWordControllerProps) {
    super(props);
    this.wordService = props.wordService || new WordService();
    this.tagService = props.tagService || new TagService();
    this.messageService = props.messageService || new MessageService();
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

  addNewWord = async (formValue: AddNewWordForm) => {
    const wordDto = _.omit(formValue, 'tagRxId');
    const tagRxId = formValue.tagRxId;
    let result;
    if (tagRxId) {
      result = await this.tagService.addNewWordToTag(tagRxId, wordDto);
    } else {
      result = await this.wordService.insert(wordDto);
    }

    this.messageService.pushMessage({
      title: 'New word is added',
      status: 'success',
    });
    return !!result;
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
