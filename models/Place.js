export class Place {
  constructor(description, imageUri, address, latitude, longitude, user, destination) {
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