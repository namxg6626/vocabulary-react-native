import type {NativeStackScreenProps} from '@react-navigation/native-stack';

export interface PracticeParamList {
  Flashcard: {
    tagName: string;
    numberOfWords: number;
  };
  Practice: undefined;
  [key: string]: any;
}

export interface PracticeScreenProps<ScreenName extends keyof PracticeParamList>
  extends NativeStackScreenProps<PracticeParamList, ScreenName> {}
