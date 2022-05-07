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
