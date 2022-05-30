export class Place {
  constructor(idNname, description, imageUri, address, latitude, longitude, user, destination) {
    this.idNname = idNname || "__";
    this.description = description;
    this.imageUri = imageUri;
    this.address = address;
    this.latitude = latitude;
    this.longitude = longitude;
    this.user = user;
    this.destination = destination;
    this.timestamp = new Date().getTime().toString();
    this.date = new Date().toISOString();
  }
}