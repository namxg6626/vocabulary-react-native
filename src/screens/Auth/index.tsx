import React from 'react';
import {FC} from 'react';
import {
  Text,
  Box,
  HStack,
  Heading,
  Input,
  VStack,
  FormControl,
} from 'native-base';
import {Pressable} from 'react-native';
import Icon from 'react-native-vector-icons/MaterialIcons';
import {Screen} from '@components/index';
import {widthPercentageToDP} from 'react-native-responsive-screen';
import {Colors} from '@theme/colors';

export interface IAuthScreenProps {}

export const AuthScreen: FC<IAuthScreenProps> = () => {
  const renderGuestRow = () => {
    return (
      <HStack
        marginBottom={widthPercentageToDP(8)}
        justifyContent={'space-between'}
        alignItems={'flex-end'}>
        <Box
          key="green-square"
          h={widthPercentageToDP(12)}
          w={widthPercentageToDP(12)}
          backgroundColor={'tertiary.300'}
          borderRadius={widthPercentageToDP(3.5)}
        />
        <Pressable onPress={() => console.log('Hi there')}>
          <Text textDecorationLine={'underline'}>{'Continue as guest ->'}</Text>
        </Pressable>
      </HStack>
    );
  };

  const renderWellcome = () => {
    return (
      <Box mb={widthPercentageToDP(16)}>
        <Heading size={'2xl'}>Wellcome</Heading>
        <Text color={Colors.textSecondary} fontSize={'xl'}>
          Are you ready to learn
        </Text>
        <Text color={Colors.textSecondary} fontSize={'xl'}>
          Vocabulary?
        </Text>
      </Box>
    );
  };

  const renderFields = () => {
    return (
      <VStack space={4}>
        <FormControl>
          <FormControl.Label fontSize={'xl'}>
            <Text fontSize={'md'}>Email</Text>
          </FormControl.Label>
          <Input
            InputLeftElement={
              <Icon.Button
                name="facebook"
                backgroundColor={Colors.textSecondary}
              />
            }
          />
        </FormControl>
      </VStack>
    );
  };

  return (
    <Screen>
      {renderGuestRow()}
      {renderWellcome()}
      {renderFields()}
    </Screen>
  );
};
