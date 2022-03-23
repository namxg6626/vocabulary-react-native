import React from 'react';
import {FC} from 'react';
import {Box, HStack, Text, Pressable} from 'native-base';
import {Colors} from '@theme/colors';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';

export interface IAppHeaderProps {
  headerContent: React.ReactNode;
  onBackPress?: () => void;
}

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

  return <Box backgroundColor={Colors.gumental}>{renderHeaderContent()}</Box>;
};
