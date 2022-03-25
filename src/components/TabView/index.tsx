import React from 'react';
import {
  TabViewProps,
  TabView,
  SceneRendererProps,
  NavigationState,
} from 'react-native-tab-view';
import {widthPercentageToDP} from 'react-native-responsive-screen';
import {Box} from 'native-base';
import {Colors} from '@theme/colors';
import {Animated, TouchableOpacity} from 'react-native';

const getTabBarButtonStyle = (borderColor: string) => ({
  flex: 1,
  borderBottomWidth: 3,
  borderColor,
  padding: widthPercentageToDP(3),
});

export type CustomTabviewProps = TabViewProps<any> & {};

export const CustomTabView: React.FC<CustomTabviewProps> = ({...props}) => {
  const renderTabBar = (
    tabBarProps: SceneRendererProps & {
      navigationState: NavigationState<{key: string; title: string}>;
    },
  ) => {
    const currentTabIndex = tabBarProps.navigationState.index;
    return (
      <Box flexDirection="row">
        {tabBarProps.navigationState.routes.map((route, i) => {
          const color =
            currentTabIndex === i ? Colors.parisGreen : Colors.textSecondary;
          const borderColor =
            currentTabIndex === i ? Colors.parisGreen : Colors.textSecondary;

          return (
            <TouchableOpacity
              key={i}
              activeOpacity={0.8}
              style={getTabBarButtonStyle(borderColor)}
              onPress={() => {
                props.onIndexChange(i);
              }}>
              <Animated.Text
                style={{
                  color,
                  textAlign: 'center',
                }}>
                {route.title}
              </Animated.Text>
            </TouchableOpacity>
          );
        })}
      </Box>
    );
  };

  return <TabView {...props} renderTabBar={renderTabBar} />;
};
