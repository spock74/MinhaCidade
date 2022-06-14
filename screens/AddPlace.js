import { Alert } from "react-native";
import PlaceForm from "../components/places/PlaceForm";
import { insertPlaceSql } from "../util/database";
import { db2 } from "../util/database";

function AddPlace({ navigation }) {
  async function createPlaceHandler(place) {
    place._id = place.timestamp;
    db2
      .put(place)
      .then(function (response) {
        console.log("place salvo em DB2", response);
      })
      .catch((err) => {
        console.log("Erro ao salvar DB2", err);
        Alert.alert("Erro", "Erro ao salvar DB2", err);
      });

    // navigation.navigate("AllPlaces");
    navigation.navigate("Explorer");
  }

  return <PlaceForm onCreatePlace={createPlaceHandler} />;
}

export default AddPlace;
