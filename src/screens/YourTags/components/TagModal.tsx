import React, {useEffect, useState} from 'react';
import {Box, Button, FormControl, HStack, Modal} from 'native-base';
import {CustomInput, KeyboardAvoidingView} from '@components/index';
import {widthPercentageToDP} from 'react-native-responsive-screen';
import {useForm, Controller} from 'react-hook-form';
import isEmpty from 'lodash/isEmpty';

export type TagFormValue = {
  name: string;
};

export type TagModalProps = {
  header: React.ReactNode;
  isOpen: boolean;
  onConfirm: (values: TagFormValue) => void;
  onClose: () => void;
  defaultValue?: TagFormValue;
};

export const TagModal: React.FC<TagModalProps> = ({
  header,
  isOpen,
  onConfirm,
  onClose,
  defaultValue,
}) => {
  const {
    control,
    handleSubmit,
    formState: {errors},
    reset,
  } = useForm<TagFormValue>();
  const [isResetted, setIsResetted] = useState(false);

  useEffect(() => {
    if (!isEmpty(defaultValue) && !isResetted) {
      reset({
        name: defaultValue?.name,
      });
      setIsResetted(true);
    } else if (isEmpty(defaultValue)) {
      setIsResetted(false);
    }
  }, [defaultValue, reset, isResetted]);

  return (
    <Modal isOpen={isOpen} onClose={onClose}>
      <KeyboardAvoidingView w={'full'}>
        <Box flex={1} justifyContent={'center'} alignItems={'center'}>
          <Modal.Content>
            <Modal.CloseButton onPress={onClose} />
            <Modal.Header>{header}</Modal.Header>
            <Modal.Body>
              <FormControl isRequired isInvalid={!!errors.name}>
                <FormControl.Label fontSize={'md'}>
                  Tag's name
                </FormControl.Label>
                <Controller
                  control={control}
                  name={'name'}
                  rules={{
                    required: 'Required!',
                  }}
                  render={({field}) => (
                    <CustomInput
                      onChangeText={field.onChange}
                      onBlur={field.onBlur}
                      value={field.value}
                      placeholder={"Type tag's name here"}
                      fontSize={'md'}
                    />
                  )}
                />
                <FormControl.ErrorMessage>
                  {errors.name?.message}
                </FormControl.ErrorMessage>
              </FormControl>
            </Modal.Body>
            <Modal.Footer>
              <HStack space={widthPercentageToDP(2)} flex={1}>
                <Button
                  variant={'outline'}
                  onPress={onClose}
                  colorScheme={'info'}
                  flex={1}>
                  Cancel
                </Button>
                <Button
                  onPress={handleSubmit(onConfirm)}
                  colorScheme={'info'}
                  flex={1}>
                  Confirm
                </Button>
              </HStack>
            </Modal.Footer>
          </Modal.Content>
        </Box>
      </KeyboardAvoidingView>
    </Modal>
  );
};
