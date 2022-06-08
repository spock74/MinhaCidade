import { StyleSheet, Text, View } from "react-native";
import AsyncStorage from "@react-native-async-storage/async-storage";

//temp
import { useEffect, useState } from "react";

function WelcomeScreen() {

  const [email, setEmail] = useState();
  useEffect(() => {
    AsyncStorage.getItem("em_st11").then((value) => {
      setEmail(value);
    });
  }, [])

  return (
    <View style={styles.rootContainer}>
      <Text style={styles.title}>Bem-vindo {email || "--"}</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  rootContainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    padding: 32,
  },
  title: {
    fontSize: 20,
    fontWeight: "bold",
    marginBottom: 8,
  },
});

export default WelcomeScreen;