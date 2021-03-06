import React from 'react';
import {MainStackScreenProps} from '@navigation/index';
import {WordDetailScreen, WordDetailForm} from './WordDetailScreen';
import {WordService} from '@core/modules/word/word.service';
import {IWordService} from '@core/modules/word/inferfaces/word-service.interface';
import {ITagService} from '@core/modules/tag/interfaces/tag-service.interface';
import {TagService} from '@core/modules/tag/tag.service';
import {ITag} from '@core/modules/tag/interfaces/tag.interface';
import {IMessageService} from '@core/modules/message/message-service.interface';
import {MessageService} from '@core/modules/message/message.service';

export type WordDetailControllerProps = MainStackScreenProps<'AddNewWord'> & {
  wordService?: IWordService;
  tagService?: ITagService;
  messageService?: IMessageService;
};

type WordDetailControllerState = {
  tags: ITag[];
};

export class WordDetailController extends React.Component<
  WordDetailControllerProps,
  WordDetailControllerState
> {
  wordService: IWordService;
  tagService: ITagService;
  messageService: IMessageService;
  state = {
    tags: [],
  };

  constructor(props: WordDetailControllerProps) {
    super(props);
    this.wordService = props.wordService || new WordService();
    this.tagService = props.tagService || new TagService();
    this.messageService = props.messageService || new MessageService();
  }

  get route() {
    return this.props.route;
  }

  async componentDidMount() {
    try {
      await this.getAllTags();
    } catch (e) {
      throw e;
    }
  }

  handleSubmit = async (formValue: WordDetailForm) => {
    const wordDto = formValue;
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
      <WordDetailScreen
        actionLabel={this.route?.params?.actionLabel}
        tags={this.state.tags}
        onSubmit={this.handleSubmit}
      />
    );
  }
}
