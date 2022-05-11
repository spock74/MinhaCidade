class Place {
    constructor(title, imageUri, address, location) {
        this.title = title;
        this.imageUri = imageUri;
        this.address = address;
        this.location = location;
        id = new Date().getTime().toString()+Math.random().toString();
    }
}