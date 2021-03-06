import React from 'react';
import {ManageWordsScreenProps} from '@navigation/index';
import {WordService} from '@core/modules/word/word.service';
import {IWordService} from '@core/modules/word/inferfaces/word-service.interface';
import {YourWordsScreen} from '@screens/YourWords/YourWordsScreen';
import {IWord} from '@core/modules/word/inferfaces/word.interface';
import {ITag} from '@core/modules/tag/interfaces/tag.interface';
import {ITagService} from '@core/modules/tag/interfaces/tag-service.interface';
import {TagService} from '@core/modules/tag/tag.service';
import {isUUID} from '@utils/index';

export type YourWordsProps = ManageWordsScreenProps<'YourWords'> & {
  wordService?: IWordService;
  tagService?: ITagService;
};

type YourWordsState = {
  words: IWord[];
  tags: ITag[];
};

export class YourWordsController extends React.Component<
  YourWordsProps,
  YourWordsState
> {
  wordService: IWordService;
  tagService: ITagService;
  currentTagRxId = '';
  state = {
    words: [],
    tags: [],
  };

  constructor(props: YourWordsProps) {
    super(props);
    this.wordService = props.wordService || new WordService();
    this.tagService = props.tagService || new TagService();
  }

  protected get navigation() {
    return this.props.navigation;
  }

  protected get route() {
    return this.props.route;
  }

  async componentDidMount() {
    await this.getAllWords();
    await this.getAllTags();
  }

  getAllWords = async () => {
    const words = await this.wordService.getAllDocuments();
    if (words) {
      this.setState({
        words: words.map(w => w.toJSON()),
      });
    }
  };

  getAllTags = async () => {
    const tags = await this.tagService.getAllDocuments();
    if (tags) {
      this.setState({
        tags: tags?.map(tag => {
          const tagJson = tag.toJSON();
          return {
            ...tagJson,
            wordIds: Array.from(tagJson.wordIds),
          };
        }),
      });
    }
  };

  getWordsByTag = async (tagRxId: string) => {
    if (isUUID(tagRxId)) {
      const words = await this.tagService.getWordsByTag(tagRxId);
      this.setState({
        words: words.map(word => word.toJSON()),
      });
    } else {
      await this.getAllWords();
    }
  };

  deleteWord = async (wordRxId: string, currentTagRxId: string = '') => {
    await this.wordService.deleteById(wordRxId);
    if (currentTagRxId) {
      await this.getWordsByTag(currentTagRxId);
    } else {
      await this.getAllWords();
    }
  };

  handleTagChange = (tagRxId: string) => {
    this.currentTagRxId = tagRxId;
    return this.getWordsByTag(tagRxId);
  };

  handlePenPress = (item: IWord) => {
    this.navigation.navigate('EditWord', {
      actionLabel: 'Edit',
      initialValue: item,
      afterUpdate: () => this.getWordsByTag(this.currentTagRxId),
    });
  };

  render() {
    return (
      <YourWordsScreen
        {...this.state}
        onDeleteWord={this.deleteWord}
        onTabChange={this.handleTagChange}
        onPenPress={this.handlePenPress}
      />
    );
  }
}
