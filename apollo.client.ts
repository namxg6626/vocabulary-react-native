import {ApolloClient, InMemoryCache} from '@apollo/client';

export const apolloClient = new ApolloClient({
  uri: 'http://localhost:3000/graphql',
  headers: {
    'Content-Type': 'application/json',
  },
  cache: new InMemoryCache(),
});
