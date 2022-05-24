import {
  Alert,
  Image,
  Pressable,
  View,
  ScrollView,
  StyleSheet,
  Text,
} from "react-native";

import { Colors } from "../../constants/Colors";
import { ColorsRed } from "../../constants/Colors";

import { getMapPreview } from "../../geoloc/getMapPreview";
import { INITIAL_ZOOM_PREVIEW } from "../../geoloc/geoconfig";

function PlaceItem({ place, onSelect }) {
  function f() {
    Alert.alert("Deixa de ser preguiçoso!");
  }

  return (
    <ScrollView style={{ backgroundColor: "white" }}>
      <View style={styles.headerInfo}>
        <Text style={{ color: "white" }}>Endereço: {place.address}</Text>
        <Text style={{ color: "white" }}>
          Data de Criação: {new Date(place.date).toLocaleDateString()}{" "}
          {new Date(place.date).toLocaleTimeString()}
        </Text>
        <Text style={{ color: "white" }}>Drescrição: {place.description}</Text>
        <Text style={{ color: "white" }}>Usuário: {place.user} </Text>
        <Text style={{ color: "white" }}>Latitude: {place.latitude}</Text>
        <Text style={{ color: "white" }}>Longitude: {place.longitude}</Text>
      </View>

      <View style={styles.container}>
        <View style={styles.viewLinhaImagem}>
          <ScrollView horizontal={true}>
            <Pressable onPress={f}>
              <Image style={styles.imageCam} source={{ uri: place.imageUri }} />
            </Pressable>
            <Pressable style={styles.imageCam} onPress={f}>
              <Image style={styles.imageCam} source={{ uri: place.imageUri }} />
            </Pressable>
            <Pressable style={styles.imageCam} onPress={f}>
              <Image style={styles.imageCam} source={{ uri: place.imageUri }} />
            </Pressable>
            <Pressable style={styles.imageCam} onPress={f}>
              <Image style={styles.imageCam} source={{ uri: place.imageUri }} />
            </Pressable>
          </ScrollView>
          <ScrollView horizontal={true}>
            <Pressable>
              <Image
                style={styles.miniMap}
                source={{
                  uri: getMapPreview(
                    place.latitude,
                    place.longitude,
                    INITIAL_ZOOM_PREVIEW
                  ),
                }}
              />
            </Pressable>
            <Pressable onPress={f}>
              <Text style={styles.imageCam}>1</Text>
            </Pressable>
            <Pressable onPress={f}>
              <Text style={styles.imageCam}>2</Text>
            </Pressable>
            <Pressable onPress={f}>
              <Text style={styles.imageCam}>3</Text>
            </Pressable>
          </ScrollView>
        </View>
      </View>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    marginRight: 4,
    marginLeft: 4,
    marginTop: 0,
    backgroundColor: "white",
    borderRadius: 10,
    borderWidth: 0,
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
    margin: 6,
    width: 360,
    height: 250,
    borderRadius: 10,
    alignItems: "center",
    alignContent: "center",
    justifyContent: "center",
  },

  miniMap: {
    width: 360,
    height: 250,
    margin: 4,
    borderRadius: 10,
    overflow: "hidden",
    borderWidth: 1,
    borderColor: "#CCC",
  },

  headerInfo: {
    backgroundColor: ColorsRed.primary700,
    borderRadius: 10,
    color: "white",
    marginTop: 12,
    marginHorizontal: 6,
    marginBottom: 4,
    padding: 6,
    elevation: 4,
  },

  pressed: {},
  info: {},
  description: {},
  address: {},
  coords: {},
});

export default PlaceItem;
