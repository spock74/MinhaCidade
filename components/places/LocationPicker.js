import { Image, Alert, View, StyleSheet, Text } from "react-native";
import { useState, useEffect } from "react";
import {
  useNavigation,
  useIsFocused,
  useRoute,
} from "@react-navigation/native";
import OutLinedButton from "./OutLinedButton";
import { Colors } from "../../constants/Colors";
import {
  getCurrentPositionAsync,
  useForegroundPermissions,
  PermissionStatus,
} from "expo-location";
import { getMapPreview, getAddress } from "../../geoloc/getMapPreview";

///================================================
function LocationPicker({ onPress, onPickedLocation }) {
  const [pickedLocation, setPickedLocation] = useState("");
  const isFocused = useIsFocused();
  const navigation = useNavigation();
  const route = useRoute();

  //-----
  useEffect(() => {
    if (isFocused && route.params) {
      const mapPickedLocation = {
        lat: route.params.pickedLat,
        lon: route.params.pickedLon,
      };
      //console.log("mapPickedLocation", mapPickedLocation);
      setPickedLocation(mapPickedLocation);
    }
  }, [route, isFocused]);
  //------

  useEffect(() => {
    let address = "";
    async function handleLocation() {
      if (pickedLocation) {
        address = await getAddress(pickedLocation.lat, pickedLocation.lon);
        onPickedLocation({ ...pickedLocation, address: address });
      }
    }
    handleLocation();
  }, [onPickedLocation, pickedLocation]);

  const [locationPermissionInformation, requestPermission] =
    useForegroundPermissions();

  async function veryPermissions() {
    if (locationPermissionInformation.status === PermissionStatus.GRANTED) {
      const permitionResponse = await requestPermission();
      //console.log("GRANTED permitionResponse", permitionResponse);

      return permitionResponse.granted;
    }

    if (
      locationPermissionInformation.status === PermissionStatus.UNDETERMINED
    ) {
      const permitionResponse = await requestPermission();
      //console.log("permitionResponse", permitionResponse);

      return permitionResponse.granted;
    }

    if (locationPermissionInformation.status === PermissionStatus.DENIED) {
      Alert.alert(
        "Permissão insuficiente",
        "Para usar essa localização é necessário conceder permissão ao app"
      );
      return false;
    }
  }

  async function getLocationHandler() {
    const hasPermission = await veryPermissions();
    if (!hasPermission) {
      return;
    }

    const location = await getCurrentPositionAsync();
    setPickedLocation({
      lat: location.coords.latitude,
      lon: location.coords.longitude,
    });
  }

  function pickOnMapHandler() {
    navigation.navigate("FullMap", { loc: pickedLocation });
  }

  function savePlacceHandler() {
    // onPress(pickedLocation);
  }

  let locationPreview = <Text>Aguardando Mapa...</Text>;

  if (pickedLocation) {
    locationPreview = (
      <Image
        style={styles.map}
        source={{
          uri: getMapPreview(pickedLocation.lat, pickedLocation.lon, 19),
        }}
      />
    );
  }

  return (
    <View>
      <View style={styles.mapPreview}>{locationPreview}</View>
      <View style={styles.buttons}>
        <OutLinedButton
          style={styles.button}
          icon="location"
          color={Colors.primary400}
          size={28}
          onPress={getLocationHandler}
        ></OutLinedButton>
        <OutLinedButton
          style={styles.button}
          icon="map"
          color={Colors.primary400}
          size={28}
          onPress={pickOnMapHandler}
        ></OutLinedButton>
        <OutLinedButton
          style={styles.button}
          icon="cog"
          color={Colors.primary400}
          size={28}
          onPress={onPress}
        ></OutLinedButton>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  mapPreview: {
    flex: 1,
    width: "100%",
    height: 150,
    marginVertical: 8,
    justifyContent: "center",
    alignItems: "center",
    marginBottom: 0,
    backgroundColor: Colors.gray300,
    borderRadius: 10,
  },
  map: {
    flex: 1,
    width: "100%",
    height: 100,
    borderRadius: 10,
  },
  buttons: {
    width: "100%",
    flexDirection: "row",
    marginTop: 0,
    justifyContent: "space-around",
    alignItems: "center",
    alignContent: "center",
  },
  button: {
    flex: 1,
    width: 100,
    justifyContent: "center",
    alignItems: "center",
    alignContent: "center",
  },
});

export default LocationPicker;
