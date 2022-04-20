import React from 'react';
import {PracticeScreenProps} from '@navigation/PracticeStack';
import {FlashcardScreen} from '@screens/Flashcard/FlashcardScreen';

interface FlashcardControllerProps extends PracticeScreenProps<'Flashcard'> {}
interface FlashcardControllerState {}

export class FlashcardController extends React.Component<
  FlashcardControllerProps,
  FlashcardControllerState
> {
  get navigation() {
    return this.props.navigation;
  }

  get route() {
    return this.props.route;
  }

  componentDidMount() {
    this.setupTitle();
  }

  setupTitle() {
    const {tagName, words} = this.route.params;
    this.navigation.setOptions({
      title: `${tagName} (${words.length})`,
    });
  }

  render() {
    return <FlashcardScreen words={this.route.params.words} />;
  }
}
