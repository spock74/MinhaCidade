import {
  StyleSheet,
  ScrollView,
  Text,
  View,
  TextInput,
  TouchableOpacity,
} from "react-native";
import { useState } from "react";
import { Colors } from "../../constants/Colors";
import ImagePickerCam from "./ImagePickerCam";
import LocationPicker from "./LocationPicker";
import Button  from "./UI/Button";

function PlaceForm() {
  const [enteredTitle, setEnteredTitle] = useState("");

  function changeTitletHandler(enteredText) {
    setEnteredTitle(enteredText);
  }

  function savePlaceHandler(){
    console.log("f");
  }  
 
  return (
    <ScrollView style={styles.form}>
      <ImagePickerCam />   
      <LocationPicker />
      <Button onPress={savePlaceHandler}>Salvar</Button>
      <View>
        <Text style={styles.label}>Nome</Text>
        <TextInput
          style={styles.input}
          onChangeText={changeTitletHandler}
          value={enteredTitle}
        />
      </View>
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
    marginTop: 12,
    fontSize: 18,
    color: Colors.primary50,
  },
  input: {
    marginVertical: 4,
    paddingHorizontal: 2,
    paddingVertical: 8,
    fontSize: 18,
    color: Colors.gray900,
    borderBottomWidth: 4,
    borderBottomColor: Colors.primary800,
    backgroundColor: Colors.gray400,
    borderRadius: 10,
  },
  butonSave:{
    borderRadius: 10,
    opacity: 1,
  },
});

export default PlaceForm;
