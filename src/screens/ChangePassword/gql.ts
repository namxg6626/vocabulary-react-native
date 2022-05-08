import {gql} from '@apollo/client';

export const CHANGE_PASSWORD = gql`
  mutation ChangePassword($input: ChangePasswordInput!) {
    changePassword(input: $input) {
      password
      username
      updatedAt
    }
  }
`;

export interface ChangePasswordMutationVars {
  input: {
    oldPassword: string;
    newPassword: string;
  };
}
