import React from 'react';
import {ITag} from '@core/modules/tag/interfaces/tag.interface';
import {Colors} from '@theme/colors';
import {widthPercentageToDP} from 'react-native-responsive-screen';
import {Box, HStack, Text} from 'native-base';
import {ItemActions} from '@components/index';

type TagItemProps = {
  tag: ITag;
  onPenPress: () => void;
  onBackspacePress: () => void;
};

export const TagItem: React.FC<TagItemProps> = ({
  tag,
  onPenPress,
  onBackspacePress,
}) => {
  return (
    <HStack
      alignItems={'center'}
      justifyContent={'space-between'}
      rounded={'md'}
      p={widthPercentageToDP(2)}
      mb={widthPercentageToDP(4)}
      backgroundColor={Colors.limedSpruce}>
      <Box>
        <Text fontWeight={'500'} fontSize={'xl'}>
          {tag.name}
        </Text>
        <Text fontSize={'xs'}>Words: {tag.wordIds.length}</Text>
      </Box>
      <ItemActions
        onBackspacePress={onBackspacePress}
        onPenPress={onPenPress}
      />
    </HStack>
  );
};
