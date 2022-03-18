import {createRxDatabase} from 'rxdb';
import {addPouchPlugin, getRxStoragePouch} from 'rxdb/plugins/pouchdb';
import SQLite from 'react-native-sqlite-2';
import SQLiteAdapterFactory from 'pouchdb-adapter-react-native-sqlite';

const SQLiteAdapter = SQLiteAdapterFactory(SQLite);

addPouchPlugin(SQLiteAdapter);
addPouchPlugin(require('pouchdb-adapter-http'));

export const database = await createRxDatabase({
  name: 'mydatabase',
  storage: getRxStoragePouch('react-native-sqlite'), // the name of your adapter
});
