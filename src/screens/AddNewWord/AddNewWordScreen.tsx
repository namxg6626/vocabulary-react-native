import {InStackScreenProps} from '@navigation/navigation';
import {Box, FormControl, HStack, Select, VStack} from 'native-base';
import React from 'react';
import {FC} from 'react';
import {Screen} from '@components/Screen';
import {CustomInput} from '@components/Input';
import {widthPercentageToDP} from 'react-native-responsive-screen';
import {Colors} from '@theme/colors';

const SPACING = widthPercentageToDP(4);

export const AddNewWordScreen: FC<InStackScreenProps<'AddNewWord'>> = () => {
  const renderImageField = () => {
    return (
      <Box
        rounded={'xl'}
        borderStyle={'dashed'}
        borderWidth={1}
        borderColor={Colors.textSecondary}
        h={widthPercentageToDP(50)}
        w="full"
      />
    );
  };

  const renderFields = () => (
    <VStack space={SPACING}>
      <FormControl isRequired>
        <FormControl.Label>Word</FormControl.Label>
        <CustomInput placeholder="Type your word" />
        <FormControl.HelperText>Original word</FormControl.HelperText>
      </FormControl>
      <HStack w={'full'} space={SPACING}>
        <FormControl flex={1} isRequired>
          <FormControl.Label>Meaning</FormControl.Label>
          <CustomInput placeholder="Type meaning" />
          <FormControl.HelperText>
            Meaning of original word
          </FormControl.HelperText>
        </FormControl>
        <FormControl flex={1}>
          <FormControl.Label>Tags</FormControl.Label>
          <Select selectedValue="tag 1 value">
            <Select.Item label="Tag 1" value="tag 1 value" />
          </Select>
        </FormControl>
      </HStack>
    </VStack>
  );

  return (
    <Screen headerContent="Add word" enableStatusBar>
      <VStack space={SPACING * 3} mt={SPACING}>
        {renderImageField()}
        {renderFields()}
      </VStack>
    </Screen>
  );
};