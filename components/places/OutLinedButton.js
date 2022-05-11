import { Pressable, StyleSheet, Text, View } from "react-native";
import { Ionicons } from "@expo/vector-icons";
import { Colors, ColorsRed } from "../../constants/Colors";

function OutLinedButton({ icon, color, children, size, onPress }) {
  return (
    <Pressable
      style={(pressed) => [styles.button, pressed && styles.pressed]}
      onPress={onPress}
    >
      <Ionicons style={styles.icon} name={icon} size={size} color={color} />
      <Text style={styles.text}>{children}</Text>
    </Pressable>
  );
}

const styles = StyleSheet.create({
  button: {
    opacity: 1,
    paddingHorizontal: 3,
    paddingVertical: 6,
    marginHorizontal: 0,
    marginVertical: 8,
    flexDirection: "row",
    justifyContent: "center",
    alignitems: "center",
    borderWidth: 1,
    borderRadius: 40,
    borderColor: "#fff",
    backgroundColor: Colors.gray900,
  },
  pressed: {
    opacity: 0.3,
  },
  icon: {
    marginRight: 6,
  },
  text: {
    color: Colors.primary50,
  },
});

export default OutLinedButton;
