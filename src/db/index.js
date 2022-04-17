import SQLite from 'react-native-sqlite-storage';
const db = SQLite.openDatabase('places.db');

export const init = () => {
  const promise = new Promise((resolve, reject) => {
    db.transaction(tx => {
      tx.executeSql(
        'CREATE TABLE IF NOT EXISTS places (id INTEGER PRIMARY KEY NOT NULL, name TEXT ADDRESS NOT NULL, latitude REAL NOT NULL, longitude REAL NOT NULL)',
        [],
        () => {
          resolve();
        },
        (_, err) => {
          reject(err);
        },
      );
    });
  });
  return promise;
};

export const insertPlace = (name, image, address, latitude, longitude) => {
  const promise = new Promise((resolve, reject) => {
    db.transaction(tx => {
      tx.executeSql(
        'INSERT INTO places (name, image, address, latitude, longitude) VALUES (?, ?, ?, ?, ?)',
        [name, image, address, latitude, longitude],
        (_, result) => {
          resolve(result);
        },
        (_, err) => {
          reject(err);
        },
      );
    });
  });
  return promise;
};
