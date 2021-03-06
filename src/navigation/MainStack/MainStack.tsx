import React from 'react';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import {Platform} from 'react-native';
import {WordDetailController} from '@screens/WordDetail/WordDetailController';
import {YourTagsController} from '@screens/YourTags/YourTagsController';
import {AppHeader} from '@components/AppHeader';
import {MainStackParamList} from '@navigation/MainStack/MainStack.type';
import {ManageWordsStack} from '@navigation/ManageWordsStack/ManageWordsStack';
import {PracticeStack} from '@navigation/PracticeStack';
import {DashboardController} from '@screens/Dashboard/DashboardController';

const Stack = createNativeStackNavigator<MainStackParamList>();

export const MainStack = () => {
  return (
    <Stack.Navigator
      screenOptions={{
        animation: Platform.OS === 'android' ? 'slide_from_right' : 'default',
        headerShown: true,
        header: props => (
          <AppHeader
            headerContent={props.options.title}
            onBackPress={props.navigation.goBack}
          />
        ),
      }}
      initialRouteName="Dashboard">
      {/*<Stack.Screen*/}
      {/*  options={{*/}
      {/*    headerShown: false,*/}
      {/*  }}*/}
      {/*  name="Auth"*/}
      {/*  component={AuthController}*/}
      {/*/>*/}
      <Stack.Screen
        options={{
          headerShown: false,
        }}
        name="Dashboard"
        component={DashboardController}
      />
      <Stack.Screen
        initialParams={{
          actionLabel: 'Add this word',
        }}
        options={{
          title: 'New word',
        }}
        name="AddNewWord"
        component={WordDetailController}
      />
      <Stack.Screen
        options={{
          headerShown: false,
        }}
        name="ManageWords"
        component={ManageWordsStack}
      />
      <Stack.Screen
        options={{
          title: 'Your tags',
        }}
        name="YourTags"
        component={YourTagsController}
      />
      <Stack.Screen
        name={'PracticeStack'}
        options={{headerShown: false}}
        component={PracticeStack}
      />
    </Stack.Navigator>
  );
};
