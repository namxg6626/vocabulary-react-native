import React from 'react';
import {FlatList} from 'react-native';
import {
  TabViewProps,
  TabView,
  SceneRendererProps,
  NavigationState,
  Route,
} from 'react-native-tab-view';
import {widthPercentageToDP} from 'react-native-responsive-screen';
import {Colors} from '@theme/colors';
import {Animated, TouchableOpacity} from 'react-native';
import _ from 'lodash';

const getTabBarButtonStyle = (borderColor: string) => ({
  borderBottomWidth: 3,
  borderColor,
  padding: widthPercentageToDP(3),
});

export type CustomTabviewProps<T extends Route> = TabViewProps<T> & {
  onRouteChange?: (route: T) => void;
};

export const CustomTabView: React.FC<CustomTabviewProps<any>> = ({
  onRouteChange = _.noop,
  onIndexChange,
  ...props
}) => {
  const handleIndexChange = (index: number) => {
    onIndexChange(index);
    const routes = props.navigationState.routes;
    const nextRoute = routes[index];
    onRouteChange(nextRoute);
  };

  const renderTabBar = (
    tabBarProps: SceneRendererProps & {
      navigationState: NavigationState<{key: string; title: string}>;
    },
  ) => {
    const currentTabIndex = tabBarProps.navigationState.index;
    return (
      <FlatList
        showsHorizontalScrollIndicator={false}
        style={{flexGrow: 0}} // make flatlist fits item high
        horizontal={true}
        data={tabBarProps.navigationState.routes}
        keyExtractor={route => route.key}
        renderItem={({item: route, index: i}) => {
          const color =
            currentTabIndex === i ? Colors.parisGreen : Colors.textSecondary;
          const borderColor =
            currentTabIndex === i ? Colors.parisGreen : Colors.textSecondary;
          const currentRoute = tabBarProps.navigationState.routes[i];

          return (
            <TouchableOpacity
              key={i}
              activeOpacity={0.8}
              style={getTabBarButtonStyle(borderColor)}
              onPress={() => {
                onIndexChange(i);
                onRouteChange(currentRoute);
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
        }}
      />
    );
  };

  return (
    <TabView
      {...props}
      onIndexChange={handleIndexChange}
      renderTabBar={renderTabBar}
    />
  );
};
