import {
  StyleSheet,
  ScrollView,
  Text,
  View,
  TextInput,
  TouchableOpacity,
} from "react-native";
import axios from "axios";
import { useState, useCallback } from "react";
import { Colors } from "../../constants/Colors";
import { Place } from "../../models/Place";
import ImagePickerCam from "./ImagePickerCam";
import LocationPicker from "./LocationPicker";
import Button from "./UI/Button";

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

  function onCreatePlace(place) {
    console.log("place", place);
    axios.post("https://st11-3f424-default-rtdb.firebaseio.com/lugar.json", place);
  }

  function savePlaceHandler() {
    const ts = new Date().getTime().toString();
    const quando = new Date().toISOString();

    const placeData = new Place(
      enteredDescription,
      takenImage,
      pickedLocation,
      "user123",
      "Destino: TODO"
    );
  
    onCreatePlace(placeData);
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
    color: Colors.primary50,
  },
  input: {
    marginVertical: 0,
    paddingHorizontal: 2,
    paddingVertical: 8,
    fontSize: 18,
    color: Colors.gray900,
    borderBottomWidth: 4,
    borderBottomColor: Colors.primary800,
    backgroundColor: Colors.gray400,
    borderRadius: 10,
    marginBottom: 18,
  },
  butonSave: {
    borderRadius: 10,
    opacity: 1,
    marginTop: 12,
  },
});

export default PlaceForm;
