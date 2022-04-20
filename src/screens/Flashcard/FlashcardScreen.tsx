import React, {useState} from 'react';
import {StyleSheet} from 'react-native';
import {Screen} from '@components/Screen';
import {View} from 'react-native';
import {IWord} from '@core/modules/word/inferfaces/word.interface';
import 'react-native-reanimated';
import Carousel from 'react-native-reanimated-carousel';
import {Flashcard} from '@screens/Flashcard/components/FlashCard';

interface FlashcardScreenProps {
  words: IWord[];
}

export const FlashcardScreen: React.FC<FlashcardScreenProps> = ({words}) => {
  const [width, setWidth] = useState(0);

  return (
    <Screen BoxProps={{px: 0}}>
      <View
        style={styles.carouselWrapper}
        onLayout={e => {
          setWidth(e.nativeEvent.layout.width);
        }}>
        {!!width && (
          <Carousel
            loop={false}
            width={width}
            data={words}
            renderItem={({item: word}) => (
              <Flashcard
                key={word.rxId}
                title={word.word}
                content={word.meaning}
              />
            )}
          />
        )}
      </View>
    </Screen>
  );
};

const styles = StyleSheet.create({
  carouselWrapper: {
    flex: 1,
  },
});
