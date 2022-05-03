import {setContext} from '@apollo/client/link/context';
import {AsyncStorageService} from '@core/modules/async-storage/async-storage.service';
import {AsyncStorageKeyEnum} from '@core/modules/async-storage/async-storage.enum';

export const authLink = setContext(async (_, {headers}) => {
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
