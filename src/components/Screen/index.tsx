import React, {FC} from 'react';
import {Box} from 'native-base';
import {SafeAreaView} from 'react-native-safe-area-context';
import {Colors} from '@theme/colors';
import {widthPercentageToDP} from 'react-native-responsive-screen';
import {Platform, StatusBar, StyleSheet} from 'react-native';
import {AppHeader} from '@components/AppHeader';
import {useNavigation} from '@react-navigation/native';

export interface IScreenProps {
  disableSafeArea?: boolean;
  enableStatusBar?: boolean;
  headerContent?: React.ReactNode;
  onBackPress?: () => void;
}

export const Screen: FC<IScreenProps> = ({
  children,
  disableSafeArea,
  enableStatusBar = true,
  headerContent,
  onBackPress,
}) => {
  const navigation = useNavigation();

  const handleBackPress = () => {
    if (onBackPress) {
      onBackPress();
    }
    navigation.goBack();
  };

  const renderAppHeader = () => {
    if (!headerContent) {
      return null;
    }
    return (
      <AppHeader onBackPress={handleBackPress} headerContent={headerContent} />
    );
  };

  return (
    <Box
      pt={Platform.OS === 'android' ? 12 : 8}
      px={widthPercentageToDP(6)}
      backgroundColor={Colors.gumental}
      flex={1}>
      <StatusBar hidden={!enableStatusBar} backgroundColor={Colors.gumental} />
      {disableSafeArea && renderAppHeader()}
      {disableSafeArea ? (
        children
      ) : (
        <SafeAreaView style={styles.screenSafeAreaView}>
          {renderAppHeader()}
          {children}
        </SafeAreaView>
      )}
    </Box>
  );
};

const styles = StyleSheet.create({
  screenSafeAreaView: {
    flex: 1,
  },
});
