import PlaceForm from "../components/places/PlaceForm";
import { insertPlaceSql } from "../util/database";

function AddPlace({ navigation }) {

  async function createPlaceHandler(place) {
    await insertPlaceSql(place);

    navigation.navigate("AllPlaces");
  }

  return <PlaceForm onCreatePlace={createPlaceHandler} />;
}


export default AddPlace;


