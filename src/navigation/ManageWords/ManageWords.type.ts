import type {NativeStackScreenProps} from '@react-navigation/native-stack';

export type ManageWordsParamList = {
  YourWords: undefined;
  EditWord?: {
    actionLabel: string;
  };
};

export type ManageWordsScreenProps<
  ScreenName extends keyof ManageWordsParamList = any,
> = NativeStackScreenProps<ManageWordsParamList, ScreenName>;
