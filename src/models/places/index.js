class Place {
  constructor(Id, name, image, address, latitude, longitude) {
    this.Id = Id.toString();
    this.name = name;
    this.image = image;
    this.address = address;
    this.latitude = latitude;
    this.longitude = longitude;
  }
}

export default Place;
