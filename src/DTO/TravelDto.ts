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

class TravelDtoResponse {
  id: string;
  name: string;
  description: string;
  owner: {
    id: Types.ObjectId;
    name: string;
  };
  country: string;
  city: string;
  latitude?: number;
  longitude?: number;
  startDate?: Date;
  endDate?: Date;
  limitTravelers?: number;
  rating: {
    id: Types.ObjectId;
    averageScore?: number;
    userRatings?: Array<{
      userId: string;
      score: number;
    }>;
  };
  chat: {
    id: Types.ObjectId;
    messageCount?: number;
  };
  createdAt: Date;
  updatedAt: Date;

  constructor({
    id,
    name,
    owner,
    description,
    country,
    city,
    latitude,
    longitude,
    startDate,
    endDate,
    limitTravelers,
    rating,
    chat,
    createdAt,
    updatedAt,
  }: {
    id: string;
    name: string;
    owner: {
      id: Types.ObjectId;
      name:string
    };
    description: string;
    country: string;
    city: string;
    latitude?: number;
    longitude?: number;
    startDate?: Date;
    endDate?: Date;
    limitTravelers?: number;
    rating: {
      id: Types.ObjectId;
      averageScore?: number;
      userRatings?: Array<{
        userId: string;
        score: number;
      }>;
    };
    chat: {
      id: Types.ObjectId;
      messageCount?: number;
    };
    createdAt: Date;
    updatedAt: Date;
  }) {
    this.owner = owner;
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
    this.rating = rating;
    this.chat = chat;
    this.createdAt = createdAt;
    this.updatedAt = updatedAt;
  }
}
export { TravelDtoRequest, TravelDtoResponse };
