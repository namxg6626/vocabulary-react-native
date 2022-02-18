import type {NativeStackScreenProps} from '@react-navigation/native-stack';

type MainStackParamList = {
  Auth: undefined;
  Dashboard: undefined;
};

export type InStackScreenProps<
  ScreenName extends keyof MainStackParamList = any,
> = NativeStackScreenProps<MainStackParamList, ScreenName>;
