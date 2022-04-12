import type {NativeStackScreenProps} from '@react-navigation/native-stack';
import {MainStackParamList} from '../MainStack/MainStack.type';

export type ManageWordsParamList = {
  YourWords: undefined;
  EditWord?: MainStackParamList['AddNewWord'];
};

export type ManageWordsScreenProps<
  ScreenName extends keyof ManageWordsParamList = any,
> = NativeStackScreenProps<ManageWordsParamList, ScreenName>;
