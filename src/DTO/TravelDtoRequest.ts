import { Rating } from "../models/Rating.js";

class TravelDtoRequest {
  id?: string;
  name: string;
  latitude: string;
  longitude?: number;
  city?: number;
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
    latitude: string;
    longitude?: number;
    city?: number;
    country: string;
    rating?: typeof Rating;
  }) {
    this.id = id;
    this.name = name;
    this.latitude = latitude;
    this.longitude = longitude;
    this.city = city;
    this.country = country;
    this.rating = rating ? new Rating() : undefined;
  }
}

export default TravelDtoRequest
