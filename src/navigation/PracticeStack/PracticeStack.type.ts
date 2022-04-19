import type {NativeStackScreenProps} from '@react-navigation/native-stack';
import {IWord} from '@core/modules/word/inferfaces/word.interface';

export interface PracticeParamList {
  Flashcard: {
    tagName: string;
    words: IWord[];
  };
  Practice: undefined;
  [key: string]: any;
}

export interface PracticeScreenProps<ScreenName extends keyof PracticeParamList>
  extends NativeStackScreenProps<PracticeParamList, ScreenName> {}
