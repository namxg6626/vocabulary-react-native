import {ApolloClient, InMemoryCache, ApolloLink} from '@apollo/client';
import {authLink, httpLink, loggerLink} from './links';

export const client = new ApolloClient({
  link: ApolloLink.from([authLink, loggerLink, httpLink]),
  cache: new InMemoryCache(),
});
