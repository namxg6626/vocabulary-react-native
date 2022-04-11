import React, {FC} from 'react';
import {Box} from 'native-base';
import {SafeAreaView} from 'react-native-safe-area-context';
import {Colors} from '@theme/colors';
import {widthPercentageToDP} from 'react-native-responsive-screen';
import {StatusBar, StyleSheet} from 'react-native';

export interface IScreenProps {
  safeArea?: boolean;
  enableStatusBar?: boolean;
}

export const Screen: FC<IScreenProps> = ({
  children,
  safeArea,
  enableStatusBar = true,
}) => {
  return (
    <Box px={widthPercentageToDP(6)} backgroundColor={Colors.gumental} flex={1}>
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
