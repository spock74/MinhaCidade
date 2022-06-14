import { Box } from "native-base";

import AsyncStorage from "@react-native-async-storage/async-storage";
import { useEffect, useState } from "react";
import { useIsFocused } from "@react-navigation/native";
import PlacesList from "../components/places/PlacesList";
import { getAllPlacesSql } from "../util/database";
import { db2 } from "../util/database";

function AllPlaces({ route }) {
  const [loadedPlaces, setLoadedPlaces] = useState([]);
  const isFocused = useIsFocused();

  // handle load places from async storage as currPlaces
  // set it in a Context?

  // const getAllKeys = async () => {
  //   let keys = [];
  //   try {
  //     keys = await AsyncStorage.getAllKeys();
  //   } catch (e) {
  //     // read key error
  //   }

  //   console.log(keys);
  //   // example console.log result:
  //   // ['@MyApp_user', '@MyApp_key']
  // };




  useEffect(() => {
      db2
        .allDocs({ include_docs: true })
        .then((result) => {
          // console.log("result db2 allDocs: ", result);
          setLoadedPlaces(result.rows.map((row) => row.doc));
          console.log(">>>>>> do explorer 1 --- ", loadedPlaces);
        })
        .catch((err) => {console.log("err db2 allDocs: ", err);});
    }, []);

  return <PlacesList places={loadedPlaces} />;
}

export default AllPlaces;
