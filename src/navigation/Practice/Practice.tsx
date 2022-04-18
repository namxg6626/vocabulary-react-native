import React from 'react';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import {PracticeParamList} from '@navigation/Practice/Practice.type';
import {Platform} from 'react-native';
import {AppHeader} from '@components/AppHeader';
import {PracticeController} from '@screens/Practice/PracticeController';

const Stack = createNativeStackNavigator<PracticeParamList>();

export const PracticeStack = () => {
  return (
    <Stack.Navigator
      initialRouteName={'Practice'}
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
        name={'Practice'}
        options={{title: 'Practice'}}
        component={PracticeController}
      />
    </Stack.Navigator>
  );
};
