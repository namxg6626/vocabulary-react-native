import React from 'react';
import {FC} from 'react';
import {Box} from 'native-base';
import {SafeAreaView} from 'react-native-safe-area-context';
import {Colors} from '@theme/colors';
import {widthPercentageToDP} from 'react-native-responsive-screen';
import {Platform, StatusBar} from 'react-native';
export interface IScreenProps {
  disableSafeArea?: boolean;
  enableStatusBar?: boolean;
}

export const Screen: FC<IScreenProps> = ({
  children,
  disableSafeArea,
  enableStatusBar,
}) => {
  return (
    <Box
      pt={Platform.OS === 'android' ? 4 : 0}
      px={widthPercentageToDP(6)}
      backgroundColor={Colors.gumental}
      flex={1}>
      <StatusBar hidden={!enableStatusBar} />
      {disableSafeArea ? children : <SafeAreaView>{children}</SafeAreaView>}
    </Box>
  );
};
