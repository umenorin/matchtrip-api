import { Types } from "mongoose";

class TravelDtoRequest {
  id?: string;
  name: string;
  description: string;
  country: string;
  city: string;
  latitude?: number;
  longitude?: number;
  startDate?: Date;
  endDate?: Date;
  owner?: string;
  limitTravelers?: number;
  ratingId?: Types.ObjectId;
  chatId?: Types.ObjectId;

  constructor({
    id,
    name,
    description,
    owner,
    country,
    city,
    latitude,
    longitude,
    startDate,
    endDate,
    limitTravelers,
    ratingId,
    chatId,
  }: {
    id?: string;
    name: string;
    description: string;
    country: string;
    city: string;
    latitude?: number;
    longitude?: number;
    startDate?: Date;
    endDate?: Date;
    limitTravelers?: number;
    owner?: string;
    ratingId?: Types.ObjectId;
    chatId?: Types.ObjectId;
  }) {
    this.id = id;
    this.name = name;
    this.description = description;
    this.country = country;
    this.city = city;
    this.latitude = latitude;
    this.longitude = longitude;
    this.startDate = startDate;
    this.endDate = endDate;
    this.limitTravelers = limitTravelers;
    this.owner = owner;
    this.ratingId = ratingId;
    this.chatId = chatId;
  }
}


export default TravelDtoRequest;
