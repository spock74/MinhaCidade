import { StyleSheet, Pressable, Text, View } from "react-native";
import { Ionicons } from "@expo/vector-icons";

function IconButton({ icon, size, color, onPress }) {
  return (
    <View style={styles.container}>
      <Pressable
        styles={({ pressed }) => [styles.button, pressed && styles.pressed]}
        onPress={onPress}
      >
        <Ionicons name={icon} size={size} color={color} />
      </Pressable>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {

  },
  button: {
    padding: 10,
    margin: 5,
    justifyContent: "center",
    alignItems: "center",
  },
  pressed: {
    opacity: 0.3,
  },
});

export default IconButton;
