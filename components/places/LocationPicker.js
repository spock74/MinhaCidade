import { Image, Alert, View, StyleSheet, Text } from "react-native";
import {useState} from "react";
import { useNavigation } from "@react-navigation/native";
import OutLinedButton from "./OutLinedButton";
import { Colors } from "../../constants/Colors";
import {
  getCurrentPositionAsync,
  useForegroundPermissions,
  PermissionStatus,
} from "expo-location";
import MapView from "react-native-maps";
import { getMapPreview } from "../../geoloc/getMapPreview";

function LocationPicker() {
  const [pickedLocation, setPickedLocation] = useState("");

  const navigation = useNavigation();

  const [locationPermissionInformation, requestPermission] =
    useForegroundPermissions();

  async function veryPermissions() {
    if (locationPermissionInformation.status === PermissionStatus.GRANTED) {
      const permitionResponse = await requestPermission();
      console.log("GRANTED permitionResponse", permitionResponse);

      return permitionResponse.granted;
    }

    if (
      locationPermissionInformation.status === PermissionStatus.UNDETERMINED
    ) {
      const permitionResponse = await requestPermission();
      console.log("permitionResponse", permitionResponse);

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
    console.log("========== getLocationHandler ==========");
    const hasPermission = await veryPermissions();
    if (!hasPermission) {
      return;
    }
    const location = await getCurrentPositionAsync();
    console.log("picked location", location);
    setPickedLocation({
      lat: location.coords.latitude,
      lon: location.coords.longitude,
    });
  }

  function pickOnMapHandler() {
    navigation.navigate("FullMap", {loc: pickedLocation});
  }

  let locationPreview = <Text>Aguardando Mapa...</Text>;

  if (pickedLocation) {
    locationPreview = (
      <Image
        style={styles.map}
        source={{
          uri: getMapPreview(
            pickedLocation.latitude,
            pickedLocation.longitude,
            19
          ),
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
        >
          Localizar
        </OutLinedButton>
        <OutLinedButton
          style={styles.button}
          icon="map"
          color={Colors.primary400}
          size={28}
          onPress={pickOnMapHandler}
        >
          Escolher no Mapa
        </OutLinedButton>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  mapPreview: {
    flex: 1,
    width: "100%",
    height: 200,
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
    height: 200,
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
    width: "50%",
    justifyContent: "center",
    alignItems: "center",
    alignContent: "center",
  },
});

export default LocationPicker;
