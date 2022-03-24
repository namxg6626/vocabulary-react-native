import React, {useState} from 'react';
import {Screen} from '@components/Screen';
import {IWord} from '@core/modules/word/inferfaces/word.interface';
import {Box, Text} from 'native-base';
import {widthPercentageToDP} from 'react-native-responsive-screen';
import {
  NavigationState,
  SceneMap,
  SceneRendererProps,
  TabView,
} from 'react-native-tab-view';
import {Animated, FlatList, Pressable} from 'react-native';
import {Colors} from '@theme/colors';
import _ from 'lodash';

export type YourWordsScreenProps = {
  words: IWord[];
};

const SPACING = widthPercentageToDP(4);

export const YourWordsScreen: React.FC<YourWordsScreenProps> = ({words}) => {
  const [routes] = React.useState([
    {key: 'allWords', title: 'All Words'},
    {
      key: 'anotherAllWords',
      title: 'Another all words',
    },
  ]);
  const [index, setIndex] = useState(0);

  const AllWords = () => {
    return (
      <FlatList
        data={words}
        keyExtractor={item => item.rxId}
        renderItem={({item}) => (
          <Box
            mb={SPACING}
            key={item.rxId}
            py={2}
            px={3}
            backgroundColor={Colors.limedSpruce}
            rounded={4}>
            <Text fontWeight={'bold'} fontSize={'md'}>
              {item.word}
            </Text>
            <Text>{item.meaning}</Text>
          </Box>
        )}
      />
    );
  };

  const AnotherAllWords = () => {
    return (
      <FlatList
        data={words}
        keyExtractor={item => item.rxId}
        renderItem={({item}) => (
          <Box
            mb={SPACING}
            key={item.rxId}
            py={2}
            px={3}
            backgroundColor={Colors.limedSpruce}
            rounded={4}>
            <Text fontWeight={'bold'} fontSize={'md'}>
              {item.word}
            </Text>
            <Text>{item.meaning}</Text>
          </Box>
        )}
      />
    );
  };

  const renderTabBar = (
    props: SceneRendererProps & {
      navigationState: NavigationState<{key: string; title: string}>;
    },
  ) => (
    <Box flexDirection="row">
      {props.navigationState.routes.map((route, i) => {
        const color = index === i ? Colors.parisGreen : Colors.textSecondary;
        const borderColor =
          index === i ? Colors.parisGreen : Colors.textSecondary;
        return (
          <Box
            borderBottomWidth="3"
            borderColor={borderColor}
            flex={1}
            alignItems="center"
            p="3"
            cursor="pointer">
            <Pressable onPress={() => setIndex(i)}>
              <Animated.Text
                style={{
                  color,
                }}>
                {route.title}
              </Animated.Text>
            </Pressable>
          </Box>
        );
      })}
    </Box>
  );

  const renderScene = SceneMap({
    allWords: AllWords,
    anotherAllWords: AnotherAllWords,
  });

  return (
    <Screen headerContent={'Your Words'} enableStatusBar>
      <TabView
        navigationState={{index, routes}}
        renderScene={renderScene}
        renderTabBar={renderTabBar}
        onIndexChange={_.noop}
      />
    </Screen>
  );
};
