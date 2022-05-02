import {object, string} from 'yup';

const requiredString = string().required('Required');
export const signIn = object().shape({
  email: requiredString,
  password: requiredString,
});

export const signUp = signIn.clone().concat(
  object().shape({
    repassword: string().test({
      test: (value, context) => {
        const password = context.parent.password;
        if (value !== password) {
          return context.createError({
            path: 'repassword',
            message: 'Password does not match',
          });
        }
        return true;
      },
    }),
  }),
);
