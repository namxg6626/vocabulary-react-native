import type {NativeStackScreenProps} from '@react-navigation/native-stack';
import {IWord} from '@core/modules/word/inferfaces/word.interface';

export type MainStackParamList = {
  Auth: undefined;
  Dashboard: {
    isGuest?: boolean;
    username?: string;
  };
  AddNewWord?: {
    actionLabel: string;
    initialValue?: IWord;
  };
  ManageWords: undefined;
  YourTags: undefined;
  PracticeStack: undefined;
};

export type MainStackScreenProps<
  ScreenName extends keyof MainStackParamList = any,
> = NativeStackScreenProps<MainStackParamList, ScreenName>;
