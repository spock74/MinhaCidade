export class Place {
  constructor(idName, user, description, imageUri, address, latitude, longitude, destination) {
    this.idName = idName || "__";
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