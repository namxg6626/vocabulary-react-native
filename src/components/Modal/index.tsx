import React from 'react';
import {Box, Modal as NBModal, IModalProps as NBModalProps} from 'native-base';
import {KeyboardAvoidingView} from '@components/KeyboardAvoidingView';

interface ModalProps {
  header?: React.ReactNode;
  body?: React.ReactNode;
  footer?: React.ReactNode;
  isOpen?: boolean;
  onRequestClose: () => void;
  contentProps?: NBModalProps;
  disableKeyboardAvoidingView?: boolean;
}

export const Modal: React.FC<ModalProps> = ({
  header,
  body,
  footer,
  isOpen,
  onRequestClose,
  disableKeyboardAvoidingView = false,
  contentProps = {},
}) => {
  const modalContent = (
    <Box flex={1} justifyContent={'center'} alignItems={'center'}>
      <NBModal.Content {...contentProps}>
        <NBModal.CloseButton onPress={onRequestClose} />
        <NBModal.Header>{header}</NBModal.Header>
        <NBModal.Body>{body}</NBModal.Body>
        <NBModal.Footer>{footer}</NBModal.Footer>
      </NBModal.Content>
    </Box>
  );

  return (
    <NBModal isOpen={isOpen} onClose={onRequestClose}>
      {disableKeyboardAvoidingView ? (
        modalContent
      ) : (
        <KeyboardAvoidingView w={'full'}>{modalContent}</KeyboardAvoidingView>
      )}
    </NBModal>
  );
};
