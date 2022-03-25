import React from 'react';
import {Box, KeyboardAvoidingView as NBKeyboardAvoidingView} from 'native-base';
import {Platform} from 'react-native';

export const KeyboardAvoidingView: React.FC<any> = ({children}) => {
  return (
    <NBKeyboardAvoidingView
      behavior={Platform.OS === 'android' ? 'height' : 'padding'}
      flex={1}>
      <Box flex={1} justifyContent={'flex-end'}>
        {children}
      </Box>
    </NBKeyboardAvoidingView>
  );
};
