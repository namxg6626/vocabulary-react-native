import React from 'react';
import {FC} from 'react';
import {IPressableProps, ITextProps, Pressable, Text} from 'native-base';
import {widthPercentageToDP} from 'react-native-responsive-screen';

export interface ICustomButtonProps extends IPressableProps {
  TextProps?: ITextProps;
}

/**@caution only passing text as children -
 * custom children by using `renderChildren`
 */
export const CustomButton: FC<ICustomButtonProps> = ({
  children,
  TextProps = {},
  ...props
}) => {
  const _renderChilren = () => {
    if (typeof children === 'string') {
      return (
        <Text
          fontWeight={'bold'}
          fontSize="lg"
          textAlign={'center'}
          {...TextProps}>
          {children}
        </Text>
      );
    }
    return children;
  };

  return (
    <Pressable
      py={widthPercentageToDP(4)}
      backgroundColor={'tertiary.400'}
      borderRadius={12}
      {...props}>
      {_renderChilren()}
    </Pressable>
  );
};
