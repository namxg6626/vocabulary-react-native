import React, {createRef, useState} from 'react';
import {StyleSheet} from 'react-native';
import {Screen} from '@components/Screen';
import Slider from '@react-native-community/slider';
import {View} from 'react-native';
import {HStack, Text} from 'native-base';
import {IWord} from '@core/modules/word/inferfaces/word.interface';
import 'react-native-reanimated';
import {widthPercentageToDP} from 'react-native-responsive-screen';
import {Colors} from '@theme/colors';
import {MemorizedFlashcardCarousel} from '@screens/Flashcard/components/FlashcardCarousel';
import {ICarouselInstance} from 'react-native-reanimated-carousel';

interface FlashcardScreenProps {
  words: IWord[];
}

export const FlashcardScreen: React.FC<FlashcardScreenProps> = ({words}) => {
  const [width, setWidth] = useState(0);
  const [currentIndex, setCurrentIndex] = useState(0);
  const carouselRef = createRef<ICarouselInstance>();

  const handleSlidingComplete = (value: number) => {
    if (carouselRef.current) {
      carouselRef.current.scrollTo({
        animated: true,
        count: value - currentIndex,
      });
    }
  };

  return (
    <Screen BoxProps={{px: 0}}>
      <View
        style={styles.carouselWrapper}
        onLayout={e => {
          setWidth(e.nativeEvent.layout.width);
        }}>
        {!!width && (
          <>
            <MemorizedFlashcardCarousel
              ref={carouselRef}
              style={styles.carousel}
              words={words}
              width={width}
              onSnapToItem={setCurrentIndex}
            />
            <HStack
              space={widthPercentageToDP(3)}
              style={styles.sliderWrapper}
              alignItems={'center'}>
              <Text>
                {currentIndex + 1}/{words.length}
              </Text>
              <Slider
                value={currentIndex}
                step={1}
                minimumValue={0}
                maximumValue={words.length === 0 ? 0 : words.length - 1}
                onSlidingComplete={handleSlidingComplete}
                style={styles.slider}
                maximumTrackTintColor={Colors.textSecondary}
                minimumTrackTintColor={Colors.parisGreen}
                thumbTintColor={'white'}
              />
            </HStack>
          </>
        )}
      </View>
    </Screen>
  );
};

const styles = StyleSheet.create({
  carouselWrapper: {
    flex: 1,
  },
  carousel: {
    flex: 9,
  },
  sliderWrapper: {
    flex: 1,
    marginLeft: widthPercentageToDP(6),
    marginRight: widthPercentageToDP(6),
  },
  slider: {
    flex: 1,
  },
});
