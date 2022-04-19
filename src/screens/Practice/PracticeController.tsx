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

interface PracticeControllerProps extends PracticeScreenProps<'Practice'> {
  tagService?: ITagService;
  wordService?: IWordService;
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
  state = {
    tags: [],
  };

  constructor(props: PracticeControllerProps) {
    super(props);
    this.tagService = props.tagService || new TagService();
    this.wordService = props.wordService || new WordService();
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

  handleFlashcardEmitTag = async (tag: ITag | null) => {
    let words: RxDocument<IWord>[];
    if (tag) {
      words = await this.tagService.getWordsByTag(tag.rxId);
    } else {
      words = await this.wordService.getAllDocuments();
    }
    this.navigation.push('Flashcard', {
      tagName: get(tag, 'name', 'All Words'),
      words: words.map(w => w.toJSON()),
    });
  };

  render() {
    return (
      <PracticeScreen
        tags={this.state.tags}
        onFlashcardEmitTag={this.handleFlashcardEmitTag}
      />
    );
  }
}
