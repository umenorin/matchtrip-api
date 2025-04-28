import { Types } from "mongoose";

class TravelDtoRequest {
  id?: string;
  name: string;
  latitude: number;
  longitude: number;
  city?: string;
  country: string;
  ratingId?: Types.ObjectId; // Para requests de atualização

  constructor({
    id,
    name,
    latitude,
    longitude,
    city,
    country,
    ratingId,
  }: {
    id?: string;
    name: string;
    latitude: number;
    longitude: number;
    city?: string;
    country: string;
    ratingId?: Types.ObjectId;
  }) {
    this.id = id;
    this.name = name;
    this.latitude = latitude;
    this.longitude = longitude;
    this.city = city;
    this.country = country;
    this.ratingId = ratingId;
  }
}

class TravelDtoResponse {
  id: string;
  name: string;
  latitude: number;
  longitude: number;
  city?: string;
  country: string;
  rating: {
    id: Types.ObjectId;
    averageScore?: number;
    userRatings?: Array<{
      userId: string;
      score: number;
    }>;
  };

  constructor({
    id,
    name,
    latitude,
    longitude,
    city,
    country,
    rating,
  }: {
    id: string;
    name: string;
    latitude: number;
    longitude: number;
    city?: string;
    country: string;
    rating: {
      id: Types.ObjectId;
      averageScore?: number;
      userRatings?: Array<{
        userId: string;
        score: number;
      }>;
    };
  }) {
    this.id = id;
    this.name = name;
    this.latitude = latitude;
    this.longitude = longitude;
    this.city = city;
    this.country = country;
    this.rating = rating;
  }
}

export { TravelDtoRequest, TravelDtoResponse };
