import React from 'react';
import {PracticeScreen} from '@screens/Practice/PracticeScreen';
import {PracticeScreenProps} from '@navigation/Practice';
import {ITagService} from '@core/modules/tag/interfaces/tag-service.interface';
import {TagService} from '@core/modules/tag/tag.service';

interface PracticeControllerProps extends PracticeScreenProps<'Practice'> {
  tagService?: ITagService;
}

interface PracticeControllerState {}

export class PracticeController extends React.Component<
  PracticeControllerProps,
  PracticeControllerState
> {
  tagService: ITagService;
  constructor(props: PracticeControllerProps) {
    super(props);
    this.tagService = props.tagService || new TagService();
  }

  get navigation() {
    return this.props.navigation;
  }

  handleFlashcardPress = () => {
    this.navigation.push('Flashcard', {
      numberOfWords: 12,
      tagName: 'Test',
    });
  };

  render() {
    return <PracticeScreen onFlashcardPress={this.handleFlashcardPress} />;
  }
}
