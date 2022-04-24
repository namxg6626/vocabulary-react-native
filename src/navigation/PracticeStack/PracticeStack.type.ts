import type {NativeStackScreenProps} from '@react-navigation/native-stack';
import {IWord} from '@core/modules/word/inferfaces/word.interface';

interface PracticeTypeParam {
  tagName: string;
  words: IWord[];
}

export interface PracticeParamList {
  Flashcard: PracticeTypeParam;
  CorrectAnswer: PracticeTypeParam;
  Practice: undefined;
  [key: string]: any;
}

export interface PracticeScreenProps<ScreenName extends keyof PracticeParamList>
  extends NativeStackScreenProps<PracticeParamList, ScreenName> {}
