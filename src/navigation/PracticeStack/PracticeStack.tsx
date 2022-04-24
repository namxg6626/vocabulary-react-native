import React from 'react';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import {PracticeParamList} from '@navigation/PracticeStack/PracticeStack.type';
import {Platform} from 'react-native';
import {AppHeader} from '@components/AppHeader';
import {PracticeController} from '@screens/Practice/PracticeController';
import {FlashcardController} from '@screens/Practice/Flashcard/FlashcardController';
import {CorrectAnswerController} from '@screens/Practice/CorrectAnswer/CorrectAnswerController';

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
      <Stack.Screen
        name={'Flashcard'}
        options={{title: 'Flashcard'}}
        component={FlashcardController}
      />
      <Stack.Screen
        name={'CorrectAnswer'}
        options={{title: 'Correct Answer'}}
        component={CorrectAnswerController}
      />
    </Stack.Navigator>
  );
};
