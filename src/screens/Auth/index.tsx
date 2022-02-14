import React from 'react';
import {FC, useState} from 'react';
import {Text, Box, HStack, Heading, VStack, Pressable} from 'native-base';
import IonIcons from 'react-native-vector-icons/Ionicons';
import {Screen, CustomButton} from '@components/index';
import {LargeInput} from './components/LargeInput';
import {widthPercentageToDP} from 'react-native-responsive-screen';
import {Colors} from '@theme/colors';

export interface IAuthScreenProps {}

export const AuthScreen: FC<IAuthScreenProps> = () => {
  const [isShowPassword, setIsShowPassword] = useState(false);

  const handleEyeClick = () => {
    setIsShowPassword(v => !v);
  };

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
        <Heading size={'3xl'}>Wellcome</Heading>
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
      <VStack mb={widthPercentageToDP(16)} space={widthPercentageToDP(10)}>
        <LargeInput
          placeholder="Email"
          iconBgColor="amber.400"
          renderIconComponent={() => (
            <IonIcons
              name="person"
              color={Colors.gumental}
              size={widthPercentageToDP(6)}
            />
          )}
        />
        <LargeInput
          placeholder="Password"
          type={isShowPassword ? undefined : 'password'}
          iconBgColor={'danger.500'}
          renderIconComponent={() => (
            <IonIcons
              name="lock-closed"
              color={Colors.gumental}
              size={widthPercentageToDP(6)}
            />
          )}
          InputRightElement={
            <Pressable p={widthPercentageToDP(2)} onPress={handleEyeClick}>
              <IonIcons
                style={{marginRight: widthPercentageToDP(2)}}
                name={isShowPassword ? 'eye-off' : 'eye'}
                color={Colors.textSecondary}
                size={widthPercentageToDP(6)}
              />
            </Pressable>
          }
        />
      </VStack>
    );
  };

  const renderButtons = () => {
    return (
      <VStack space={widthPercentageToDP(16)}>
        <CustomButton>Sign in</CustomButton>
      </VStack>
    );
  };

  return (
    <Screen>
      {renderGuestRow()}
      {renderWellcome()}
      {renderFields()}
      {renderButtons()}
    </Screen>
  );
};
