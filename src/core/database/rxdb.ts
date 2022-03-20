import {createRxDatabase} from 'rxdb';
import {addPouchPlugin, getRxStoragePouch} from 'rxdb/plugins/pouchdb';
import SQLite from 'react-native-sqlite-2';
import SQLiteAdapterFactory from 'pouchdb-adapter-react-native-sqlite';
import * as PouchDBAdapterHttp from 'pouchdb-adapter-http';
import {AppCollections} from './rxdb.types';
import {wordSchema} from '@core/modules/word/word.schema';

const SQLiteAdapter = SQLiteAdapterFactory(SQLite);

addPouchPlugin(SQLiteAdapter);
addPouchPlugin(PouchDBAdapterHttp);

export async function createRxDatabaseAsync() {
  const rxDatabase = await createRxDatabase<AppCollections>({
    name: 'mydatabase',
    storage: getRxStoragePouch('react-native-sqlite'), // the name of your adapter
  });
  await rxDatabase.addCollections({
    word: {
      schema: wordSchema,
    },
  });

  return rxDatabase;
}
