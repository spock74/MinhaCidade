import { StyleSheet, Alert } from "react-native";
import { useEffect, useState, useLayoutEffect } from "react";
import { useIsFocused } from "@react-navigation/native";
import MapView, { Marker } from "react-native-maps";
import { GEO_CONFIG } from "../geoloc/geoconfig";
import { getAllPlacesSql } from "../util/database";

function AllPlacesMap() {
  const INITIAL_LATITUDE_DELTA = GEO_CONFIG.INITIAL_LATITUDE_DELTA / 5;
  const INITIAL_LONGITUDE_DELTA = GEO_CONFIG.INITIAL_LONGITUDE_DELTA / 5;
  const initialPosition = {
    latitude: -20.7632978,
    longitude: -42.88399,
    latitudeDelta: INITIAL_LATITUDE_DELTA,
    longitudeDelta: INITIAL_LONGITUDE_DELTA,
  };

  const [loadedPlaces, setLoadedPlaces] = useState([]);
  const isFocused = useIsFocused();

  useEffect(() => {
    async function loadPlaces() {
      const places = await getAllPlacesSql();
      setLoadedPlaces(places);
    }
    if (isFocused) {
      loadPlaces();
    }
  }, [isFocused]);

  return (
    <MapView style={styles.map} initialRegion={ initialPosition }>
      <Marker
        coordinate ={{
          latitude: initialPosition.latitude,
          longitude: initialPosition.longitude,
        }}
      />
    </MapView>
  );
}

const styles = StyleSheet.create({
  map: {
    flex: 1,
  },
});

export default AllPlacesMap;
