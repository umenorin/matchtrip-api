import { Rating } from "../models/Rating.js";

class TravelDto {
  id?: string;
  name: string;
  latitude: number;
  longitude: number;
  city?: string;
  country: string;
  rating?: any;

  constructor({
    id,
    name,
    latitude,
    longitude,
    city,
    country,
    rating,
  }: {
    id?: string;
    name: string;
    latitude: number;
    longitude: number;
    city?: string;
    country: string;
    rating?: typeof Rating;
  }) {
    this.id = id;
    this.name = name;
    this.latitude = latitude;
    this.longitude = longitude;
    this.city = city;
    this.country = country;
    this.rating = rating ? rating : new Rating();
  }
}

export default TravelDto
