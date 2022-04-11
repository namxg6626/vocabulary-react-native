import React from 'react';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import {ManageWordsParamList} from '@navigation/ManageWords/ManageWords.type';
import {YourWordsController} from '@screens/YourWords/YourWordsController';
import {EditWordController} from '@screens/YourWords/EditWord/EditWordController';
import {Platform} from 'react-native';
import {AppHeader} from '@components/AppHeader';

const Stack = createNativeStackNavigator<ManageWordsParamList>();

export const ManageWordsStack = () => {
  return (
    <Stack.Navigator
      initialRouteName={'YourWords'}
      screenOptions={{
        animation: Platform.OS === 'android' ? 'slide_from_right' : 'default',
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
          title: 'Your words',
        }}
        name={'YourWords'}
        component={YourWordsController}
      />
      <Stack.Screen
        options={{title: 'Edit word'}}
        name={'EditWord'}
        component={EditWordController}
      />
    </Stack.Navigator>
  );
};
