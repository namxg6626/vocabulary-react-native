import React from 'react';
import {FC} from 'react';
import {
  IPressableProps,
  ITextProps,
  Pressable,
  Text,
  useTheme,
} from 'native-base';
import tinycolor from 'tinycolor2';
import {widthPercentageToDP} from 'react-native-responsive-screen';
import _ from 'lodash';
import {ColorType} from 'native-base/lib/typescript/components/types';
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
  const DEFAULT_BACKGROUND_COLOR = 'tertiary.400' as ColorType;
  const theme = useTheme();
  const pressedBackgroundColor = tinycolor(
    _.get(
      theme.colors,
      props.backgroundColor || (DEFAULT_BACKGROUND_COLOR as any),
      '#fff',
    ) as any,
  )
    .darken(10)
    .toRgbString();

  const _renderChildren = () => {
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
      _pressed={{
        backgroundColor: pressedBackgroundColor,
      }}
      py={widthPercentageToDP(4)}
      backgroundColor={DEFAULT_BACKGROUND_COLOR}
      borderRadius={12}
      {...props}>
      {_renderChildren()}
    </Pressable>
  );
};
