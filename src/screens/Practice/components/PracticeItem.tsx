import React from 'react';
import LinearGradient from 'react-native-linear-gradient';
import {Box, HStack, Text} from 'native-base';
import {StyleSheet, Pressable} from 'react-native';
import {widthPercentageToDP} from 'react-native-responsive-screen';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import noop from 'lodash/noop';

interface PracticeItemProps {
  name: string;
  description?: string;
  colors: string[];
  icon: React.ReactNode;
  onPress?: () => void;
}

export const PracticeItem: React.FC<PracticeItemProps> = ({
  name,
  colors,
  description,
  icon,
  onPress = noop,
}) => {
  return (
    <Pressable onPress={onPress}>
      <LinearGradient
        style={styles.linearGradient}
        start={{x: 0, y: 0}}
        end={{x: 1, y: 1}}
        colors={colors}>
        <HStack space={widthPercentageToDP(0.5)}>
          <Box style={{transform: [{translateY: 4}]}}>{icon}</Box>
          <Box flex={1}>
            <Text fontSize={'xl'} fontWeight={'600'}>
              {name}
            </Text>
            <Text>{description}</Text>
          </Box>
          <Box alignSelf={'center'}>
            <MaterialCommunityIcons
              name={'chevron-right'}
              color={'white'}
              size={28}
            />
          </Box>
        </HStack>
      </LinearGradient>
    </Pressable>
  );
};

const styles = StyleSheet.create({
  linearGradient: {
    borderRadius: widthPercentageToDP(2),
    padding: widthPercentageToDP(3),
  },
});
