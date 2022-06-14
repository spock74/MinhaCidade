import { useEffect, useState } from "react";
import { useIsFocused } from "@react-navigation/native";
import PlacesList from "../components/places/PlacesList";
import { db2 } from "../util/database";

function AllPlaces({ route }) {
  const [loadedPlaces, setLoadedPlaces] = useState([]);
  const isFocused = useIsFocused();

  useEffect(() => {
    if (isFocused) {
      db2
        .allDocs({ include_docs: true })
        .then((result) => {
          // console.log("result db2 allDocs: ", result);
          setLoadedPlaces(result.rows.map((row) => row.doc));
          // console.log(">>>>>> do explorer 1 --- ", loadedPlaces);
        })
        .catch((err) => {
          console.log("err db2 allDocs: ", err);
        });
    }
  }, [isFocused]);

  return <PlacesList places={loadedPlaces} />;
}

export default AllPlaces;
