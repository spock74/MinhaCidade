import { Box } from "native-base";

import AsyncStorage from "@react-native-async-storage/async-storage";
import { useEffect, useState } from "react";
import { useIsFocused } from "@react-navigation/native";
import PlacesList from "../components/places/PlacesList";
import { getAllPlacesSql } from "../util/database";

function AllPlaces({ route }) {
  const [loadedPlaces, setLoadedPlaces] = useState([]);
  const isFocused = useIsFocused();

  // handle load places from async storage as currPlaces
  // set it in a Context?

  const getAllKeys = async () => {
    let keys = [];
    try {
      keys = await AsyncStorage.getAllKeys();
    } catch (e) {
      // read key error
    }

    console.log(keys);
    // example console.log result:
    // ['@MyApp_user', '@MyApp_key']
  };

  useEffect(() => {
    async function loadPlaces() {
      const places = await getAllPlacesSql();
      setLoadedPlaces(places);
      // console.log("loadedPlaces: from allplaces component ", loadedPlaces);
    }
    if (isFocused) {
      loadPlaces();
    }
    // getAllPlacesSql();
    // setLoadedPlaces((curPlaces) => [...curPlaces, route.params.place]);
  }, [isFocused]);

  return <PlacesList places={loadedPlaces} />;
}

export default AllPlaces;
