import {
  Alert,
  Image,
  Pressable,
  View,
  ScrollView,
  StyleSheet,
  Text,
} from "react-native";


import { getMapPreview } from "../../geoloc/getMapPreview";
import { INITIAL_ZOOM_PREVIEW } from "../../geoloc/geoconfig";

function PlaceItem({ place, onSelect }) {
  function f() {
    Alert.alert("Deixa de ser preguiçoso!");
  }

  
  return (
    <ScrollView>
      <View style={styles.container}>
        <View style={styles.viewLinhaImagem}>
          <Pressable onPress={f}>
            <Image style={styles.imageCam} source={{ uri: place.image.uri }} />
          </Pressable>
          <Pressable>
            <Image
              style={styles.miniMap}
              source={{
                uri: getMapPreview(
                  place.location.lat,
                  place.location.lon,
                  INITIAL_ZOOM_PREVIEW
                ),
              }}
            />
          </Pressable>
        </View>
        <View style={styles.viewLinhaText}>
          <Text style={{ color: "white" }}>
            Endereço: {place.location.address}
          </Text>
          <Text style={{ color: "white" }}>
            Data de Criação: {new Date(place.date).toLocaleDateString()}{" "}
            {new Date(place.date).toLocaleTimeString()}
          </Text>
          <Text style={{ color: "white" }}>
            Drescrição: {place.description}
          </Text>
          <Text style={{ color: "white" }}> </Text>
          <Text style={{ color: "white" }}>Latitude: {place.location.lat}</Text>
          <Text style={{ color: "white" }}>
            Longitude: {place.location.lon}
          </Text>
        </View>
      </View>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    margin: 4,
    backgroundColor: "#004d40",
    borderRadius: 10,
    borderColor: "#388e3c",
    borderWidth: 1,
  },
  viewLinhaImagem: {
    flexDirection: "column",
    alignItems: "center",
    alignContent: "center",
    justifyContent: "center",
    overflow: "hidden",

    borderRadius: 10,

    overflow: "hidden",
  },

  imageCam: {
    width: 360,
    height: 250,
    borderRadius: 10,
  },

  miniMap: {
    width: 360,
    height: 250,
    borderRadius: 10,
    overflow: "hidden",
  },

  viewLinhaText: {
    width: 360,

    backgroundColor: "#004d40",
    borderRadius: 10,
    color: "white",
    marginTop: 2,
    marginBottom: 4,
    marginHorizontal: 4,
    padding: 4,
  },

  pressed: {},
  info: {},
  description: {},
  address: {},
  coords: {},
});

export default PlaceItem;
