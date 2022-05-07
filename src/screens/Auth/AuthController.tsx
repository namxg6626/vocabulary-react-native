import React, {useEffect} from 'react';
import {useMutation} from '@apollo/client';
import {MainStackParamList} from '@navigation/MainStack';
import {AuthFormValue, AuthScreen} from './AuthScreen';
import {Loader} from '@components/Loader';
import {
  SIGN_IN,
  SIGN_UP,
  SignInData,
  SignInVars,
  SignUpData,
  SignUpVars,
} from './gql';
import {IAsyncStorageService} from '@core/modules/async-storage/async-storage-service.interface';
import {AsyncStorageService} from '@core/modules/async-storage/async-storage.service';
import {AsyncStorageKeyEnum} from '@core/modules/async-storage/async-storage.enum';
import {IMessageService} from '@core/modules/message/message-service.interface';
import {MessageService} from '@core/modules/message/message.service';
import {AuthStackScreenProp} from '@navigation/AuthStack/AuthStack.type';

type DashboardParams = MainStackParamList['Dashboard'];

interface AuthControllerProps extends AuthStackScreenProp<'Auth'> {
  asyncStorageService?: IAsyncStorageService;
  messageService?: IMessageService;
}

export const AuthController: React.FC<AuthControllerProps> = ({
  navigation,
  asyncStorageService = new AsyncStorageService(),
  messageService = new MessageService(),
}) => {
  const [signIn, {loading: isSignInLoading}] = useMutation<
    SignInData,
    SignInVars
  >(SIGN_IN);
  const [signUp, {loading: isSignUpLoading}] = useMutation<
    SignUpData,
    SignUpVars
  >(SIGN_UP);

  const isLoading = isSignInLoading || isSignUpLoading;

  const handleSignIn = (value: AuthFormValue) => {
    signIn({
      variables: {
        signInInput: value,
      },
      onCompleted: async data => {
        await asyncStorageService?.trySetObject(
          AsyncStorageKeyEnum.AUTH_DATA,
          data,
        );
        await asyncStorageService?.set(
          AsyncStorageKeyEnum.TOKEN,
          data.signin.token,
        );
        gotoDashboardAsUser(data.signin.user.username);
      },
      onError: e => {
        messageService?.pushMessage({
          title: 'Sign in error',
          status: 'error',
          description: e.message,
          duration: 4000,
        });
      },
    });
  };

  const handleSignUp = (value: AuthFormValue) => {
    signUp({
      variables: {signUpInput: value},
      onCompleted: async data => {
        await asyncStorageService?.trySetObject(
          AsyncStorageKeyEnum.AUTH_DATA,
          data,
        );
        await asyncStorageService?.set(
          AsyncStorageKeyEnum.TOKEN,
          data.signup.token,
        );
        gotoDashboardAsUser(data.signup.user.username);
      },
      onError: e => {
        messageService?.pushMessage({
          title: 'Sign up error',
          status: 'error',
          description: e.message,
          duration: 4000,
        });
      },
    });
  };

  const gotoDashboard = (dashboardParams: DashboardParams = {}) => {
    navigation.navigate('HomeTab', {
      screen: 'MainStack',
      params: {
        screen: 'Dashboard',
        params: dashboardParams,
      },
    });
  };

  const gotoDashboardAsGuest = () => {
    gotoDashboard({isGuest: true});
  };

  const gotoDashboardAsUser = (username: string) => {
    gotoDashboard({
      isGuest: false,
      username,
    });
  };

  const tryRetrieveUserAndGotoDashboard = async () => {
    const storedSignInData =
      await asyncStorageService?.tryGetObject<SignInData>(
        AsyncStorageKeyEnum.AUTH_DATA,
      );
    if (storedSignInData) {
      gotoDashboardAsUser(storedSignInData.signin.user.username);
    }
  };

  function clearAsyncStorage() {
    return asyncStorageService?.removeAll();
  }

  useEffect(() => {
    tryRetrieveUserAndGotoDashboard();
    // clearAsyncStorage();
  }, []);

  return (
    <>
      <Loader title={'Processing...'} textColor={'white'} loading={isLoading} />
      <AuthScreen
        onSignInSubmit={handleSignIn}
        onSignUpSubmit={handleSignUp}
        onGoToDashboardAsGuest={gotoDashboardAsGuest}
      />
    </>
  );
};
