import AntdIcons from 'react-native-vector-icons/AntDesign';
import {widthPercentageToDP} from 'react-native-responsive-screen';
import {Colors} from '@theme/colors';
import {Box, Text} from 'native-base';
import React from 'react';

export type EmptyProps = {
  title: string;
  moreInfo?: string;
};

export const Empty: React.FC<EmptyProps> = ({title, moreInfo}) => {
  return (
    <Box flex={1} justifyContent={'center'} alignItems={'center'}>
      <AntdIcons
        size={widthPercentageToDP(24)}
        name={'dropbox'}
        color={Colors.textSecondary}
      />
      <Text fontSize={'xl'}>{title}</Text>
      {moreInfo && <Text fontSize={'xl'}>{moreInfo}</Text>}
    </Box>
  );
};
