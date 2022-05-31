import { StyleSheet, Text, View } from "react-native";

//temp
import { useEffect, useState } from "react";

function WelcomeScreen() {

  // const [user, setUser] = useState();
  // useEffect(() => {
  //   AsyncStorage.getItem("em_st11").then((value) => {
  //     setUser(value);
  //   });
  // }, [])

  return (
    <View style={styles.rootContainer}>
      <Text style={styles.title}>Bem-vindo {"--"}</Text>
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