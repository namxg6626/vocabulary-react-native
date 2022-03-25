import React, {useState} from 'react';
import {IWord} from '@core/modules/word/inferfaces/word.interface';
import {CustomTabView, Screen} from '@components/index';
import {Box, Text} from 'native-base';
import {widthPercentageToDP} from 'react-native-responsive-screen';
import {SceneMap} from 'react-native-tab-view';
import {FlatList} from 'react-native';
import {Colors} from '@theme/colors';

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

  const renderScene = SceneMap({
    allWords: AllWords,
    anotherAllWords: AnotherAllWords,
  });

  return (
    <Screen headerContent={'Your Words'} enableStatusBar>
      <CustomTabView
        navigationState={{index, routes}}
        renderScene={renderScene}
        onIndexChange={setIndex}
      />
    </Screen>
  );
};
