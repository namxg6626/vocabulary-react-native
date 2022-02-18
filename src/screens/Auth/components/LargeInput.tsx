import React from 'react';
import {FC} from 'react';
import {FormControl, Input, Box, IInputProps} from 'native-base';
import {widthPercentageToDP} from 'react-native-responsive-screen';
import {Colors} from '@theme/colors';
import {ColorType} from 'native-base/lib/typescript/components/types';

export interface ILargeInputProps extends Omit<IInputProps, 'ref'> {
  renderIconComponent: () => React.ReactNode;
  iconBgColor: ColorType;
  errorMessage?: string;
}

export const LargeInput: FC<ILargeInputProps> = React.forwardRef<
  any,
  ILargeInputProps
>(
  (
    {renderIconComponent, iconBgColor, isInvalid, errorMessage, ...props},
    ref,
  ) => {
    return (
      <FormControl isInvalid={isInvalid}>
        <Input
          ref={ref}
          borderRadius={12}
          size="lg"
          color={Colors.textSecondary}
          InputLeftElement={
            <Box
              p={widthPercentageToDP(4)}
              backgroundColor={iconBgColor}
              borderRadius={12}>
              {renderIconComponent()}
            </Box>
          }
          {...props}
        />
        <FormControl.ErrorMessage>{errorMessage}</FormControl.ErrorMessage>
      </FormControl>
    );
  },
);
