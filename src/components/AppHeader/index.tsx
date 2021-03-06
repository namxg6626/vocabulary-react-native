import React, {FC} from 'react';
import {Box, HStack, Pressable, Text} from 'native-base';
import {Colors} from '@theme/colors';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';
import {widthPercentageToDP} from 'react-native-responsive-screen';
import {SafeAreaView} from 'react-native';

export interface IAppHeaderProps {
  headerContent: React.ReactNode;
  onBackPress?: () => void;
}

// TODO blur AppHeader when the keyboard appeared (this behavior is only the KeyboardAvoidingView is rendered)
export const AppHeader: FC<IAppHeaderProps> = ({
  headerContent,
  onBackPress,
}) => {
  const renderHeaderContent = () => {
    if (typeof headerContent === 'string') {
      return (
        <HStack w={'full'} alignItems={'center'} space={2}>
          <Pressable
            style={{
              transform: [
                {
                  scale: 1.25,
                },
              ],
            }}
            onPress={onBackPress}>
            <MaterialIcons name="arrow-back-ios" color={'white'} size={24} />
          </Pressable>
          <Text fontSize={'3xl'} fontWeight={'bold'}>
            {headerContent}
          </Text>
        </HStack>
      );
    }

    return headerContent;
  };

  return (
    <SafeAreaView style={{backgroundColor: Colors.gumental}}>
      <Box
        px={widthPercentageToDP(6)}
        py={widthPercentageToDP(3)}
        backgroundColor={Colors.gumental}>
        {renderHeaderContent()}
      </Box>
    </SafeAreaView>
  );
};
