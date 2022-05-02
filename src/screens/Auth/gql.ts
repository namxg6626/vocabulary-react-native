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

interface User {
  username: string;
  email: string;
}

export interface AuthData {
  user: User;
  token: string;
}

export interface SignInVars {
  signInInput: {
    email: string;
    password: string;
  };
}

export interface SignUpVars {
  signUpInput: {
    email: string;
    password: string;
  };
}
