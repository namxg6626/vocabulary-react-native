import React, {useState} from 'react';
import {FC} from 'react';
import {Box, HStack, Text, VStack} from 'native-base';
import {StyleSheet, View} from 'react-native';
import type {LayoutChangeEvent} from 'react-native';
import {Screen} from '@components/Screen';

import type {MainStackScreenProps} from '@navigation/index';
import {Colors} from '@theme/colors';
import {widthPercentageToDP} from 'react-native-responsive-screen';
import {HelloBG} from './components/HelloBG';
import _ from 'lodash';
import {LargeColorizedButton} from './components/LargeColorizedButton';
import AntdIcons from 'react-native-vector-icons/AntDesign';
import FontisoIcons from 'react-native-vector-icons/Fontisto';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';
import tinycolor from 'tinycolor2';

const QUOTE = {
  content: 'Change the world by being yourself',
  author: 'Amy Poeler',
};

const SPACING = widthPercentageToDP(5);

export const DashboardScreen: FC<MainStackScreenProps<'Dashboard'>> = ({
  route,
  navigation,
}) => {
  const [helloWidth, setHelloWidth] = useState(0);
  const helloHeight = (180 / 320) * helloWidth;
  const isGuest = _.get(route, 'params.isGuest', false);
  const username = isGuest ? 'Guest' : 'Lenam';

  const styles = StyleSheet.create({
    hellobgWrapper: {
      position: 'absolute',
      top: 0,
      left: 0,
      width: helloWidth,
      height: helloHeight,
    },
  });

  const handleHelloLayout = (e: LayoutChangeEvent) => {
    const {width} = e.nativeEvent.layout;
    if (helloWidth === 0) {
      setHelloWidth(width);
    }
  };

  const renderHello = () => {
    return (
      <Box
        position="relative"
        minHeight={helloHeight}
        onLayout={handleHelloLayout}>
        <View style={styles.hellobgWrapper}>
          <HelloBG width="100%" height="100%" />
        </View>
        <Box key={'hello-content'} p={4}>
          <VStack space={SPACING}>
            <Text fontSize={'2xl'} fontWeight="bold">
              Hi {username}
            </Text>
            <View>
              <Text fontSize={'md'} fontWeight="600">
                Today quote:
              </Text>
              <Text fontStyle="italic">"{QUOTE.content}"</Text>
            </View>
            <Text fontStyle={'italic'} textAlign="right">
              - {QUOTE.author} -
            </Text>
          </VStack>
        </Box>
      </Box>
    );
  };

  const renderButtons = () => {
    return (
      <Box>
        <VStack space={SPACING}>
          <HStack space={SPACING} alignItems="stretch">
            <LargeColorizedButton
              onPress={() => navigation.push('AddNewWord')}
              $bgColor={Colors.parisGreen}
              $textContent1="Add new"
              $textContent2="word"
              $icon={
                <AntdIcons
                  name="pluscircleo"
                  size={widthPercentageToDP(20)}
                  color="white"
                />
              }
            />
            <LargeColorizedButton
              onPress={() => navigation.push('ManageWords')}
              $bgColor={tinycolor(Colors.lightningYellow)
                .darken(5)
                .toRgbString()}
              $textContent1="Manage your"
              $textContent2="words"
              $icon={
                <FontisoIcons
                  name="atom"
                  size={widthPercentageToDP(20)}
                  color="white"
                />
              }
            />
          </HStack>
          <HStack space={SPACING} alignItems="stretch">
            <LargeColorizedButton
              onPress={() => navigation.push('PracticeStack')}
              $bgColor={Colors.beanRed}
              $textContent1="Pratice"
              $textContent2="games"
              $icon={
                <MaterialIcons
                  name="videogame-asset"
                  size={widthPercentageToDP(20)}
                  color="white"
                />
              }
            />
            <LargeColorizedButton
              onPress={() => navigation.push('YourTags')}
              $bgColor={Colors.pastelOrange}
              $textContent1="Manage your"
              $textContent2="tags"
              $icon={
                <AntdIcons
                  name="tags"
                  size={widthPercentageToDP(20)}
                  color="white"
                />
              }
            />
          </HStack>
        </VStack>
      </Box>
    );
  };

  return (
    <Screen safeArea enableStatusBar>
      <VStack space={SPACING}>
        {renderHello()}
        {renderButtons()}
      </VStack>
    </Screen>
  );
};
