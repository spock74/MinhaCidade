export class Place {
  constructor(idNname, user, description, imageUri, address, latitude, longitude, destination) {
    this.idNname = idNname || "__";
    this.user = user;
    this.description = description;
    this.imageUri = imageUri;
    this.address = address;
    this.latitude = latitude;
    this.longitude = longitude;
    this.destination = destination;
    this.timestamp = new Date().getTime().toString();
    this.date = new Date().toISOString();
  }
}