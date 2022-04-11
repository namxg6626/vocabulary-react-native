import type {NativeStackScreenProps} from '@react-navigation/native-stack';

type MainStackParamList = {
  Auth: undefined;
  Dashboard: {
    isGuest?: boolean;
  };
  AddNewWord: undefined;
  YourWords: undefined;
  YourTags: undefined;
};

export type MainStackScreenProps<
  ScreenName extends keyof MainStackParamList = any,
> = NativeStackScreenProps<MainStackParamList, ScreenName>;
