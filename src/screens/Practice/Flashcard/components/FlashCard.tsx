import React from 'react';
import {Box, HStack, Text} from 'native-base';
import {widthPercentageToDP} from 'react-native-responsive-screen';
import {Colors} from '@theme/colors';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';

interface FlashCardProps {
  title: string;
  content: string;
}

export const Flashcard: React.FC<FlashCardProps> = ({title, content}) => {
  return (
    <Box flex={1}>
      <Box
        mx={widthPercentageToDP(6)}
        flex={1}
        my={4}
        borderColor={Colors.textSecondary}
        borderWidth={1}
        rounded={'xs'}
        backgroundColor={'white'}>
        <Box
          p={3}
          borderBottomColor={Colors.textSecondary}
          borderBottomWidth={1}>
          <Text
            textAlign={'center'}
            fontWeight={'bold'}
            fontSize={'md'}
            color={Colors.charcoalGray}>
            {title}
          </Text>
        </Box>
        <HStack space={widthPercentageToDP(3)} p={3} alignItems={'center'}>
          <MaterialCommunityIcons
            size={widthPercentageToDP(4)}
            name={'arrow-right-circle'}
          />
          <Text color={Colors.charcoalGray}>{content}</Text>
        </HStack>
      </Box>
    </Box>
  );
};
