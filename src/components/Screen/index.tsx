import React, {FC} from 'react';
import {Box, IBoxProps} from 'native-base';
import {SafeAreaView} from 'react-native-safe-area-context';
import {Colors} from '@theme/colors';
import {widthPercentageToDP} from 'react-native-responsive-screen';
import {StatusBar, StyleSheet} from 'react-native';

export interface IScreenProps {
  safeArea?: boolean;
  enableStatusBar?: boolean;
  BoxProps?: IBoxProps;
}

export const Screen: FC<IScreenProps> = ({
  children,
  safeArea,
  enableStatusBar = true,
  BoxProps,
}) => {
  return (
    <Box
      px={widthPercentageToDP(6)}
      backgroundColor={Colors.gumental}
      flex={1}
      {...BoxProps}>
      <StatusBar hidden={!enableStatusBar} backgroundColor={Colors.gumental} />
      {safeArea ? (
        <SafeAreaView style={styles.screenSafeAreaView}>
          {children}
        </SafeAreaView>
      ) : (
        children
      )}
      <Box pb={widthPercentageToDP(6)} />
    </Box>
  );
};

const styles = StyleSheet.create({
  screenSafeAreaView: {
    flex: 1,
  },
});
