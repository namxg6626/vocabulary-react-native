import React, {useState} from 'react';
import {Screen} from '@components/Screen';
import {Button, FormControl, VStack} from 'native-base';
import {useForm, Controller} from 'react-hook-form';
import {CustomInput} from '@components/Input';
import {yupResolver} from '@hookform/resolvers/yup';
import {changePasswordValidationSchema} from '@screens/ChangePassword/validation-schema';

export interface ChangePasswordFormValue {
  oldPassword: string;
  newPassword: string;
  reEnterNewPassword: string;
}

const SPACING = 4;

interface ChangePasswordScreenProps {
  onSavePassword: (value: ChangePasswordFormValue) => void;
  loading: boolean;
}

export const ChangePasswordScreen: React.FC<ChangePasswordScreenProps> = ({
  onSavePassword,
  loading,
}) => {
  const [isRevealed, setIsRevealed] = useState(false);
  const inputType = isRevealed ? 'text' : 'password';

  const {
    control,
    handleSubmit,
    formState: {errors},
  } = useForm<ChangePasswordFormValue>({
    resolver: yupResolver(changePasswordValidationSchema),
  });

  const toggleReveal = () => {
    setIsRevealed(v => !v);
  };

  const handleSavePassword = (value: ChangePasswordFormValue) => {
    onSavePassword(value);
  };

  return (
    <Screen>
      <VStack flex={1} space={SPACING}>
        <FormControl isRequired isInvalid={!!errors.oldPassword?.message}>
          <FormControl.Label>Old password</FormControl.Label>
          <Controller
            control={control}
            name={'oldPassword'}
            render={({field}) => {
              return (
                <CustomInput
                  type={inputType}
                  value={field.value}
                  onChangeText={field.onChange}
                  placeholder={'type your old password'}
                />
              );
            }}
          />
          <FormControl.ErrorMessage>
            {errors.oldPassword?.message}
          </FormControl.ErrorMessage>
        </FormControl>
        <FormControl isRequired isInvalid={!!errors.newPassword?.message}>
          <FormControl.Label>New password</FormControl.Label>
          <Controller
            control={control}
            name={'newPassword'}
            render={({field}) => {
              return (
                <CustomInput
                  type={inputType}
                  value={field.value}
                  onChangeText={field.onChange}
                  placeholder={'type your new password'}
                />
              );
            }}
          />
          <FormControl.ErrorMessage>
            {errors.newPassword?.message}
          </FormControl.ErrorMessage>
        </FormControl>
        <FormControl
          isRequired
          isInvalid={!!errors.reEnterNewPassword?.message}>
          <FormControl.Label>Re-enter new password</FormControl.Label>
          <Controller
            control={control}
            name={'reEnterNewPassword'}
            render={({field}) => {
              return (
                <CustomInput
                  type={inputType}
                  value={field.value}
                  onChangeText={field.onChange}
                  placeholder={'type your new password'}
                />
              );
            }}
          />
          <FormControl.ErrorMessage>
            {errors.reEnterNewPassword?.message}
          </FormControl.ErrorMessage>
        </FormControl>
        <VStack space={SPACING} mt={'auto'}>
          <Button
            isLoading={loading}
            py={3}
            rounded={'md'}
            colorScheme={'info'}
            onPress={toggleReveal}>
            Toggle reveal
          </Button>
          <Button
            isLoading={loading}
            py={3}
            rounded={'md'}
            colorScheme={'success'}
            onPress={handleSubmit(handleSavePassword)}>
            Save
          </Button>
        </VStack>
      </VStack>
    </Screen>
  );
};
