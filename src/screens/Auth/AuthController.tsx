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

type DashboardParams = MainStackParamList['Dashboard'];

interface AuthControllerProps extends MainStackScreenProps<'Auth'> {
  asyncStorageService?: IAsyncStorageService;
}

export const AuthController: React.FC<AuthControllerProps> = ({
  navigation,
  asyncStorageService = new AsyncStorageService(),
}) => {
  const [signIn, {data: signInData, loading: isSignInLoading}] = useMutation<
    SignInData,
    SignInVars
  >(SIGN_IN);
  const [signUp, {data: signUpData, loading: isSignUpLoading}] = useMutation<
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
        asyncStorageService?.trySetObject(
          AsyncStorageKeyEnum.TOKEN,
          data.signin.token,
        );
        gotoDashboard({username: data.signin.user.email});
      },
      onError: error => {
        console.error(error);
      },
    });
  };

  const handleSignUp = (value: AuthFormValue) => {
    // signUpMutation({
    //   variables: {signUpInput: value},
    // });
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
    // retrieveUserAndGotoDashboard();
    clearAsyncStorage();
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
