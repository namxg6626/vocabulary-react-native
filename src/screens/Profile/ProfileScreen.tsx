import React, {useEffect} from 'react';
import {VStack, Avatar, Center, FormControl, Button} from 'native-base';
import {Screen} from '@components/Screen';
import {Colors} from '@theme/colors';
import {CustomInput} from '@components/Input';
import {useForm, Controller} from 'react-hook-form';
import {MeQueryResponse} from '@screens/Profile/gql';

const SPACING = 8;

interface ProfileFormValue {
  username: string;
  email: string;
  password: string;
}

interface ProfileScreenProps {
  user?: MeQueryResponse['me'];
  onLogout: () => void;
}

export const ProfileScreen: React.FC<ProfileScreenProps> = ({
  user,
  onLogout,
}) => {
  const {control, reset} = useForm<ProfileFormValue>();

  useEffect(() => {
    if (user) {
      reset({...user});
    }
  }, [user]);

  return (
    <Screen safeArea>
      <VStack flex={1} space={SPACING} justifyContent={'space-between'}>
        <VStack
          p={4}
          rounded={'md'}
          space={SPACING}
          backgroundColor={Colors.limedSpruce}>
          <Center>
            <Avatar
              size={'2xl'}
              bg="green.500"
              source={{
                uri: 'https://images.unsplash.com/photo-1603415526960-f7e0328c63b1?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1470&q=80',
              }}
            />
          </Center>
          <FormControl>
            <FormControl.Label>Username</FormControl.Label>
            <Controller
              control={control}
              name={'username'}
              render={({field}) => {
                return (
                  <CustomInput
                    value={field.value}
                    onChangeText={field.onChange}
                    placeholder={'Type your username'}
                  />
                );
              }}
            />
          </FormControl>
          <FormControl>
            <FormControl.Label>Email</FormControl.Label>
            <Controller
              control={control}
              name={'email'}
              render={({field}) => {
                return (
                  <CustomInput
                    value={field.value}
                    onChangeText={field.onChange}
                    placeholder={'Type your email'}
                  />
                );
              }}
            />
          </FormControl>
        </VStack>
        <VStack space={SPACING / 2}>
          <Button py={3} rounded={'md'} colorScheme={'success'}>
            Save
          </Button>
          <Button py={3} rounded={'md'} colorScheme={'info'}>
            Change password
          </Button>
          <Button
            py={3}
            rounded={'md'}
            colorScheme={'danger'}
            onPress={onLogout}>
            Logout
          </Button>
        </VStack>
      </VStack>
    </Screen>
  );
};
