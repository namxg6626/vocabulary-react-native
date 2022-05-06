import React, {useEffect} from 'react';
import {useMutation} from '@apollo/client';
import {MainStackParamList, MainStackScreenProps} from '@navigation/MainStack';
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

type DashboardParams = MainStackParamList['Dashboard'];

interface AuthControllerProps extends MainStackScreenProps<'Auth'> {
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
      onCompleted: data => {
        asyncStorageService?.trySetObject(AsyncStorageKeyEnum.AUTH_DATA, data);
        asyncStorageService?.set(AsyncStorageKeyEnum.TOKEN, data.signin.token);
        gotoDashboard({username: data.signin.user.email});
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
      onCompleted: data => {
        asyncStorageService?.trySetObject(AsyncStorageKeyEnum.AUTH_DATA, data);
        asyncStorageService?.set(AsyncStorageKeyEnum.TOKEN, data.signup.token);
        gotoDashboard({username: data.signup.user.email});
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

  const handleGoToDashboardAsGuest = () => {
    gotoDashboard({isGuest: true});
  };

  const gotoDashboard = (params: DashboardParams) => {
    navigation.navigate('Dashboard', params);
  };

  const retrieveUserAndGotoDashboard = async () => {
    const storedSignInData =
      await asyncStorageService?.tryGetObject<SignInData>(
        AsyncStorageKeyEnum.AUTH_DATA,
      );
    if (storedSignInData) {
      gotoDashboard({username: storedSignInData.signin.user.email});
    }
  };

  function clearAsyncStorage() {
    return asyncStorageService?.removeAll();
  }

  useEffect(() => {
    retrieveUserAndGotoDashboard();
    // clearAsyncStorage();
  }, []);

  return (
    <>
      <Loader
        title={'Processing...'}
        indicatorColor={'white'}
        textColor={'white'}
        loading={isLoading}
      />
      <AuthScreen
        onSignInSubmit={handleSignIn}
        onSignUpSubmit={handleSignUp}
        onGoToDashboardAsGuest={handleGoToDashboardAsGuest}
      />
    </>
  );
};
