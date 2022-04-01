import {Box, Pressable, IPressableProps} from 'native-base';
import React, {useState} from 'react';
import tinycolor from 'tinycolor2';
import {Colors} from '@theme/colors';
import {LayoutChangeEvent} from 'react-native';
type PressableIconProps = IPressableProps & {
  icon: React.ReactNode;
};

export const PressableIcon: React.FC<PressableIconProps> = ({
  icon,
  ...props
}) => {
  const [height, setHeight] = useState(0);

  const handleLayout = (e: LayoutChangeEvent) => {
    if (!height) {
      const layoutHeight = Math.max(
        e.nativeEvent.layout.height,
        e.nativeEvent.layout.width,
      );
      setHeight(layoutHeight);
    }
  };

  return (
    <Pressable
      onLayout={handleLayout}
      borderRadius={height / 2}
      width={height}
      _pressed={{
        backgroundColor: tinycolor(Colors.textSecondary)
          .setAlpha(0.1)
          .toRgbString(),
      }}
      {...props}>
      <Box m={2}>{icon}</Box>
    </Pressable>
  );
};
