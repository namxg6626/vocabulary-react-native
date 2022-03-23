import {Box, FormControl, HStack, Select, VStack} from 'native-base';
import React, {FC} from 'react';
import {Screen} from '@components/Screen';
import {CustomInput} from '@components/Input';
import {CustomButton} from '@components/Button';
import {widthPercentageToDP} from 'react-native-responsive-screen';
import {Colors} from '@theme/colors';
import {WordDto} from '@core/modules/word/dtos/word.dto';
import {addNewWordValidationSchema} from '@screens/AddNewWord/validation-schema';
import {Controller, useForm} from 'react-hook-form';
import {yupResolver} from '@hookform/resolvers/yup';

const SPACING = widthPercentageToDP(4);

export interface IAddNewWordScreen {
  addNewWord: (dto: WordDto) => void;
}

export const AddNewWordScreen: FC<IAddNewWordScreen> = ({addNewWord}) => {
  const {
    handleSubmit,
    control,
    formState: {errors},
  } = useForm<WordDto>({
    resolver: yupResolver(addNewWordValidationSchema),
  });

  const submitHandler = (values: WordDto) => {
    addNewWord(values);
  };

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
      <FormControl isRequired isInvalid={!!errors.word}>
        <FormControl.Label>Word</FormControl.Label>
        <Controller
          control={control}
          name={'word'}
          render={({field}) => {
            return (
              <CustomInput
                value={field.value}
                onChangeText={field.onChange}
                placeholder={'Type your word'}
              />
            );
          }}
        />
        {errors.word ? (
          <FormControl.ErrorMessage>
            {errors.word.message}
          </FormControl.ErrorMessage>
        ) : (
          <FormControl.HelperText>Original word</FormControl.HelperText>
        )}
      </FormControl>
      <HStack w={'full'} space={SPACING}>
        <FormControl flex={1} isRequired isInvalid={!!errors.meaning}>
          <FormControl.Label>Meaning</FormControl.Label>
          <Controller
            control={control}
            name={'meaning'}
            render={({field}) => {
              return (
                <CustomInput
                  value={field.value}
                  onChangeText={field.onChange}
                  placeholder="Type meaning"
                />
              );
            }}
          />
          {errors.meaning ? (
            <FormControl.ErrorMessage>
              {errors.meaning.message}
            </FormControl.ErrorMessage>
          ) : (
            <FormControl.HelperText>
              Meaning of original word
            </FormControl.HelperText>
          )}
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

  const renderButton = () => {
    return (
      <>
        <CustomButton onPress={handleSubmit(submitHandler)}>
          Add this word
        </CustomButton>
      </>
    );
  };

  return (
    <Screen headerContent="Add word" enableStatusBar>
      <VStack space={SPACING * 3} mt={SPACING}>
        {renderImageField()}
        {renderFields()}
        {renderButton()}
      </VStack>
    </Screen>
  );
};
