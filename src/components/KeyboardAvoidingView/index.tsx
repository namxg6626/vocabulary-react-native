import React from 'react';
import {TouchableWithoutFeedback, Keyboard, StyleSheet} from 'react-native';
import {Box, KeyboardAvoidingView as NBKeyboardAvoidingView} from 'native-base';
import {Platform} from 'react-native';

export const KeyboardAvoidingView: React.FC = ({children}) => {
  return (
    <NBKeyboardAvoidingView
      behavior={Platform.OS === 'android' ? 'height' : 'padding'}
      flex={1}>
      <TouchableWithoutFeedback
        style={styles.touchableWithoutFeedback}
        onPress={Keyboard.dismiss}>
        <Box flex={1} justifyContent={'flex-end'}>
          {children}
        </Box>
      </TouchableWithoutFeedback>
    </NBKeyboardAvoidingView>
  );
};

const styles = StyleSheet.create({
  touchableWithoutFeedback: {
    flex: 1,
  },
});
