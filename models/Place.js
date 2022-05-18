export class Place {
  constructor(id, description, image, location, user, destination) {
    this.id = id,
    this.description = description;
    this.image = image;
    this.location = location;
    this.user = user;
    this.destination = destination;
    this.timestamp = new Date().getTime().toString();
    this.date = new Date().toISOString();
  }
}