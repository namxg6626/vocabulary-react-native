import {
  addRxPlugin,
  createRxDatabase,
  RxDatabase,
  removeRxDatabase,
} from 'rxdb';
import {RxDBReplicationGraphQLPlugin} from 'rxdb/plugins/replication-graphql';
import {addPouchPlugin, getRxStoragePouch} from 'rxdb/plugins/pouchdb';
import SQLite from 'react-native-sqlite-2';
import SQLiteAdapterFactory from 'pouchdb-adapter-react-native-sqlite';
import * as PouchDBAdapterHttp from 'pouchdb-adapter-http';
import {AppCollections} from './rxdb.types';
import {wordSchema} from '@core/modules/word/word.schema';
import {tagSchema} from '@core/modules/tag/schemas/tag.schema';
import {
  pullTagsQueryBuilder,
  pullWordsQueryBuilder,
  pushTagQueryBuilder,
  pushWordsQueryBuilder,
} from '@core/database/replication';
import {AsyncStorageService} from '@core/modules/async-storage/async-storage.service';
import {AsyncStorageKeyEnum} from '@core/modules/async-storage/async-storage.enum';

const SQLiteAdapter = SQLiteAdapterFactory(SQLite);

addPouchPlugin(SQLiteAdapter);
addPouchPlugin(PouchDBAdapterHttp);
addRxPlugin(RxDBReplicationGraphQLPlugin);

let rxDB: RxDatabase<AppCollections>;
let isAddedCollections = false;
const storage = getRxStoragePouch('react-native-sqlite');

async function createRxDatabaseAsync() {
  // re-create RxDatabase by using the function below it not override existing data
  return await createRxDatabase<AppCollections>({
    name: 'mydatabase',
    storage, // the name of your adapter,
    ignoreDuplicate: false,
    multiInstance: false,
  });
}

export function getRxDatabaseInstance() {
  return rxDB ? rxDB : null;
}

export async function initRxDatabaseAsync() {
  if (!rxDB) {
    rxDB = await createRxDatabaseAsync();
  }

  // make sure we add the collection(s) only one time
  if (!isAddedCollections) {
    await rxDB.addCollections({
      word: {
        schema: wordSchema,
      },
      tag: {
        schema: tagSchema,
      },
    });
    isAddedCollections = true;
  }

  return rxDB;
}

export async function syncGraphQL() {
  const asyncStorageService = new AsyncStorageService();
  const token = await asyncStorageService.get(AsyncStorageKeyEnum.TOKEN);

  if (isAddedCollections) {
    const commonOptions = {
      url: 'http://localhost:3000/graphql',
      headers: {
        authorization: 'Bearer ' + token,
      },
      deletedFlag: 'deleted',
      live: true,
      liveInterval: 1000 * 60 * 5,
    };

    rxDB.word.syncGraphQL({
      ...commonOptions,
      push: {
        queryBuilder: pushWordsQueryBuilder,
        modifier: doc => ({
          rxId: doc.rxId,
          word: doc.word,
          meaning: doc.meaning,
          updatedAt: doc.updatedAt,
          deleted: !!doc._deleted,
        }),
      },
      pull: {
        queryBuilder: pullWordsQueryBuilder,
      },
    });

    rxDB.tag.syncGraphQL({
      ...commonOptions,
      push: {
        queryBuilder: pushTagQueryBuilder,
        modifier: doc => ({
          rxId: doc.rxId,
          name: doc.name,
          wordIds: doc.wordIds,
          updatedAt: doc.updatedAt,
          deleted: !!doc._deleted,
        }),
      },
      pull: {
        queryBuilder: pullTagsQueryBuilder,
      },
    });
  }
}

export const resetRxDB = async () => {
  if (rxDB) {
    await removeRxDatabase('mydatabase', storage);
  }
  return Promise.resolve();
};
