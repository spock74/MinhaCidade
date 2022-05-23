import AsyncStorage from "@react-native-async-storage/async-storage";
import { useEffect, useState } from "react";
import { useIsFocused } from "@react-navigation/native";
import PlacesList from "../components/places/PlacesList";

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
    if (isFocused && route.params) {
      // if( array.forEach(element=> {
      //   route.params.place
      // });){
      //   return
      // }
      // setLoadedPlaces(route.params.placeData);
      setLoadedPlaces((curPlaces) => [...curPlaces, route.params.place]);
      // setLoadedPlaces = (curPlaces) => {
      //   curPlaces.forEach((elem) => {
      //     elem.place.id !== route.params.place.id ? [...curPlaces, route.params.place] : [curPlaces];
      //   });
      // }
    }
  }, [isFocused, route.params]);

  return <PlacesList places={loadedPlaces} />;
}

export default AllPlaces;
