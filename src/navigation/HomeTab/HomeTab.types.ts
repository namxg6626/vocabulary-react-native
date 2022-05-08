import {NavigatorScreenParams} from '@react-navigation/native';
import {BottomTabScreenProps} from '@react-navigation/bottom-tabs';
import {MainStackParamList} from '@navigation/MainStack';

export type HomeTabParamList = {
  MainStack: NavigatorScreenParams<MainStackParamList>;
  ProfileStack: undefined;
};

export type HomeTabScreenProps<ScreenName extends keyof HomeTabParamList> =
  BottomTabScreenProps<HomeTabParamList, ScreenName>;
