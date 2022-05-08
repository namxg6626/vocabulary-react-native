import {NativeStackScreenProps} from '@react-navigation/native-stack';

export type ProfileStackParamList = {
  Profile: undefined;
  ChangePassword: undefined;
};

export type ProfileStackScreenProps<
  ScreenName extends keyof ProfileStackParamList = any,
> = NativeStackScreenProps<ProfileStackParamList, ScreenName>;
