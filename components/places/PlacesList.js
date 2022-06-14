import { FlatList, StyleSheet, View, Text, Button, Alert } from "react-native";
import { Colors } from "../../constants/Colors";
import PlaceItem from "./PlaceItem";
import { useContext } from "react";
import { AuthContext } from "../../store/auth-context";

function PlacesList({ places }) {
  const AuthCtx = useContext(AuthContext);

  if (!places || places.length === 0) {
    return (
      <View style={styles.fallbackContainer}>
        <Text style={styles.fallBackText}>Nenhum Local ainda</Text>
      </View>
    );
  }

  Alert.alert("Numero de itens: ", places.length);

  return (
    <FlatList
      data={places}
      keyExtractor={(item) => item.timestamp}
      renderItem={({ item }) => <PlaceItem place={item} />}
    />
  );
}

const styles = StyleSheet.create({
  fallbackContainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  fallBackText: {
    fontSize: 20,
    fontWeight: "bold",
    color: Colors.primary800,
  },
});
export default PlacesList;
