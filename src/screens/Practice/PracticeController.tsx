import React from 'react';
import {PracticeScreen} from '@screens/Practice/PracticeScreen';
import {PracticeScreenProps} from '@navigation/PracticeStack';
import {ITagService} from '@core/modules/tag/interfaces/tag-service.interface';
import {TagService} from '@core/modules/tag/tag.service';
import {ITag} from '@core/modules/tag/interfaces/tag.interface';
import {IWord} from '@core/modules/word/inferfaces/word.interface';
import {IWordService} from '@core/modules/word/inferfaces/word-service.interface';
import {WordService} from '@core/modules/word/word.service';
import get from 'lodash/get';
import {RxDocument} from 'rxdb';
import {Nullable} from '@utils/types';
import {IMessageService} from '@core/modules/message/message-service.interface';
import {MessageService} from '@core/modules/message/message.service';

interface PracticeControllerProps extends PracticeScreenProps<'Practice'> {
  tagService?: ITagService;
  wordService?: IWordService;
  messageService?: IMessageService;
}

interface PracticeControllerState {
  tags: ITag[];
}

export class PracticeController extends React.Component<
  PracticeControllerProps,
  PracticeControllerState
> {
  tagService: ITagService;
  wordService: IWordService;
  messageService: IMessageService;
  state = {
    tags: [],
  };

  constructor(props: PracticeControllerProps) {
    super(props);
    this.tagService = props.tagService || new TagService();
    this.wordService = props.wordService || new WordService();
    this.messageService = props.messageService || new MessageService();
  }

  componentDidMount() {
    this.getAllTags();
  }

  get navigation() {
    return this.props.navigation;
  }

  getAllTags = async () => {
    const tags = await this.tagService.getAllDocuments();
    if (tags) {
      const tagsJson = tags.map(t => ({
        ...t.toJSON(),
        wordIds: Array.from(t.wordIds),
      }));

      this.setState({
        tags: tagsJson,
      });
    }
  };

  getWords = async (tag: Nullable<ITag>) => {
    let words: RxDocument<IWord>[];
    if (tag) {
      words = await this.tagService.getWordsByTag(tag.rxId);
    } else {
      words = await this.wordService.getAllDocuments();
    }
    return words;
  };

  handleFlashcardTagChange = async (tag: Nullable<ITag>) => {
    const words = await this.getWords(tag);
    this.navigation.push('Flashcard', {
      tagName: get(tag, 'name', 'All Words'),
      words: words.map(w => w.toJSON()),
    });
  };

  handleCorrectAnswerTagChange = async (tag: Nullable<ITag>) => {
    const words = await this.getWords(tag);
    if (words.length < 4) {
      this.messageService.pushMessage({
        title: 'Not enough number of word',
        description:
          'You have to add at least 4 words to this tag to use this function',
        status: 'error',
        duration: 5000,
      });
      return;
    }

    this.navigation.push('CorrectAnswer', {
      tagName: get(tag, 'name', 'All Words'),
      words: words.map(w => w.toJSON()),
    });
  };

  render() {
    return (
      <PracticeScreen
        tags={this.state.tags}
        onFlashcardTagChange={this.handleFlashcardTagChange}
        onCorrectAnswerTagChange={this.handleCorrectAnswerTagChange}
      />
    );
  }
}
