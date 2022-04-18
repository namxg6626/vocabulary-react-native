import React from 'react';
import {VStack} from 'native-base';
import {Screen} from '@components/Screen';
import {PracticeItem} from './components/PracticeItem';
import {widthPercentageToDP} from 'react-native-responsive-screen';
import {Colors} from '@theme/colors';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';

const SPACING = widthPercentageToDP(3);

export const PracticeScreen: React.FC<{}> = () => {
  return (
    <Screen>
      <VStack space={SPACING}>
        <PracticeItem
          onPress={() => console.log('white')}
          name={'Flashcard'}
          description={'Let you review and memorize your words'}
          icon={
            <MaterialCommunityIcons
              name={'note-text-outline'}
              color={'white'}
              size={24}
            />
          }
          colors={[Colors.beanRed, Colors.lightningYellow]}
        />
      </VStack>
    </Screen>
  );
};
