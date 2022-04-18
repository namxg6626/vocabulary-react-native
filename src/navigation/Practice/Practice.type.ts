import type {NativeStackScreenProps} from '@react-navigation/native-stack';

export interface PracticeParamList {
  Flashcard: undefined;
  Practice: undefined;
  [key: string]: any;
}

export interface PracticeScreenProps<ScreenName extends keyof PracticeParamList>
  extends NativeStackScreenProps<PracticeParamList, ScreenName> {}
