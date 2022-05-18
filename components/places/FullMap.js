import { StyleSheet, Alert } from "react-native";
import { useCallback, useState, useLayoutEffect } from "react";
import MapView, { Marker } from "react-native-maps";
import { GEO_CONFIG } from "../../geoloc/geoconfig";
import IconButton from "./UI/IconButton";

function FullMap({ route, navigation }) {
  const { loc } = route.params;
  const [selectedLocation, setSelectedLocation] = useState({
    lat: loc.lat,
    lon: loc.lon,
  });

  //console.log("initial selectedLocation", selectedLocation);

  const INITIAL_LATITUDE_DELTA = GEO_CONFIG.INITIAL_LATITUDE_DELTA / 5;
  const INITIAL_LONGITUDE_DELTA = GEO_CONFIG.INITIAL_LONGITUDE_DELTA / 5;

  const initialPosition = {
    latitude: selectedLocation.lat,
    longitude: selectedLocation.lon,
    latitudeDelta: INITIAL_LATITUDE_DELTA,
    longitudeDelta: INITIAL_LONGITUDE_DELTA,
  };

  function selectionLocationHandler(event) {
    //console.log("event", event);
    const lat = event.nativeEvent.coordinate.latitude;
    const lon = event.nativeEvent.coordinate.longitude;
    setSelectedLocation({
      lat: lat,
      lon: lon,
    });
  }

  const savePickedLocationHandler = useCallback(() => {
    if (!selectedLocation) {
      Alert.alert(
        "Nenhum local selecionado",
        "Selecione um local clicando no mapa no local desejado"
      );
      return;
    }

    navigation.navigate("AddPlace", {
      pickedLat: selectedLocation.lat,
      pickedLon: selectedLocation.lon,
    });
  }, [navigation, selectedLocation]);

  useLayoutEffect(() => {
    navigation.setOptions({
      headerRight: ({ tintColor }) => (
        <IconButton
          icon="save"
          size={25}
          color={tintColor}
          onPress={savePickedLocationHandler}
        />
      ),
    });
  }, [navigation, savePickedLocationHandler]);

  return (
    <MapView
      onPress={selectionLocationHandler}
      style={styles.map}
      initialRegion={initialPosition}
    >
      {selectedLocation && (
        <Marker
          coordinate={{
            latitude: selectedLocation.lat,
            longitude: selectedLocation.lon,
          }}
        />
      )}
    </MapView>
  );
}

const styles = StyleSheet.create({
  map: {
    flex: 1,
  },
});

export default FullMap;
