export class Place {
  constructor(description, image, location, user, destination) {
    this.description = description;
    this.image = image;
    this.location = location;
    this.user = user;
    this.destination = destination;
    this.timestamp = new Date().getTime().toString();
    this.date = new Date().toISOString();
  }
}