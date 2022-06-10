import PlaceForm from "../components/places/PlaceForm";
import ExplorerScreen2 from "./ExplorerScreen2";
import { insertPlaceSql } from "../util/database";

function AddPlace({ navigation }) {

  async function createPlaceHandler(place) {
    await insertPlaceSql(place);

    // navigation.navigate("AllPlaces");
    navigation.navigate("Explorer2");
  }

  return <PlaceForm onCreatePlace={createPlaceHandler} />;
}


export default AddPlace;


