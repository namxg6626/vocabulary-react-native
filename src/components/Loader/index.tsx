import React from 'react';
import {StyleSheet, View, Modal} from 'react-native';
import {Heading, Spinner} from 'native-base';

interface LoaderProps {
  loading: boolean;
  textColor?: string;
  title?: string;
  opacity?: number;
}

export const Loader: React.FC<LoaderProps> = ({
  loading = false,
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
          <Spinner color="emerald.500" />
          <Heading color="emerald.500" fontSize="md">
            {title}
          </Heading>
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
    borderRadius: 10,
    alignItems: 'center',
    justifyContent: 'center',
  },
  title: {
    position: 'absolute',
    paddingTop: 50,
  },
});
