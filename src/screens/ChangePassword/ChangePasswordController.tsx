import React from 'react';
import {
  ChangePasswordFormValue,
  ChangePasswordScreen,
} from '@screens/ChangePassword/ChangePasswordScreen';
import {useMutation} from '@apollo/client';
import {
  CHANGE_PASSWORD,
  ChangePasswordMutationVars,
} from '@screens/ChangePassword/gql';
import omit from 'lodash/omit';
import {yesNoAlert} from '@utils/alert';
import {ProfileStackScreenProps} from '@navigation/ProfileStack/ProfileStack.types';
import {IMessageService} from '@core/modules/message/message-service.interface';
import {MessageService} from '@core/modules/message/message.service';

interface ChangePasswordControllerProps
  extends ProfileStackScreenProps<'ChangePassword'> {
  messageService?: IMessageService;
}

export const ChangePasswordController: React.FC<
  ChangePasswordControllerProps
> = ({navigation, messageService = new MessageService()}) => {
  const [changePassword, {loading}] = useMutation<
    any,
    ChangePasswordMutationVars
  >(CHANGE_PASSWORD);

  const handleSavePassword = (value: ChangePasswordFormValue) => {
    yesNoAlert('Are you sure?', 'Your password will be changed', () => {
      changePassword({
        variables: {
          input: omit(value, 'reEnterNewPassword'),
        },
        onCompleted: () => {
          messageService?.info('Your password has been changed');
          navigation.goBack();
        },
        onError: error => {
          messageService?.error(error.message);
        },
      });
    });
  };

  return (
    <ChangePasswordScreen
      loading={loading}
      onSavePassword={handleSavePassword}
    />
  );
};
