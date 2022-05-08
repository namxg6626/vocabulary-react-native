import {object, string, ValidationError} from 'yup';

const requiredString = string()
  .required('Required!')
  .min(4, 'Password must be at least 4 characters');

export const changePasswordValidationSchema = object()
  .shape({
    oldPassword: requiredString,
    newPassword: requiredString,
    reEnterNewPassword: requiredString,
  })
  .test({
    test: v => {
      if (v.newPassword !== v.reEnterNewPassword) {
        const errorMessage = 'Password does not match';

        return new ValidationError(
          errorMessage,
          undefined,
          'reEnterNewPassword',
        );
      }
      return true;
    },
  });
