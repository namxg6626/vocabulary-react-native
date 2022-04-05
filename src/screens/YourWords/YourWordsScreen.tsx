import React, {useState, useEffect} from 'react';
import {IWord} from '@core/modules/word/inferfaces/word.interface';
import {CustomTabView, Empty, Screen} from '@components/index';
import {Box, Text} from 'native-base';
import {widthPercentageToDP} from 'react-native-responsive-screen';
import {Route} from 'react-native-tab-view';
import {FlatList} from 'react-native';
import {Colors} from '@theme/colors';
import {ITag} from '@core/modules/tag/interfaces/tag.interface';
import _ from 'lodash';

export type YourWordsScreenProps = {
  words: IWord[];
  tags: ITag[];
  onTabChange?: (tagRxId: string) => void;
};

const SPACING = widthPercentageToDP(4);

export const YourWordsScreen: React.FC<YourWordsScreenProps> = ({
  words,
  tags,
  onTabChange = _.noop,
}) => {
  const [routes, setRoutes] = React.useState<Route[]>(() => [
    {key: 'All Words', title: 'All Words'},
  ]);

  const [index, setIndex] = useState(0);

  const handleRouteChange = (route: Route) => {
    onTabChange(route.key);
  };

  useEffect(() => {
    const tagRoutes: Route[] = tags.map(tag => ({
      key: tag.rxId,
      title: tag.name,
    }));
    setRoutes([
      {
        key: 'All Words',
        title: 'All Words',
      },
      ...tagRoutes,
    ]);
  }, [tags.length]); // check tags's length only

  const AllWords = () => {
    if (words.length === 0) {
      return <Empty title={'There are no words'} />;
    }
    return (
      <FlatList
        data={words}
        keyExtractor={item => item.rxId}
        renderItem={({item}) => (
          <Box
            mt={SPACING}
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

  const renderScene = () => {
    return <AllWords />;
  };

  return (
    <Screen headerContent={'Your Words'} enableStatusBar>
      <CustomTabView
        navigationState={{index, routes}}
        renderScene={renderScene}
        onIndexChange={setIndex}
        onRouteChange={handleRouteChange}
      />
    </Screen>
  );
};
