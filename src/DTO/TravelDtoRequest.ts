import { Types } from "mongoose";

class TravelDtoRequest {
  id?: string;
  name: string;
  description: string;
  country: string;
  city: string;
  startDate?: Date;
  endDate?: Date;
  owner?: string;
  limitTravelers?: number;
  ratingId?: Types.ObjectId;
  chatId?: Types.ObjectId;
  imageTravel: any;
  constructor({
    id,
    name,
    description,
    owner,
    country,
    city,
    startDate,
    endDate,
    limitTravelers,
    ratingId,
    chatId,
    imageTravel,
  }: {
    id?: string;
    name: string;
    description: string;
    country: string;
    city: string;
    startDate?: Date;
    endDate?: Date;
    limitTravelers?: number;
    owner?: string;
    ratingId?: Types.ObjectId;
    chatId?: Types.ObjectId;
    imageTravel?: any;
  }) {
    this.id = id;
    this.name = name;
    this.description = description;
    this.country = country;
    this.city = city;
    this.startDate = startDate;
    this.endDate = endDate;
    this.limitTravelers = limitTravelers;
    this.owner = owner;
    this.ratingId = ratingId;
    this.chatId = chatId;
    this.imageTravel = imageTravel;
  }
}

export default TravelDtoRequest;
