export class Place {
  constructor(
    title,
    rating,
    user,
    reviews,
    description,
    image,
    address,
    latitude,
    longitude,
    destination
  ) {
    this.title = title;
    this.rating = rating;
    this.user = user;
    this.reviews = reviews;
    this.description = description;
    this.image = image;
    this.address = address;
    this.latitude = latitude;
    this.longitude = longitude;
    this.destination = destination;
    this.timestamp = new Date().getTime().toString();
    this.date = new Date().toISOString();
  }
}
