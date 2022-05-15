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
      <View>
        <Text style={styles.label}>Descrição</Text>
        <TextInput
          style={styles.input}
          onChangeText={changeTitletHandler}
          value={enteredTitle}
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
