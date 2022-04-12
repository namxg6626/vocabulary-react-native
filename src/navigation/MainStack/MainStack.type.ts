import type {NativeStackScreenProps} from '@react-navigation/native-stack';
import {IWord} from '@core/modules/word/inferfaces/word.interface';

export type MainStackParamList = {
  Auth: undefined;
  Dashboard: {
    isGuest?: boolean;
  };
  AddNewWord?: {
    actionLabel: string;
    initialValue?: IWord;
  };
  ManageWords: undefined;
  YourTags: undefined;
};

export type MainStackScreenProps<
  ScreenName extends keyof MainStackParamList = any,
> = NativeStackScreenProps<MainStackParamList, ScreenName>;
