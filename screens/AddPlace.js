import PlaceForm from "../components/places/PlaceForm";

function AddPlace({navigation}) {
  function createPlaceHandler(data) {
    console.log("data", data);
  }
  
  
  return <PlaceForm />;
}

export default AddPlace;


 