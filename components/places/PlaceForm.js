import { StyleSheet, ScrollView, Text, View, TextInput } from "react-native";
import axios from "axios";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { useState, useCallback, useContext } from "react";
import { Colors } from "../../constants/Colors";
import { Place } from "../../models/Place";
import ImagePickerCam from "./ImagePickerCam";
import LocationPicker from "./LocationPicker";
import Button from "./UI/Button";
import { AuthContext } from "../../store/auth-context";

function PlaceForm({ onCreatePlace }) {
  const [enteredDescription, setEnteredDescription] = useState("");
  const [pickedLocation, setPickedLocation] = useState({});
  const [takenImage, setTakenImage] = useState({});

  const AuthCtx = useContext(AuthContext);
  const [email, setEmail] = useState(AuthCtx.email);

  function changeDescriptiontHandler(enteredText) {
    setEnteredDescription(enteredText);
  }

  function onTakenImageHandler(image) {
    setTakenImage(image);
  }

  const onPickedLocationHandler = useCallback((pickedLocation) => {
    setPickedLocation(pickedLocation);
  }, []);

  function onCreatePlaceSavePlaceInBackEnd(place) {
    AsyncStorage.getItem("em_st11").then((value) => {
      const place_ = { ...place, idName: "--", user: value };
      axios
      .post(
        "https://st11-3f424-default-rtdb.firebaseio.com/lugar.json",
        place_
        )
        .then((response) => {
          onCreatePlace(place_);
        });
    });
  }

  // export class Place {
  //   constructor(idName, description, imageUri, address, latitude, longitude, user, destination) {
  //     this.idName = "--";
  //     this.user = user;
  //     this.description = description;
  //     this.imageUri = imageUri;
  //     this.address = address;
  //     this.latitude = latitude;
  //     this.longitude = longitude;
  //     this.destination = "--";
  //     this.timestamp = new Date().getTime().toString();
  //     this.date = new Date().toISOString();
  //   }
  // }

  function savePlaceHandler() {
    const placeData = new Place(
      "",
      "",
      enteredDescription,
      takenImage.uri,
      pickedLocation.address,
      pickedLocation.lat,
      pickedLocation.lon,
      "--",
    );

    // console.log(
    //   " NA FUNCAO savePlaceHandler ",
    //   "****************************************"
    // );
    // onCreatePlace(placeData);

    onCreatePlaceSavePlaceInBackEnd(placeData);
  }

  return (
    <ScrollView style={styles.form}>
      <ImagePickerCam onTakenImage={onTakenImageHandler} />
      <LocationPicker onPickedLocation={onPickedLocationHandler} />
      <View>
        <Text style={styles.label}>Descrição</Text>
        <TextInput
          style={styles.input}
          onChangeText={changeDescriptiontHandler}
          value={enteredDescription}
        />
      </View>
      <Button style={styles.butonSave} onPress={savePlaceHandler}>
        Salvar
      </Button>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  form: {
    flex: 1,
    padding: 12,
  },
  label: {
    fontWeight: "bold",
    marginBottom: 0,
    marginTop: 0,
    fontSize: 18,
    marginBottom: 4,
    color: Colors.primary800,
    alignContent: "center",
    alignItems: "center",
    justifyContent: "center",
  },
  input: {
    marginVertical: 0,
    paddingHorizontal: 2,
    paddingVertical: 8,
    fontSize: 18,
    color: Colors.gray900,
    borderBottomWidth: 2,
    borderBottomColor: Colors.primary200,
    backgroundColor: Colors.primary100,
    borderRadius: 10,
    marginBottom: 18,
  },
  butonSave: {
    borderRadius: 10,
    opacity: 1,
    marginTop: 12,
    backgroundColor: "red",
  },
});

export default PlaceForm;
