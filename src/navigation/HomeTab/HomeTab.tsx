import React from 'react';
import {createBottomTabNavigator} from '@react-navigation/bottom-tabs';
import {HomeTabParamList} from './HomeTab.types';
import {MainStack} from '@navigation/MainStack';
import IonIcons from 'react-native-vector-icons/Ionicons';
import {Colors} from '@theme/colors';
import {ProfileController} from '@screens/Profile/ProfileController';

const ICON_SIZE = 18;
const HomeBottomTab = createBottomTabNavigator<HomeTabParamList>();

export const HomeTab: React.FC = () => {
  return (
    <HomeBottomTab.Navigator
      initialRouteName={'MainStack'}
      screenOptions={{
        headerShown: false,
        tabBarShowLabel: false,
        tabBarStyle: {
          backgroundColor: Colors.limedSpruce,
        },
        tabBarActiveBackgroundColor: Colors.lightLimedSpruce,
        tabBarInactiveTintColor: Colors.textSecondary,
        tabBarActiveTintColor: Colors.parisGreen,
        tabBarItemStyle: {
          marginVertical: 6,
          marginHorizontal: 8,
          borderRadius: 4,
        },
      }}>
      <HomeBottomTab.Screen
        name={'MainStack'}
        component={MainStack}
        options={{
          tabBarIcon: ({color}) => (
            <IonIcons size={ICON_SIZE} name={'home'} color={color} />
          ),
        }}
      />
      <HomeBottomTab.Screen
        name={'Profile'}
        component={ProfileController}
        options={{
          tabBarIcon: ({color}) => (
            <IonIcons size={ICON_SIZE} name={'person'} color={color} />
          ),
        }}
      />
    </HomeBottomTab.Navigator>
  );
};
