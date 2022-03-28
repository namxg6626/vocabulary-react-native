import React from 'react';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import {AuthScreen} from '@screens/Auth';
import {DashboardScreen} from '@screens/Dashboard/DashboardScreen';
import {MainStackParamList} from './navigation';
import {Platform} from 'react-native';
import {AddNewWordController} from '@screens/AddNewWord/AddNewWordController';
import {YourWordsController} from '@screens/YourWords/YourWordsController';
import {YourTagsController} from '@screens/YourTags/YourTagsController';

const Stack = createNativeStackNavigator<MainStackParamList>();

export const MainStack = () => {
  return (
    <Stack.Navigator
      screenOptions={{
        animation: Platform.OS === 'android' ? 'slide_from_right' : 'default',
        headerShown: false,
      }}
      initialRouteName="Auth">
      <Stack.Screen name="Auth" component={AuthScreen} />
      <Stack.Screen name="Dashboard" component={DashboardScreen} />
      <Stack.Screen name="AddNewWord" component={AddNewWordController} />
      <Stack.Screen name="YourWords" component={YourWordsController} />
      <Stack.Screen name="YourTags" component={YourTagsController} />
    </Stack.Navigator>
  );
};
