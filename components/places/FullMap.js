import { StyleSheet, Alert } from "react-native";
import { useCallback, useState, useLayoutEffect } from "react";
import MapView, { Marker } from "react-native-maps";
import { GEO_CONFIG } from "../../geoloc/geoconfig";
import IconButton from "./UI/IconButton";

function FullMap({ route, navigation }) {
  const { loc } = route.params;
  const [pickedLocation, setPickedLocation] = useState({
    lat: loc.lat,
    lon: loc.lon,
  });

  console.log("locccc pickedLocation", pickedLocation);

  const INITIAL_LATITUDE_DELTA = GEO_CONFIG.INITIAL_LATITUDE_DELTA / 5;
  const INITIAL_LONGITUDE_DELTA = GEO_CONFIG.INITIAL_LONGITUDE_DELTA / 5;

  const initialPosition = {
    latitude: pickedLocation.lat,
    longitude: pickedLocation.lon,
    latitudeDelta: INITIAL_LATITUDE_DELTA,
    longitudeDelta: INITIAL_LONGITUDE_DELTA,
  };
 
  
  function selectionLocationHandler(event) {
    console.log("event", event);
    const lat = event.nativeEvent.coordinate.latitude;
    const lon = event.nativeEvent.coordinate.longitude;
    setPickedLocation({
      lat: lat,
      lon: lon,
    });
  }
    
  const savePickLocationHandler = useCallback(() => {
    if (!pickedLocation) {
      Alert.alert(
        "Nenhum local selecionado",
        "Selecione um local clicando no mapa no local desejado"
      );
      return;
    }

    navigation.navigate("AddPlace", { pickedLocation });
  }, [navigation, pickedLocation]);

  useLayoutEffect(() => {
    navigation.setOptions({
      headerRight: ({ tintColor }) => (
        <IconButton
          icon="save"
          size={25}
          color={tintColor}
          onPress={savePickLocationHandler}
        />
      ),
    });
  }, [navigation, savePickLocationHandler]);

  return (
    <MapView
      onPress={selectionLocationHandler}
      style={styles.map}
      initialRegion={initialPosition}
    >
      {pickedLocation && (
        <Marker
          coordinate={{
            latitude: pickedLocation.lat,
            longitude: pickedLocation.lon,
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
