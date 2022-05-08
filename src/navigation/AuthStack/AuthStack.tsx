import React from 'react';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import {AuthStackParamList} from '@navigation/AuthStack/AuthStack.type';
import {AuthController} from '@screens/Auth/AuthController';
import {HomeTab} from '@navigation/HomeTab/HomeTab';

const Stack = createNativeStackNavigator<AuthStackParamList>();

export const AuthStack = () => {
  return (
    <Stack.Navigator
      screenOptions={{
        headerShown: false,
      }}
      initialRouteName={'Auth'}>
      <Stack.Screen name={'Auth'} component={AuthController} />
      <Stack.Screen name={'HomeTab'} component={HomeTab} />
    </Stack.Navigator>
  );
};
