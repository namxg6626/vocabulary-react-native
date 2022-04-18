import React from 'react';
import {PracticeScreenProps} from '@navigation/Practice';
import {FlashcardScreen} from '@screens/Practice/Flashcard/FlashcardScreen';

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
    const {tagName, numberOfWords} = this.route.params;
    this.navigation.setOptions({
      title: `${tagName} (${numberOfWords})`,
    });
  }

  render() {
    return <FlashcardScreen />;
  }
}
