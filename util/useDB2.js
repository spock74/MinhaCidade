import { db2 } from "./database";

export function getAllPlacesDB2() {
  db2
    .allDocs({ include_docs: true })
    .then((result) => {
      // setLoadedPlaces(result.rows.map((row) => row.doc));
      let markers_ = [];
      result.rows.map((place, kk) => {
        // console.log("result db2 allDocs kk place: " + kk, place);
        let m_ = {};
        m_.title = place.doc.description;
        m_.description = place.doc.description;
        m_.image = place.doc.image;
        m_.rating = Number(place.doc.rating);
        m_.reviews = Number(place.doc.reviews);
        m_.address = place.doc.address;
        m_.timestamp = place.doc.timestamp;
        m_.user = place.doc.user;
        m_.destination = place.doc.destination;
        m_.date = place.doc.date;
        m_.coordinate = {
          latitude: Number(place.doc.latitude),
          longitude: Number(place.doc.longitude),
        };
        markers_.push(m_);
      });
      return markers_;
    })
    .catch((err) => {
      console.log("err db2 allDocs: ", err);
    });
}
