import { Image, Pressable, View, StyleSheet, Text } from "react-native";

function PlaceItem({ place, onSelect }) {
  return (
    <Pressable onPress={onSelect}>
      <Image source={{ uri: place.image.uri }} />
      <View>
        <Text style={{color:"white"}}>{place.description}</Text>
        <Text style={{color:"white"}}>{place.location.address}</Text>
        <Text style={{color:"white"}}>{place.image.uri}</Text>
      </View>
    </Pressable>
  );
}

const styles = StyleSheet.create({});

export default PlaceItem;
