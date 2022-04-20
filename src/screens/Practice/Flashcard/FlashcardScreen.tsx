import React, {useState} from 'react';
import {Screen} from '@components/Screen';
import {View} from 'react-native';
import {Box, Text, HStack} from 'native-base';
import {IWord} from '@core/modules/word/inferfaces/word.interface';
import 'react-native-reanimated';
import Carousel from 'react-native-reanimated-carousel';
import {Colors} from '@theme/colors';
import {widthPercentageToDP} from 'react-native-responsive-screen';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';

interface FlashcardScreenProps {
  words: IWord[];
}

export const FlashcardScreen: React.FC<FlashcardScreenProps> = ({words}) => {
  const [width, setWidth] = useState(0);

  return (
    <Screen BoxProps={{px: 0}}>
      <View
        style={{flex: 1}}
        onLayout={e => {
          setWidth(e.nativeEvent.layout.width);
        }}>
        {!!width && (
          <Carousel
            loop={false}
            width={width}
            data={words}
            renderItem={({item: word}) => (
              <Box flex={1} key={word.rxId}>
                <Box
                  mx={widthPercentageToDP(6)}
                  flex={1}
                  my={4}
                  borderColor={Colors.textSecondary}
                  borderWidth={1}
                  rounded={'xs'}
                  backgroundColor={'white'}>
                  <Box
                    p={3}
                    borderBottomColor={Colors.textSecondary}
                    borderBottomWidth={1}>
                    <Text
                      textAlign={'center'}
                      fontWeight={'bold'}
                      fontSize={'md'}
                      color={Colors.charcoalGray}>
                      {word.word}
                    </Text>
                  </Box>
                  <HStack
                    space={widthPercentageToDP(3)}
                    p={3}
                    alignItems={'center'}>
                    <MaterialCommunityIcons
                      size={widthPercentageToDP(4)}
                      name={'arrow-right-circle'}
                    />
                    <Text color={Colors.charcoalGray}>{word.meaning}</Text>
                  </HStack>
                </Box>
              </Box>
            )}
          />
        )}
      </View>
    </Screen>
  );
};
