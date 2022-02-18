import React from 'react';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import {AuthScreen} from '@screens/Auth';

const Stack = createNativeStackNavigator();

export const MainStack = () => {
  return (
    <Stack.Navigator>
      <Stack.Screen
        name="Auth"
        component={AuthScreen}
        options={{headerShown: false}}
      />
    </Stack.Navigator>
  );
};
