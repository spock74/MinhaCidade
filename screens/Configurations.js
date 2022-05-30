import { View, Text, StyleSheet } from "react-native";
import { Colors } from "../constants/Colors";

function Configurations() {
  rerturn(
    <View styles={styles.constainer}>
      <Text styles={styles.text}>Configurações</Text>
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
