import {gql} from '@apollo/client';

export const ME = gql`
  query Me {
    me {
      username
      email
    }
  }
`;

export interface MeQueryResponse {
  me: {
    username: string;
    email: string;
  };
}

export const UPDATE_PROFILE = gql`
  mutation UpdateProfile($input: UpdateProfileInput!) {
    updateProfile(input: $input) {
      username
      email
    }
  }
`;

export interface UpdateProfileMutationResponse {
  updateProfile: {
    username: string;
    email: string;
  };
}

export interface UpdateProfileMutationVars {
  input: {
    username: string;
    email: string;
  };
}
