import React from 'react';
import {FC, useState} from 'react';
import {Text, Box, HStack, Heading, VStack, Pressable} from 'native-base';
import IonIcons from 'react-native-vector-icons/Ionicons';
import {Screen, CustomButton} from '@components/index';
import {LargeInput} from './components/LargeInput';
import {widthPercentageToDP} from 'react-native-responsive-screen';
import {Colors} from '@theme/colors';

type AuthMode = 'signin' | 'signup';
export interface IAuthScreenProps {}

export const AuthScreen: FC<IAuthScreenProps> = () => {
  const [isShowPassword, setIsShowPassword] = useState(false);
  const [authMode, setAuthMode] = useState<AuthMode>('signin');

  const handleEyeClick = () => {
    setIsShowPassword(v => !v);
  };

  const handleSwitchAuthMode = () => {
    setAuthMode(v => (v === 'signin' ? 'signup' : 'signin'));
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
      <Box mb={widthPercentageToDP(authMode === 'signin' ? 16 : 8)}>
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
        {authMode === 'signup' && (
          <LargeInput
            placeholder="Re-password"
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
        )}
      </VStack>
    );
  };

  const renderButtons = () => {
    return (
      <VStack space={widthPercentageToDP(4)}>
        <CustomButton>
          {authMode === 'signin' ? 'Sign in' : 'Sign up'}
        </CustomButton>
        <Text
          mb={widthPercentageToDP(2)}
          color={Colors.textSecondary}
          textAlign={'center'}
          fontSize="lg"
          fontStyle="italic">
          Or
        </Text>
        <CustomButton
          backgroundColor={'success.700'}
          onPress={handleSwitchAuthMode}>
          {authMode === 'signin'
            ? "Don't have any account"
            : 'Already have an account?'}
        </CustomButton>
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
