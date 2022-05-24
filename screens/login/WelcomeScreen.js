import { StyleSheet, Text, View } from "react-native";

//temp
import axios from "axios";
import { useEffect, useState, useContext } from "react";
import { AuthContext } from "../../store/auth-context";

function WelcomeScreen() {
  const authCtx = useContext(AuthContext);
  const token = authCtx.token;
  const [user, setUser] = useState("");
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



  useEffect(() => {
    async function getToken() {
      const storedToken = await AsyncStorage.getItem("authToken_st11");
      if (storedToken) {
        authCtx.Authenticate(storedToken);
      }
      setUser(false);
    }

    getToken();
  }, [token]);





  return (
    <View style={styles.rootContainer}>
      <Text style={styles.title}>Welcome {user}</Text>
      <Text>You authenticated successfully!</Text>
    </View>
  );
}

export default WelcomeScreen;

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
