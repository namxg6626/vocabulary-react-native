import React from 'react';
import {TouchableWithoutFeedback, Keyboard, StyleSheet} from 'react-native';
import {Box, KeyboardAvoidingView as NBKeyboardAvoidingView} from 'native-base';
import {Platform} from 'react-native';

type KeyboardAvoidingViewProps = any;

export const KeyboardAvoidingView: React.FC<KeyboardAvoidingViewProps> = ({
  children,
  ...props
}) => {
  return (
    <NBKeyboardAvoidingView
      behavior={Platform.OS === 'android' ? 'height' : 'padding'}
      flex={1}
      {...props}
      justifyContent={'center'}>
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
