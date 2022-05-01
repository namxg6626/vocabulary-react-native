import React, {useState} from 'react';
import {TouchableHighlight, StyleSheet} from 'react-native';
import {Text, HStack, VStack, Box} from 'native-base';
import {Screen} from '@components/Screen';
import {Colors} from '@theme/colors';
import {IWord} from '@core/modules/word/inferfaces/word.interface';
import {widthPercentageToDP} from 'react-native-responsive-screen';

const SPACING = widthPercentageToDP(3);
const MAX_ANSWER_HEIGHT = widthPercentageToDP(30);

export interface Question {
  description: string;
  answers: IWord[];
  correctAnswer: IWord;
}

export interface CompleteData {
  numberOfCorrect: number;
  numberOfIncorrect: number;
}

interface CorrectAnswerScreenProps {
  questions: Question[];
  onComplete: (completeData: CompleteData) => void;
}

export const CorrectAnswerScreen: React.FC<CorrectAnswerScreenProps> = ({
  questions,
  onComplete,
}) => {
  const [questionIndex, setQuestionIndex] = useState(0);
  const [numberOfCorrect, setNumberOfCorrect] = useState(0);
  const [numberOfIncorrect, setNumberOfIncorrect] = useState(0);
  const [incorrectAnswerIndex, setIncorrectAnswerIndex] = useState(-1);
  const [shouldHighlightIncorrect, setShouldHighlightIncorrect] =
    useState(false);
  const [shouldHighlightCorrect, setShouldHighlightCorrect] = useState(false);

  const currentQuestion = questions[questionIndex];

  const nextQuestion = () => {
    if (questionIndex === questions.length - 1) {
      return;
    }

    resetAnswerState();
    setQuestionIndex(v => v + 1);
  };

  const handleAnswerPress = (answerIndex: number, isCorrectAnswer: boolean) => {
    const isHighlighting = shouldHighlightCorrect || shouldHighlightIncorrect;
    if (isHighlighting) {
      return;
    }

    if (isCorrectAnswer) {
      handleCorrectAnswerPress(answerIndex);
    } else {
      handleIncorrectAnswerPress(answerIndex);
    }

    setTimeout(() => {
      if (questionIndex === questions.length - 1) {
        onComplete({
          numberOfCorrect,
          numberOfIncorrect,
        });
      } else {
        nextQuestion();
      }
    }, 1000);
  };

  const handleCorrectAnswerPress = (_answerIndex: number) => {
    setShouldHighlightCorrect(true);
    setNumberOfCorrect(v => v + 1);
  };

  const handleIncorrectAnswerPress = (answerIndex: number) => {
    setIncorrectAnswerIndex(answerIndex);
    setShouldHighlightIncorrect(true);
    setShouldHighlightCorrect(true);
    setNumberOfIncorrect(v => v + 1);
  };

  const resetAnswerState = () => {
    setShouldHighlightCorrect(false);
    setShouldHighlightIncorrect(false);
    setIncorrectAnswerIndex(-1);
  };

  if (!currentQuestion) {
    return null;
  }

  return (
    <Screen>
      <HStack
        px={1}
        space={SPACING}
        borderBottomWidth={0.2}
        borderColor={Colors.textSecondary}>
        <Text flex={1}>
          {questionIndex + 1}/{questions.length}
        </Text>
        <Text>
          Correct: {numberOfCorrect}/{questions.length}
        </Text>
        <Text>
          Incorrect: {numberOfIncorrect}/{questions.length}
        </Text>
      </HStack>
      <VStack flex={1} justifyContent={'center'}>
        <HStack flex={1} alignItems={'center'} justifyContent={'center'}>
          <Text textAlign={'center'} fontWeight={'700'} fontSize={'2xl'}>
            {currentQuestion.correctAnswer.meaning}
          </Text>
        </HStack>
        <HStack flex={1} justifyContent={'space-around'} flexWrap={'wrap'}>
          {currentQuestion.answers.map((answer, i) => {
            const isCorrectAnswer =
              answer.rxId === currentQuestion.correctAnswer.rxId;

            const isPressedIncorrectAnswer = incorrectAnswerIndex === i;

            const shouldHighlight =
              (shouldHighlightCorrect && isCorrectAnswer) ||
              (shouldHighlightIncorrect && isPressedIncorrectAnswer);

            const shouldHighlightAsCorrect =
              isCorrectAnswer && shouldHighlightCorrect;

            return (
              <Box key={answer.rxId} width={'50%'} p={1}>
                <TouchableHighlight
                  onPress={() => {
                    handleAnswerPress(i, isCorrectAnswer);
                  }}
                  underlayColor={Colors.gumental}
                  activeOpacity={0.5}
                  style={styles.touchableAnswer}>
                  <Box
                    h={MAX_ANSWER_HEIGHT}
                    padding={4}
                    borderRadius={6}
                    borderWidth={shouldHighlight ? 2 : 0}
                    backgroundColor={Colors.limedSpruce}
                    borderColor={
                      shouldHighlightAsCorrect
                        ? Colors.parisGreen
                        : Colors.beanRed
                    }>
                    <Text textAlign={'center'}>{answer.word}</Text>
                  </Box>
                </TouchableHighlight>
              </Box>
            );
          })}
        </HStack>
      </VStack>
    </Screen>
  );
};

const styles = StyleSheet.create({
  touchableAnswer: {
    borderRadius: 6,
  },
});
