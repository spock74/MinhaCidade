import { StyleSheet, Text, View } from "react-native";

//temp
import axios from "axios";
import { useEffect, useState, useContext } from "react";
import { AuthContext } from "../../store/auth-context";

function WelcomeScreen() {
  const authCtx = useContext(AuthContext);
  const email = authCtx.email;
  //const [user, setUser] = useState("");
  // useEffect(() => {
  //   axios
  //     .get(
  //       "https://st11-3f424-default-rtdb.firebaseio.com/mensagem.json?auth=" +
  //         token
  //     ) 
  //     .then((response) => {
  //       console.log * ("respots>>>> ", response.data);
  //       setText(response.data);
  //     });
  // }, [token]);


  return (
    <View style={styles.rootContainer}>
      <Text style={styles.title}>Bem-vindo {email}</Text>
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