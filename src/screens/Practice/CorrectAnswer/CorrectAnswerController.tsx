import React from 'react';
import {PracticeScreenProps} from '@navigation/PracticeStack';
import {
  CorrectAnswerScreen,
  Question,
} from '@screens/Practice/CorrectAnswer/CorrectAnswerScreen';
import {IWord} from '@core/modules/word/inferfaces/word.interface';
import _ from 'lodash';

interface CorrectAnswerControllerProps
  extends PracticeScreenProps<'CorrectAnswer'> {}

interface CorrectAnswerControllerState {
  questions: Question[];
}

export class CorrectAnswerController extends React.Component<
  CorrectAnswerControllerProps,
  CorrectAnswerControllerState
> {
  state = {
    questions: [],
  };

  get navigation() {
    return this.props.navigation;
  }

  get route() {
    return this.props.route;
  }

  componentDidMount() {
    this.setupTitle();
    this.setupQuestions();
  }

  setupTitle = () => {
    this.navigation.setOptions({
      title: `${this.route.params.tagName} (${this.route.params.words.length})`,
    });
  };

  setupQuestions = () => {
    const questions = this.makeQuestions(this.route.params.words);
    this.setState({questions});
  };

  makeAnswers = (words: IWord[], correctAnswerIndex: number) => {
    const takeRandomIncorrectAnswers = (
      internalWords: IWord[],
      initialWrongAnswers: IWord[],
      excludeIndexes: Array<number>,
    ): IWord[] => {
      if (initialWrongAnswers.length === 3) {
        return initialWrongAnswers;
      }

      let randomIndex = 0;
      do {
        randomIndex = Math.floor(Math.random() * internalWords.length);
      } while (excludeIndexes.includes(randomIndex));

      const wrongAnswer = internalWords[randomIndex];
      initialWrongAnswers.push(wrongAnswer);
      excludeIndexes.push(randomIndex);

      return takeRandomIncorrectAnswers(
        internalWords,
        initialWrongAnswers,
        excludeIndexes,
      );
    };

    return takeRandomIncorrectAnswers(words, [], [correctAnswerIndex]);
  };

  makeQuestions = (words: IWord[]): Question[] => {
    return words.reduce((questions, word, i, originalArray) => {
      const newQuestion: Question = {
        correctAnswer: word,
        description: word.meaning,
        answers: _.shuffle([word, ...this.makeAnswers(originalArray, i)]),
      };

      questions.push(newQuestion);
      return questions;
    }, [] as Question[]);
  };

  render() {
    return <CorrectAnswerScreen questions={this.state.questions} />;
  }
}
