import type {NativeStackScreenProps} from '@react-navigation/native-stack';

export type MainStackParamList = {
  Auth: undefined;
  Dashboard: {
    isGuest?: boolean;
  };
  AddNewWord?: {
    actionLabel: string;
  };
  ManageWords: undefined;
  YourTags: undefined;
};

export type MainStackScreenProps<
  ScreenName extends keyof MainStackParamList = any,
> = NativeStackScreenProps<MainStackParamList, ScreenName>;
