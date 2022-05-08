import type {NativeStackScreenProps} from '@react-navigation/native-stack';
import {NavigatorScreenParams} from '@react-navigation/native';
import {HomeTabParamList} from '@navigation/HomeTab/HomeTab.types';

export type AuthStackParamList = {
  Auth: undefined;
  HomeTab: NavigatorScreenParams<HomeTabParamList>;
};

export type AuthStackScreenProp<
  ScreenName extends keyof AuthStackParamList = any,
> = NativeStackScreenProps<AuthStackParamList, ScreenName>;
