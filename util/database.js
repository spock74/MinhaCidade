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

export function insertPlaceSql(place) {
  return new Promise((resolve, reject) => {
    database.transaction((tx) => {
      tx.executeSql(
        `INSERT INTO PLACES (
          id_name, 
          description, 
          imageUri, 
          address, 
          latitude, 
          longitude, 
          user, 
          destination, 
          timestamp,
          date) 
        VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?)`,
        [
          place.idName ? place.idName : "__",
          place.description,
          place.imageUri,
          place.address,
          place.latitude,
          place.longitude,
          place.user,
          place.destination,
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

// this.description = description;
// this.imageUri = imageUri;
// this.address = address;
// this.latitude = latitude;
// this.longitude = longitude;
// this.user = user;
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
                item.description,
                item.imageUri,
                item.address,
                item.latitude,
                item.longitude,
                item.user,
                item.destination,
                item.timestamp,
                item.date
              )
            );
          }
          console.log("result fro getAllPlacesSql: ", places);

          resolve(result.rows._array);
        },
        (_, err) => {
          reject(err);
        }
      );
    });
  });
}