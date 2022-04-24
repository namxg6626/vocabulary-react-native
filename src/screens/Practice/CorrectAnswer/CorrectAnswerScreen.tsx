import React from 'react';
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

interface CorrectAnswerScreenProps {
  questions: Question[];
}

export const CorrectAnswerScreen: React.FC<CorrectAnswerScreenProps> = () => {
  return (
    <Screen>
      <HStack
        px={1}
        space={SPACING}
        borderBottomWidth={0.2}
        borderColor={Colors.textSecondary}>
        <Text flex={1}>10/75</Text>
        <Text>Correct: 5</Text>
        <Text>Incorrect: 5</Text>
      </HStack>
      <VStack flex={1} justifyContent={'center'}>
        <HStack flex={1} alignItems={'center'} justifyContent={'center'}>
          <Text textAlign={'center'} fontWeight={'700'} fontSize={'2xl'}>
            {'Bản năng'}
          </Text>
        </HStack>
        <HStack flex={1} justifyContent={'space-around'} flexWrap={'wrap'}>
          <Box width={'50%'} p={1}>
            <Box
              h={MAX_ANSWER_HEIGHT}
              padding={4}
              borderWidth={1}
              backgroundColor={Colors.limedSpruce}
              borderColor={Colors.lightningYellow}
              borderRadius={'md'}>
              <Text textAlign={'center'}>
                instinct aodsjfoiasj aldsjf;lkasjdf;kasjf; alkdsjf;klasjdfk
              </Text>
            </Box>
          </Box>
          <Box width={'50%'} p={1}>
            <Box
              h={MAX_ANSWER_HEIGHT}
              padding={4}
              backgroundColor={Colors.limedSpruce}
              borderColor={Colors.charcoalGray}
              borderRadius={'md'}>
              <Text textAlign={'center'}>instinct</Text>
            </Box>
          </Box>
          <Box width={'50%'} p={1}>
            <Box
              h={MAX_ANSWER_HEIGHT}
              padding={4}
              borderWidth={1}
              backgroundColor={Colors.limedSpruce}
              borderColor={Colors.charcoalGray}
              borderRadius={'md'}>
              <Text textAlign={'center'}>
                instinct aodsjfoiasj aldsjf;lkasjdf;kasjf; alkdsjf;klasjdfk
              </Text>
            </Box>
          </Box>
          <Box width={'50%'} p={1}>
            <Box
              h={MAX_ANSWER_HEIGHT}
              padding={4}
              borderWidth={1}
              backgroundColor={Colors.limedSpruce}
              borderColor={Colors.charcoalGray}
              borderRadius={'md'}>
              <Text textAlign={'center'}>instinct</Text>
            </Box>
          </Box>
        </HStack>
      </VStack>
    </Screen>
  );
};
