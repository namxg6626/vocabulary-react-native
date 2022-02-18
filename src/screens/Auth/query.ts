import {gql} from '@apollo/client';

export const SIGN_IN = gql`
  mutation SignIn($signInInput: SignInInput!) {
    signin(signInInput: $signInInput) {
      user {
        username
        email
      }
      token
    }
  }
`;

export const SIGN_UP = gql`
  mutation SignUp($signUpInput: SignUpInput!) {
    signup(signUpInput: $signUpInput) {
      user {
        username
        email
      }
      token
    }
  }
`;
