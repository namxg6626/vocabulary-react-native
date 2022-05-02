import React, {useEffect} from 'react';
import {useMutation} from '@apollo/client';
import {MainStackScreenProps, MainStackParamList} from '@navigation/MainStack';
import {AuthFormValue, AuthScreen} from './AuthScreen';
import {Loader} from '@components/Loader';
import {AuthData, SIGN_IN, SIGN_UP, SignInVars, SignUpVars} from './gql';
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
    AuthData,
    SignInVars
  >(SIGN_IN);
  const [signUp, {data: signUpData, loading: isSignUpLoading}] = useMutation<
    AuthData,
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
    const user = await asyncStorageService?.tryGetObject(
      AsyncStorageKeyEnum.AUTH_DATA,
    );
    if (user) {
      gotoDashboard({});
    }
  };

  useEffect(() => {
    retrieveUserAndGotoDashboard();
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
