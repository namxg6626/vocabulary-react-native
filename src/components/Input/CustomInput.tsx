import React from 'react';
import {FC} from 'react';
import {Input} from 'native-base';
import type {IInputProps} from 'native-base';
import {Colors} from '@theme/colors';
import {Platform} from 'react-native';

export interface ICustomInputProps extends IInputProps {}

export const CustomInput: FC<ICustomInputProps> = React.forwardRef<
  any,
  ICustomInputProps
>((props, ref) => {
  return (
    <Input
      {...props}
      ref={ref}
      backgroundColor={Colors.charcoalGray}
      py={Platform.OS === 'android' ? 2 : 4}
    />
  );
});
