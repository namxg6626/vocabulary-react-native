import React from 'react';
import {ITag} from '@core/modules/tag/interfaces/tag.interface';
import {Colors} from '@theme/colors';
import {widthPercentageToDP} from 'react-native-responsive-screen';
import {Box, HStack, Text} from 'native-base';
import {PressableIcon} from '@components/index';
import FeatherIcons from 'react-native-vector-icons/Feather';
import FontAwesomeIcons from 'react-native-vector-icons/FontAwesome';

type TagItemProps = {
  tag: ITag;
};

const ICON_SIZE = widthPercentageToDP(5);

export const TagItem: React.FC<TagItemProps> = ({tag}) => {
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
      <HStack>
        <PressableIcon
          icon={
            <FontAwesomeIcons
              color={Colors.parisGreen}
              name={'pencil'}
              size={ICON_SIZE}
            />
          }
        />
        <PressableIcon
          icon={
            <FeatherIcons
              color={Colors.beanRed}
              name={'delete'}
              size={ICON_SIZE}
            />
          }
        />
      </HStack>
    </HStack>
  );
};
