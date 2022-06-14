import PlaceForm from "../components/places/PlaceForm";
import { insertPlaceSql } from "../util/database";
import { db2 } from "../util/database";

function AddPlace({ navigation }) {
  async function createPlaceHandler(place) {
    console.log("place indise function AddPlace({ navigation }): ", place);
    // insertPlaceSql(place)
    //   .then((R) => {
    //     console.log("", R);
    //   })
    //   .catch((err) => {
    //     console.log(err);
    //   });

    place._id = place.timestamp;
    db2
      .put(place)
      .then(function (response) {
        console.log("resposta db2", response);
      })
      .catch((err) => {
        console.log("bd2 ======", err);
      });

    navigation.navigate("AllPlaces");
    // navigation.navigate("Explore");
  }

  return <PlaceForm onCreatePlace={createPlaceHandler} />;
}

export default AddPlace;
