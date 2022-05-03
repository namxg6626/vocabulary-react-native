import {
  ApolloClient,
  InMemoryCache,
  createHttpLink,
  ApolloLink,
} from '@apollo/client';
import {AsyncStorageService} from '@core/modules/async-storage/async-storage.service';
import {AsyncStorageKeyEnum} from '@core/modules/async-storage/async-storage.enum';
import {setContext} from '@apollo/client/link/context';

const loggerLink = new ApolloLink((operation, forward) => {
  console.log('GQL OperationName:', operation.operationName);

  return forward(operation).map(result => {
    console.log('GQL FetchData:', result.data);
    return result;
  });
});

const httpLink = createHttpLink({
  uri: 'http://localhost:3000/graphql',
});

const authLink = setContext(async (_, {headers}) => {
  const asyncStorageService = new AsyncStorageService();
  const token = await asyncStorageService.tryGetObject(
    AsyncStorageKeyEnum.TOKEN,
  );
  const newHeaders = {
    ...headers,
    'Content-Type': 'application/json',
  };

  if (token) {
    newHeaders.authorization = 'Bearer ' + token;
  }

  return {
    headers: {
      ...newHeaders,
    },
  };
});

export const apolloClient = new ApolloClient({
  link: ApolloLink.from([authLink, loggerLink, httpLink]),
  cache: new InMemoryCache(),
});
