import { View, Text, StyleSheet, Button } from "react-native";
import { Colors } from "../constants/Colors";
import { deleteTablePlaceSql } from "../util/database";

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

  return (
    <View style={styles.constainer}>
      <Button title="Delete Places" onPress={deletePlacesHandler} />
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
