import { Button } from "native-base";

import { StyleSheet, ScrollView, Text, View, TextInput } from "react-native";
import axios from "axios";

import PouchDB from "pouchdb-react-native";
import { db2 } from "../../util/database";

import AsyncStorage from "@react-native-async-storage/async-storage";
import { useState, useCallback } from "react";
import { Colors } from "../../constants/Colors";
import { Place } from "../../models/Place";
import ImagePickerCam from "./ImagePickerCam";
import LocationPicker from "./LocationPicker";
// import Button from "./UI/Button";

function PlaceForm({ onCreatePlace }) {
  const [enteredDescription, setEnteredDescription] = useState("");
  const [pickedLocation, setPickedLocation] = useState({});
  const [takenImage, setTakenImage] = useState({});

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
    AsyncStorage.getItem("st_11_email").then((value) => {
      place.user = value;
      // console.log("----- place>>> -----", place);
      axios
        .post(
          "https://st11-3f424-default-rtdb.firebaseio.com/lugar.json",
          place
        )
        .then((response) => {
          // console.log(response.data.name);
          place.idName = response.data.name;
          onCreatePlace(place);
        });
    });
  }

  function savePlaceHandler() {
    const placeData = new Place(
      "Titulo",
      4,
      "user",
      13,
      enteredDescription,
      takenImage.uri,
      pickedLocation.address,
      pickedLocation.lat,
      pickedLocation.lon,
      "Destination",
      new Date().getTime().toString(),
      new Date().toISOString()
    );

    onCreatePlaceSavePlaceInBackEnd(placeData);
  }

  return (
    <ScrollView style={styles.form}>
      <LocationPicker onPickedLocation={onPickedLocationHandler} />
      <ImagePickerCam onTakenImage={onTakenImageHandler} />
      <View>
        <Text style={styles.label}>Descrição</Text>
        <TextInput
          style={styles.input}
          onChangeText={changeDescriptiontHandler}
          value={enteredDescription}
        />
      </View>
      <Button onPress={savePlaceHandler}>Salvar</Button>
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
