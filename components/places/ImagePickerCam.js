import { launchCameraAsync } from "expo-image-picker";
import { View, Text, Image, StyleSheet } from "react-native";
import { useState } from "react";
import OutLinedButton from "./OutLinedButton";
import { Colors } from "../../constants/Colors";

function ImagePickerCam() {
  const [image, setImage] = useState(null);

  async function takeImageHandler() {
    const image = await launchCameraAsync({
      allawEditing: true,
      aspect: [4, 3],
      quality: 1,
    });
    console.log(image);
    setImage(image);
  }

  let imagePreview = <Text style={styles.text}>Nenhuma Imagem Ainda</Text>;

  if (image) {
    imagePreview = <Image source={{ uri: image.uri }} style={styles.image} />;
  }
  return (
    <View>
      <View style={styles.imagePrev}>{imagePreview}</View>
      <OutLinedButton
        icon="camera"
        color="white"
        size={30}
        title="Foto"
        onPress={takeImageHandler}
      ></OutLinedButton>
    </View>
  );
}

const styles = StyleSheet.create({
  imagePrev: {
    width: "100%",
    height: 500,
    marginVertical: 4,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: Colors.gray300,
    borderRadius: 10,
  },
  image: {
    width: "100%",
    height: "100%",
    borderRadius: 10,
  },
  text:{
      fontSize: 18,
      fontWeight: 'bold'
  },

});

export default ImagePickerCam;
