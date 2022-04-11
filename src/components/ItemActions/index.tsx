import {PressableIcon} from '@components/PressableIcon';
import FontAwesomeIcons from 'react-native-vector-icons/FontAwesome';
import {Colors} from '@theme/colors';
import FeatherIcons from 'react-native-vector-icons/Feather';
import {HStack} from 'native-base';
import React, {memo} from 'react';
import {widthPercentageToDP} from 'react-native-responsive-screen';
import noop from 'lodash/noop';

const ICON_SIZE = widthPercentageToDP(5);

type ItemActionsProps = {
  onPenPress?: () => void;
  onBackspacePress?: () => void;
};

export const ItemActions: React.FC<ItemActionsProps> = memo(
  function MemoItemActions({onPenPress = noop, onBackspacePress = noop}) {
    return (
      <HStack>
        <PressableIcon
          onPress={onPenPress}
          icon={
            <FontAwesomeIcons
              color={Colors.parisGreen}
              name={'pencil'}
              size={ICON_SIZE}
            />
          }
        />
        <PressableIcon
          onPress={onBackspacePress}
          icon={
            <FeatherIcons
              color={Colors.beanRed}
              name={'delete'}
              size={ICON_SIZE}
            />
          }
        />
      </HStack>
    );
  },
  () => true,
);
