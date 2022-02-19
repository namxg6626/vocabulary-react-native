import React from 'react';
import {FC} from 'react';
import {VStack, HStack, Pressable, Text, Box} from 'native-base';
import type {IPressableProps} from 'native-base';
import {ColorType} from 'native-base/lib/typescript/components/types';
import {widthPercentageToDP} from 'react-native-responsive-screen';

export interface ILargeColorizedButtonProps extends IPressableProps {
  $textContent1: string;
  $textContent2: string;
  $bgColor: ColorType;
  $icon: React.ReactNode;
}

export const LargeColorizedButton: FC<ILargeColorizedButtonProps> = ({
  $textContent1,
  $textContent2,
  $bgColor,
  $icon,
  ...props
}) => {
  return (
    <Box flex={1}>
      <Pressable {...props} onPress={() => console.log('hello')}>
        <VStack
          p={4}
          backgroundColor={$bgColor}
          space={widthPercentageToDP(4)}
          rounded={'3xl'}>
          <Box>
            <Text fontWeight={'bold'} fontSize="md" fontStyle="italic">
              {$textContent1}
            </Text>
            <Text fontWeight={'bold'} fontSize="md" fontStyle="italic">
              {$textContent2}
            </Text>
          </Box>
          <HStack justifyContent={'center'}>{$icon}</HStack>
        </VStack>
      </Pressable>
    </Box>
  );
};
