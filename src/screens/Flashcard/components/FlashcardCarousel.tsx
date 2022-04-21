import React, {memo, forwardRef} from 'react';
import {IWord} from '@core/modules/word/inferfaces/word.interface';
import Carousel, {ICarouselInstance} from 'react-native-reanimated-carousel';
import {Flashcard} from './FlashCard';
import deepEqual from 'deep-equal';
import {ViewStyle} from 'react-native';

interface FlashcardCarouselProps {
  words: IWord[];
  width: number;
  style?: ViewStyle;
  onSnapToItem: (index: number) => void;
}
const FlashcardCarousel: React.ForwardRefRenderFunction<
  ICarouselInstance,
  FlashcardCarouselProps
> = ({words, style, width, onSnapToItem}, ref) => {
  return (
    <Carousel
      ref={ref}
      style={style}
      loop={false}
      width={width}
      data={words}
      onSnapToItem={onSnapToItem}
      renderItem={({item: word}) => (
        <Flashcard key={word.rxId} title={word.word} content={word.meaning} />
      )}
    />
  );
};
const ForwardedRefFlashcardCarousel = forwardRef(FlashcardCarousel);

export const MemorizedFlashcardCarousel = memo(
  ForwardedRefFlashcardCarousel,
  (l, r) => {
    const mapWord = (word: IWord) => word.rxId;
    const getValueToCompare = (props: FlashcardCarouselProps) => {
      return {
        wordIds: props.words.map(mapWord),
        style: props.style,
        width: props.width,
      };
    };

    return deepEqual(getValueToCompare(l), getValueToCompare(r));
  },
);
