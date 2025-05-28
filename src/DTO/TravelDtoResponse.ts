import { Types } from "mongoose";
import CategoryDto from "./CategoryDto.js";
import TravelStatusEnum from "../Enums/TravelStatusEnum.js";

export default class TravelDtoResponse {
  id: string;
  name: string;
  description: string;
  owner: {
    id: Types.ObjectId;
    name: string;
  };
  country: string;
  city: string;
  status: TravelStatusEnum;
  startDate?: Date;
  endDate?: Date;
  limitTravelers?: number;
  rating?: {
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
  travalers?: string[];
  createdAt?: Date;
  updatedAt?: Date;
  imageTravel?: any;
  categories?: CategoryDto[];
  constructor({
    id,
    name,
    owner,
    description,
    country,
    city,
    status,
    startDate,
    endDate,
    limitTravelers,
    rating,
    chat,
    createdAt,
    updatedAt,
    travalers,
    imageTravel,
    categories,
  }: {
    id: string;
    name: string;
    owner: {
      id: Types.ObjectId;
      name: string;
    };
    description: string;
    country: string;
    city: string;
    status: TravelStatusEnum;
    startDate?: Date;
    endDate?: Date;
    limitTravelers?: number;
    rating?: {
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
    travalers?: string[];
    createdAt?: Date;
    updatedAt?: Date;
    imageTravel?: any;

    categories?: CategoryDto[];
  }) {
    this.owner = owner;
    this.id = id;
    this.name = name;
    this.status = status;
    this.description = description;
    this.country = country;
    this.city = city;
    this.startDate = startDate;
    this.endDate = endDate;
    this.limitTravelers = limitTravelers;
    this.rating = rating;
    this.chat = chat;
    this.createdAt = createdAt;
    this.updatedAt = updatedAt;
    this.travalers = travalers;
    this.imageTravel = imageTravel;
    this.categories = categories;
  }
}
