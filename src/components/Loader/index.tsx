import React from 'react';
import {StyleSheet, View, Modal, ActivityIndicator} from 'react-native';
import {Text} from 'native-base';

interface LoaderProps {
  loading: boolean;
  indicatorColor?: string;
  textColor?: string;
  size?: number | 'small' | 'large';
  title?: string;
  opacity?: number;
}

export const Loader: React.FC<LoaderProps> = ({
  loading = false,
  indicatorColor,
  size,
  opacity = 0.4,
  title = '',
}) => {
  return (
    <Modal
      transparent
      animationType={'none'}
      visible={loading}
      onRequestClose={() => null}>
      <View
        style={[
          styles.modalBackground,
          {backgroundColor: `rgba(0,0,0,${opacity})`},
        ]}>
        <View style={styles.activityIndicatorWrapper}>
          <ActivityIndicator
            animating={loading}
            color={indicatorColor}
            size={size}
          />
          <Text style={styles.title} numberOfLines={1}>
            {title}
          </Text>
        </View>
      </View>
    </Modal>
  );
};

const styles = StyleSheet.create({
  modalBackground: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
  activityIndicatorWrapper: {
    height: 100,
    width: 100,
    borderRadius: 10,
    alignItems: 'center',
    justifyContent: 'center',
  },
  title: {
    position: 'absolute',
    paddingTop: 50,
  },
});
