import {
  ApolloLink,
  FetchResult,
  NextLink,
  Observable,
  Observer,
  Operation,
} from '@apollo/client';

export class LoggerLink extends ApolloLink {
  request(
    operation: Operation,
    forward: NextLink,
  ): Observable<FetchResult> | null {
    console.log('GQL OperationName:', operation.operationName);

    return forward(operation).map(result => {
      console.log('GQL FetchData:', result.data);
      return result;
    });
  }

  protected onError(
    error: any,
    observer?: Observer<FetchResult>,
  ): false | void {
    console.error('GQL Error:', error);
    return super.onError(error, observer);
  }
}

export const loggerLink = new LoggerLink();
