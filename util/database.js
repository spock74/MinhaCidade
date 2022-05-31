import * as SQLite from "expo-sqlite";
import { Place } from "../models/Place";
const database = SQLite.openDatabase("places.db");

export function initSqlite() {
  return new Promise((resolve, reject) => {
    database.transaction((tx) => {
      tx.executeSql(
        `CREATE TABLE IF NOT EXISTS PLACES (
                id INTEGER PRIMARY KEY NOT NULL, 
                id_name TEXT NOT NULL,
                user TEXT NOT NULL,
                description TEXT NOT NULL, 
                imageUri TEXT NOT NULL,
                address TEXT NOT NULL, 
                latitude REAL NOT NULL, 
                longitude REAL NOT NULL, 
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

export function insertPlaceSql(place) {
  return new Promise((resolve, reject) => {
    database.transaction((tx) => {
      tx.executeSql(
        `INSERT INTO PLACES (
          id_name, 
          user, 
          description, 
          imageUri, 
          address, 
          latitude, 
          longitude, 
          destination, 
          timestamp,
          date) 
        VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?)`,
        [
          place.idName ? place.idName : "__",
          place.user,
          place.description,
          place.imageUri,
          place.address,
          place.latitude,
          place.longitude,
          place.destination || "__",
          place.timestamp,
          place.date,
        ],
        (_, result) => {
          console.log("result from insertPlaceSql: ", result);
          resolve(result);
        },
        (_, err) => {
          reject(err);
        }
      );
    });
  });
}

// this.idName
// this.user = user;
// this.description = description;
// this.imageUri = imageUri;
// this.address = address;
// this.latitude = latitude;
// this.longitude = longitude;
// this.destination = destination;
// this.timestamp = new Date().getTime().toString();
// this.date = new Date().toISOString();

export function getAllPlacesSql() {
  return new Promise((resolve, reject) => {
    database.transaction((tx) => {
      tx.executeSql(
        `SELECT * FROM PLACES`,
        [],
        (_, result) => {
          const places = [];
          for (const item of result.rows._array) {
            places.push(
              new Place(
                item.id_name,
                item.user,
                item.description,
                item.imageUri,
                item.address,
                item.latitude,
                item.longitude,
                item.destination,
                item.timestamp,
                item.date
              )
            );
          }
          console.log("result from getAllPlacesSql: ", places);

          resolve(result.rows._array);
        },
        (_, err) => {
          reject(err);
        }
      );
    });
  });
}

export function getPlacesSqlByUserEmail(email) {
  return new Promise((resolve, reject) => {
    database.transaction((tx) => {
      tx.executeSql(
        `SELECT * FROM PLACES WHERE user = ?`,
        [email],
        (_, result) => {
          const places = [];
          for (const item of result.rows._array) {
            places.push(
              new Place(
                item.id_name,
                item.user,
                item.description,
                item.imageUri,
                item.address,
                item.latitude,
                item.longitude,
                item.destination,
                item.timestamp,
                item.date
              )
            );
          }
          console.log("result from getPlacesSqlByUserEmail: ", places);

          resolve(result.rows._array);
        },
        (_, err) => {
          reject(err);
        }
      );
    });
  });
}

export function getPlacesSqlByIdName(idName) {
  return new Promise((resolve, reject) => {
    database.transaction((tx) => {
      tx.executeSql(
        `SELECT * FROM PLACES WHERE id_name = ?`,
        [idName],
        (_, result) => {
          const places = [];
          for (const item of result.rows._array) {
            places.push(
              new Place(
                item.id_name,
                item.user,
                item.description,
                item.imageUri,
                item.address,
                item.latitude,
                item.longitude,
                item.destination,
                item.timestamp,
                item.date
              )
            );
          }
          console.log("result from getPlacesSqlByIdName: ", places);

          resolve(result.rows._array);
        },
        (_, err) => {
          reject(err);
        }
      );
    });
  });
}

export function deleteTablePlaceSql() {
  return new Promise((resolve, reject) => {
    database.transaction((tx) => {
      tx.executeSql(
        `DROP TABLE IF EXISTS PLACES`,
        [],
        (_, result) => {
          console.log("result from deleteTablePlaceSql: ", result);
          resolve(result);
        },
        (_, err) => {
          reject(err);
        }
      );
    });
  });
}

export class Location {
  constructor(latitude, longitude) {
    this.latitude = latitude;
    this.longitude = longitude;
  }
  return = () => {
    return {
      latitude: this.latitude,
      longitude: this.longitude,
    };
  };
}

export function getAllLocations() {
  return new Promise((resolve, reject) => {
    database.transaction((tx) => {
      tx.executeSql(
        `SELECT latitude , longitude FROM PLACES`,
        [],
        (_, result) => {
          const locations = [];
          for (const item of result.rows._array) {
            locations.push(new Location(item.latitude, item.longitude));
          }
          console.log("result from getAllLocations: ", locations);

          resolve(result.rows._array);
        },
        (_, err) => {
          reject(err);
        }
      );
    });
  });
}
