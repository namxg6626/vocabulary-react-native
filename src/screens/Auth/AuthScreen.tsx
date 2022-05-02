import React from 'react';
import {FC, useState} from 'react';
import {Text, Box, HStack, Heading, VStack, Pressable} from 'native-base';
import IonIcons from 'react-native-vector-icons/Ionicons';
import {Screen, CustomButton} from '@components/index';
import {LargeInput} from './components/LargeInput';
import {widthPercentageToDP} from 'react-native-responsive-screen';
import {Colors} from '@theme/colors';
import {useForm, Controller} from 'react-hook-form';
import * as validationSchema from './validation-schema';
import {yupResolver} from '@hookform/resolvers/yup';

export type AuthFormValue = {
  email: string;
  password: string;
  repassword?: string;
};

type AuthMode = 'signin' | 'signup';

interface AuthScreenProps {
  onSignInSubmit: (value: AuthFormValue) => void;
  onSignUpSubmit: (value: AuthFormValue) => void;
  onGoToDashboardAsGuest: () => void;
}

export const AuthScreen: FC<AuthScreenProps> = ({
  onSignInSubmit,
  onSignUpSubmit,
  onGoToDashboardAsGuest,
}) => {
  const [isShowPassword, setIsShowPassword] = useState(false);
  const [authMode, setAuthMode] = useState<AuthMode>('signin');

  const {
    control,
    formState: {errors},
    handleSubmit: hookFormHandleSubmit,
  } = useForm<AuthFormValue>({
    resolver: yupResolver(
      authMode === 'signin' ? validationSchema.signIn : validationSchema.signUp,
    ),
  });

  const handleSubmit = (value: AuthFormValue) => {
    delete value.repassword;
    if (authMode === 'signin') {
      onSignInSubmit(value);
    } else {
      onSignUpSubmit(value);
    }
  };

  const handleEyeClick = () => {
    setIsShowPassword(v => !v);
  };

  const handleSwitchAuthMode = () => {
    setAuthMode(v => (v === 'signin' ? 'signup' : 'signin'));
  };

  const gotoDashboardAsGuest = () => {
    onGoToDashboardAsGuest();
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
        <Pressable onPress={gotoDashboardAsGuest}>
          <Text textDecorationLine={'underline'}>{'Continue as guest ->'}</Text>
        </Pressable>
      </HStack>
    );
  };

  const renderWelcome = () => {
    return (
      <Box mb={widthPercentageToDP(authMode === 'signin' ? 16 : 8)}>
        <Heading size={'3xl'}>Welcome</Heading>
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
        <Controller
          name="email"
          control={control}
          render={({field: {onChange, onBlur, value}}) => (
            <LargeInput
              isInvalid={'email' in errors}
              errorMessage={errors.email?.message}
              onChangeText={onChange}
              onBlur={onBlur}
              value={value}
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
          )}
        />

        <Controller
          name="password"
          control={control}
          render={({field: {onChange, onBlur, value}}) => (
            <LargeInput
              isInvalid={'password' in errors}
              errorMessage={errors.password?.message}
              onChangeText={onChange}
              onBlur={onBlur}
              value={value}
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
          )}
        />

        {authMode === 'signup' && (
          <Controller
            name="repassword"
            control={control}
            render={({field: {onChange, onBlur, value}}) => (
              <LargeInput
                isInvalid={'repassword' in errors}
                errorMessage={errors.repassword?.message}
                onChangeText={onChange}
                onBlur={onBlur}
                value={value}
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
                  <Pressable
                    p={widthPercentageToDP(2)}
                    onPress={handleEyeClick}>
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
          />
        )}
      </VStack>
    );
  };

  const renderButtons = () => {
    return (
      <VStack space={widthPercentageToDP(4)}>
        <CustomButton onPress={hookFormHandleSubmit(handleSubmit)}>
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
    <Screen safeArea>
      {renderGuestRow()}
      {renderWelcome()}
      {renderFields()}
      {renderButtons()}
    </Screen>
  );
};
