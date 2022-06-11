import PlaceForm from "../components/places/PlaceForm";
import ExplorerScreen from "./ExplorerScreen";
import { insertPlaceSql } from "../util/database";

function AddPlace({ navigation }) {
  async function createPlaceHandler(place) {
    await insertPlaceSql(place);

    // navigation.navigate("AllPlaces");
    navigation.navigate("Welcome");
  }

  return <PlaceForm onCreatePlace={createPlaceHandler} />;
}

export default AddPlace;
