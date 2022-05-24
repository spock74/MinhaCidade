import * as SQLite from "expo-sqlite";

const database = SQLite.openDatabase("places.db");

export function initSqlite() {
  return new Promise((resolve, reject) => {
    database.transaction((tx) => {
      tx.executeSql(
        `CREATE TABLE IF NOT EXISTS PLACES (
                id INTEGER PRIMARY KEY NOT NULL, 
                id_name TEXT NOT NULL,
                description TEXT NOT NULL, 
                imageUri TEXT NOT NULL,
                address TEXT NOT NULL, 
                latitude REAL NOT NULL, 
                longitude REAL NOT NULL, 
                user TEXT NOT NULL,
                destination TEXT NOT NULL,
                timestamp TEXT NOT NULL,
                date TEXT NOT NULL)`,
        [],
        () => {
          resolve();
        },
        (_, err) => {
          reject(err);
        }
      );
    });
  });
}
