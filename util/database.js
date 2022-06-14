import * as SQLite from "expo-sqlite";

import PouchDB from "pouchdb-react-native";

import { Place } from "../models/Place";
import { WebSQLDatabase } from "expo-sqlite";


const database = SQLite.openDatabase("places2.db");




// export class Place {
//   constructor(idName, title, rating, user, reviews, description, image, address, latitude, longitude, destination) {
//     this.idName = idName,
//     this.title = title,
//     this.rating = rating,
//     this.user = user,
//     this.reviews = reviews,
//     this.description = description;
//     this.image = image;
//     this.address = address;
//     this.latitude = latitude;
//     this.longitude = longitude;
//     this.destination = destination;
//     this.timestamp = new Date().getTime().toString();
//     this.date = new Date().toISOString();
//   }
// }
export function initSqlite() {
  return new Promise((resolve, reject) => {
    database.transaction((tx) => {
      tx.executeSql(
        `CREATE TABLE IF NOT EXISTS PLACES2 (
                id INTEGER PRIMARY KEY NOT NULL, 
                address TEXT NOT NULL,
                date TEXT NOT NULL,
                description TEXT NOT NULL,
                destination TEXT NOT NULL, 
                image TEXT NOT NULL,
                latitude REAL NOT NULL, 
                longitude REAL NOT NULL, 
                rating TEXT NOT NULL, 
                reviews TEXT NOT NULL,
                timestamp TEXT NOT NULL,
                title TEXT NOT NULL,
                user TEXT NOT NULL)`,
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
        `INSERT INTO PLACES2 (
          address,
          date,
          description,
          destination,
          image,
          latitude,
          longitude,
          rating,
          reviews,
          timestamp,
          title,
          user
          ) 
        VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)`,
        [
          address,
          date,
          description,
          destination,
          image,
          latitude,
          longitude,
          rating,
          reviews,
          timestamp,
          title,
          user
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

// export class Place {
//   constructor(idName, title, rating, user, reviews, description, image, address, latitude, longitude, destination) {
//     this.idName = idName,
//     this.title = title,
//     this.rating = rating,
//     this.user = user,
//     this.reviews = reviews,
//     this.description = description;
//     this.image = image;
//     this.address = address;
//     this.latitude = latitude;
//     this.longitude = longitude;
//     this.destination = destination;
//     this.timestamp = new Date().getTime().toString();
//     this.date = new Date().toISOString();
//   }
// }
export function getAllPlacesSql() {
  return new Promise((resolve, reject) => {
    database.transaction((tx) => {
      tx.executeSql(
        `SELECT * FROM PLACES2`,
        [],
        (_, result) => {
          const places = [];
          for (const item of result.rows._array) {
            places.push(
              new Place(
                item.address,
                item.date,
                item.description,
                item.destination,
                item.image,
                item.latitude,
                item.longitude,
                item.rating,
                item.reviews,
                item.timestamp,
                item.title,
                item.user
              )
            );
          }
          // console.log("result from getAllPlacesSql --- : ", result.rows._array);

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
        `SELECT * FROM PLACES2 WHERE user = ?`,
        [email],
        (_, result) => {
          const places = [];
          for (const item of result.rows._array) {
            places.push(
              new Place(
                item.address,
                item.date,
                item.description,
                item.destination,
                item.image,
                item.latitude,
                item.longitude,
                item.rating,
                item.reviews,
                item.timestamp,
                item.title,
                item.user
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
        `SELECT * FROM PLACES2 WHERE id_name = ?`,
        [idName],
        (_, result) => {
          const places = [];
          for (const item of result.rows._array) {
            places.push(
              new Place(
                item.address,
                item.date,
                item.description,
                item.destination,
                item.image,
                item.latitude,
                item.longitude,
                item.rating,
                item.reviews,
                item.timestamp,
                item.title,
                item.user
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
        `DROP TABLE IF EXISTS PLACES2`,
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

export function deleteDatabasePlaceSql() {
  WebSQLDatabase.deleteAsync("places2").then(() => { console.log("database deleted"); });
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
        `SELECT latitude , longitude FROM PLACES2`,
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

export const db2 = new PouchDB("place_database01");

export function deletePouchDB() {
  db2.destroy("place_database01").then(function (response) {
    console.log(response);
  }).catch(function (err) {
    console.log(err);
  });
}

