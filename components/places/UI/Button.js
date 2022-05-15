import { Text, Pressable, StyleSheet } from "react-native";
import { Ionicons } from "@expo/vector-icons";
import { Colors } from "../../../constants/Colors";

function Button({ onPress, children }) {
  return (
    <Pressable
      style={(pressed) => [styles.button, pressed && styles.pressed]}
      onPress={onPress}
    >
      <Text style={styles.text}>{children}</Text>
    </Pressable>
  );
}

const styles = StyleSheet.create({
  button: {
    paddingHorizontal: 0,
    paddingVertical: 8,
    
    marginBottom: 8,
    height: 40,
    backgroundColor: Colors.primary800,
    elevation: 4,
    borderRadius: 4,
  },
  pressed: {
    opacity: 0.7,
  },
  text: {
    alignContent: "center",
    alignItems: "center",
    justifyContent: "center",
    textAlign: "center",
    fontSize: 16,
    color: Colors.primary50,
  },
});

export default Button;
