import React from 'react';
import {Screen} from '@components/Screen';
import {Text, Center, Button} from 'native-base';

// interface CompleteScreenProps {
//   numberOfIncorrect: number;
//   numberOfCorrect: number;
//   totalAnswer: number;
//   onRePracticeAll: () => void;
//   onRePracticeIncorrect: () => void;
// }

interface CompleteScreenProps {
  onPracticeAgain: () => void;
}

export const CompleteScreen: React.FC<CompleteScreenProps> = ({
  onPracticeAgain,
}) => {
  return (
    <Screen>
      <Center flex={1}>
        <Text mb={3}>Chúc mừng bạn đã hoàn thành bài luyện tập</Text>
        <Button
          onPress={onPracticeAgain}
          size="md"
          variant={'solid'}
          colorScheme="success">
          Luyện tập lại
        </Button>
      </Center>
    </Screen>
  );
};
