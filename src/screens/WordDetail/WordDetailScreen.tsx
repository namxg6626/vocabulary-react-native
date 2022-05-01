import {Box, FormControl, HStack, Select, VStack} from 'native-base';
import React, {FC, useEffect} from 'react';
import {Screen} from '@components/Screen';
import {CustomInput} from '@components/Input';
import {CustomButton} from '@components/Button';
import {widthPercentageToDP} from 'react-native-responsive-screen';
import {WordDto} from '@core/modules/word/dtos/word.dto';
import {validationSchema} from '@screens/WordDetail/validation-schema';
import {Controller, useForm} from 'react-hook-form';
import {yupResolver} from '@hookform/resolvers/yup';
import {KeyboardAvoidingView} from '@components/KeyboardAvoidingView';
import {ITag} from '@core/modules/tag/interfaces/tag.interface';
import _ from 'lodash';

const SPACING = widthPercentageToDP(4);

export type WordDetailForm = WordDto & {
  tagRxId: string;
};

export interface WordDetailProps {
  tags: ITag[];
  onSubmit: (dto: WordDetailForm) => Promise<boolean>;
  actionLabel?: string;
  initialValue?: Partial<WordDetailForm>;
}

export const WordDetailScreen: FC<WordDetailProps> = ({
  onSubmit,
  tags,
  actionLabel = 'Action',
  initialValue,
}) => {
  const {
    handleSubmit,
    control,
    formState: {errors},
    reset,
  } = useForm<WordDetailForm>({
    resolver: yupResolver(validationSchema),
  });

  useEffect(() => {
    if (initialValue) {
      reset({
        ..._.omit(initialValue, 'rxId', 'createdAt', 'updatedAt'),
      });
    }
  }, [initialValue, reset]);

  const submitHandler = (values: WordDetailForm) => {
    onSubmit(values).then(done => {
      if (done) {
        reset({
          word: '',
          meaning: '',
          tagRxId: '',
        });
      }
    });
  };

  // TODO attach image to the word
  const renderImageField = () => {
    return null;

    // return (
    //   <Box
    //     rounded={'xl'}
    //     borderStyle={'dashed'}
    //     borderWidth={1}
    //     borderColor={Colors.textSecondary}
    //     h={widthPercentageToDP(50)}
    //     w="full"
    //   />
    // );
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
          <FormControl.Label>Tag</FormControl.Label>
          <Controller
            control={control}
            name={'tagRxId'}
            render={({field: {onChange, value}}) => (
              <Select onValueChange={onChange} selectedValue={value}>
                {tags.map(tag => (
                  <Select.Item
                    key={tag.rxId}
                    label={tag.name}
                    value={tag.rxId}
                  />
                ))}
              </Select>
            )}
          />
        </FormControl>
      </HStack>
    </VStack>
  );

  const renderButton = () => {
    return (
      <CustomButton onPress={handleSubmit(submitHandler)}>
        {actionLabel}
      </CustomButton>
    );
  };

  return (
    <Screen>
      <KeyboardAvoidingView>
        <VStack space={SPACING * 3}>
          {renderImageField()}
          {renderFields()}
          {renderButton()}
        </VStack>
        <Box flexGrow={1} />
      </KeyboardAvoidingView>
    </Screen>
  );
};
