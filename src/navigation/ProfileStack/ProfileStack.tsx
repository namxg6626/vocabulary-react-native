import {createNativeStackNavigator} from '@react-navigation/native-stack';
import {ProfileStackParamList} from '@navigation/ProfileStack/ProfileStack.types';
import {ProfileController} from '@screens/Profile/ProfileController';
import {ChangePasswordController} from '@screens/ChangePassword/ChangePasswordController';
import {AppHeader} from '@components/AppHeader';
import React from 'react';

const Stack = createNativeStackNavigator<ProfileStackParamList>();

export const ProfileStack = () => {
  return (
    <Stack.Navigator
      initialRouteName={'Profile'}
      screenOptions={{
        headerShown: true,
        header: props => (
          <AppHeader
            headerContent={props.options.title}
            onBackPress={props.navigation.goBack}
          />
        ),
      }}>
      <Stack.Screen
        options={{
          headerShown: false,
        }}
        name={'Profile'}
        component={ProfileController}
      />
      <Stack.Screen
        options={{
          title: 'Change password',
        }}
        name={'ChangePassword'}
        component={ChangePasswordController}
      />
    </Stack.Navigator>
  );
};
