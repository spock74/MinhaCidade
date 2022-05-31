import { View, Text, StyleSheet, Button } from "react-native";
import { Colors } from "../constants/Colors";
import { deleteTablePlaceSql } from "../util/database";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { getAllLocations } from "../util/database";

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


  function getAllLocationsHandler(){
    getAllLocations().then((locs) => {
      console.log("ffffff", locs);
    });
  }

  return (
    <View style={styles.constainer}>
      <Button style={styles.button} title="Delete Places SQL" onPress={deletePlacesHandler} />
      <Button style={styles.button} title="Delete AsyncStorage" onPress={deleteAsyncStorageHandler} />
      <Button style={styles.button} title="get all loc" onPress={getAllLocationsHandler} />
    </View>
  );
}

const styles = StyleSheet.create({
  constainer: {
    flex: 1,
  },
  text: {
    fontSize: 20,
    fontWeight: "bold",
    color: Colors.primary800,
  },
  button: {
    marginBottom: 10,
  },
});

export default Configurations;
