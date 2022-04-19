import React, {useState} from 'react';
import {Screen} from '@components/Screen';
import {View} from 'react-native';
import {Box, Text} from 'native-base';
import {IWord} from '@core/modules/word/inferfaces/word.interface';
import 'react-native-reanimated';
import Carousel from 'react-native-reanimated-carousel';
import {Colors} from '@theme/colors';

interface FlashcardScreenProps {
  words: IWord[];
}

export const FlashcardScreen: React.FC<FlashcardScreenProps> = ({words}) => {
  const [width, setWidth] = useState(0);
  const [height, setHeight] = useState(0);

  return (
    <Screen>
      <View
        style={{flex: 1}}
        onLayout={e => {
          setWidth(e.nativeEvent.layout.width);
          setHeight(e.nativeEvent.layout.height);
        }}>
        {!!(height && width) && (
          <Carousel
            width={width}
            height={height}
            data={words}
            renderItem={({item: word}) => (
              <Box flex={1} key={word.rxId}>
                <Box
                  flex={1}
                  my={4}
                  rounded={'md'}
                  backgroundColor={Colors.limedSpruce}>
                  <Text color={Colors.textSecondary}>{word.word}</Text>
                </Box>
              </Box>
            )}
          />
        )}
      </View>
    </Screen>
  );
};
