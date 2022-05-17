import {
  StyleSheet,
  ScrollView,
  Text,
  View,
  TextInput,
  TouchableOpacity,
} from "react-native";
import { useState, useCallback } from "react";
import { Colors } from "../../constants/Colors";
import ImagePickerCam from "./ImagePickerCam";
import LocationPicker from "./LocationPicker";
import Button  from "./UI/Button";

function PlaceForm() {
  const [enteredDescription, setEnteredDescription] = useState("");
  const [pickedLocation, setPickedLocation] = useState({});
  const [takenImage, setTakenImage] = useState({});

  function changeDescriptiontHandler(enteredText) {
    setEnteredDescription(enteredText);
  }

  function onTakenImageHandler (image) { 
    setTakenImage(image);
  }
     
  const onPickedLocationHandler = useCallback( (pickedLocation)  => {
    setPickedLocation(pickedLocation);
  }, []);
 
  function savePlaceHandler(){
    console.log("---------------- ", new Date().getTime());
    console.log("descricao", enteredDescription);
    console.log("endereço", pickedLocation);
    console.log("imagem", takenImage);
  }    
  
  return (
    <ScrollView style={styles.form}>
      <ImagePickerCam onTakenImage={onTakenImageHandler}/>   
      <LocationPicker onPickedLocation={onPickedLocationHandler}/>
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
    marginBottom:18,
  },
  butonSave:{
    borderRadius: 10,
    opacity: 1,
    marginTop: 12,
  },
});

export default PlaceForm;
