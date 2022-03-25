import {createRxDatabase, RxDatabase} from 'rxdb';
import {addPouchPlugin, getRxStoragePouch} from 'rxdb/plugins/pouchdb';
import SQLite from 'react-native-sqlite-2';
import SQLiteAdapterFactory from 'pouchdb-adapter-react-native-sqlite';
import * as PouchDBAdapterHttp from 'pouchdb-adapter-http';
import {AppCollections} from './rxdb.types';
import {wordSchema} from '@core/modules/word/word.schema';

const SQLiteAdapter = SQLiteAdapterFactory(SQLite);

addPouchPlugin(SQLiteAdapter);
addPouchPlugin(PouchDBAdapterHttp);

let rxDB: RxDatabase<AppCollections>;

async function createRxDatabaseAsync() {
  // re-create RxDatabase by using the function below it not override existing data
  return await createRxDatabase<AppCollections>({
    name: 'mydatabase',
    storage: getRxStoragePouch('react-native-sqlite'), // the name of your adapter,
    ignoreDuplicate: false,
    multiInstance: false,
  });
}

export async function initRxDatabaseAsync() {
  if (!rxDB) {
    rxDB = await createRxDatabaseAsync();
  }

  // make sure we add the collection(s) only one time
  if (!rxDB.word) {
    await rxDB.addCollections({
      word: {
        schema: wordSchema,
      },
    });
  }

  return rxDB;
}
