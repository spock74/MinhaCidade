import { View, Text, StyleSheet, Button } from "react-native";
import { Colors } from "../constants/Colors";
import { deleteTablePlaceSql } from "../util/database";
import AsyncStorage from "@react-native-async-storage/async-storage";

function Configurations() {

  deletePlacesHandler = () => {
    const deleteTablePlace = async () => {
      try {
        await deleteTablePlaceSql();
        console.log("deletou tabela");
      } catch (error) {
        console.log(error);
      }
    };
    deleteTablePlace();
  };

  deleteAsyncStorageHandler = async () => {
    try {
      await AsyncStorage.clear()
    } catch(e) {
      console.log('ERRO clear deleteAsyncStorageHandler', e)
      // clear error
    }
  
    console.log('Done clear deleteAsyncStorageHandler')
  }

  return (
    <View style={styles.constainer}>
      <Button title="Delete Places SQL" onPress={deletePlacesHandler} />
      <Button title="Delete AsyncStorage" onPress={deleteAsyncStorageHandler} />
    </View>
  );
}

const styles = StyleSheet.create({
  constainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  text: {
    fontSize: 20,
    fontWeight: "bold",
    color: Colors.primary800,
  },
});

export default Configurations;
