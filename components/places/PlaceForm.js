import {
  StyleSheet,
  ScrollView,
  Text,
  View,
  Button,
  TextInput,
  FlatList,
  TouchableOpacity,
} from "react-native";
import { useState } from "react";
import { Colors } from "../../constants/Colors";
import ImagePickerCam from "./ImagePickerCam";

function PlaceForm() {
  const [enteredTitle, setEnteredTitle] = useState("");

  function changeTitletHandler(enteredText) {
    setEnteredTitle(enteredTitle);
  }

  return (
    <ScrollView style={styles.form}>
      <View>
        <Text style={styles.label}>Nome</Text>
        <TextInput
          style={styles.input}
          onChangeText={changeTitletHandler}
          value={enteredTitle}
        />
      </View>
      <ImagePickerCam />   
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  form: {
    flex: 1,
    padding: 24,
  },
  label: {
    fontWeight: "bold",
    marginBottom: 4,
    fontSize: 18,
    color: Colors.primary50,
  },
  input: {
    marginVertical: 8,
    paddingHorizontal: 2,
    paddingVertical: 8,
    fontSize: 18,
    color: Colors.gray900,
    borderBottomWidth: 4,
    backgroundColor: Colors.gray300,
    borderRadius: 10,
  },
});

export default PlaceForm;
