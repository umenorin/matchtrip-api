import { Travel } from "../models/Travel.js";
import { Rating } from "../models/Rating.js";
import  CategoryDto  from "./CategoryDto.js";
import TravelDtoResponse from "./TravelDtoResponse.js";

/*
    This class was create for send the informations the determinate user by frontend
*/
class UserDtoResponse {
  id: string;
  name: string;
  email: string;
  numberPhone: string;
  uniqueIdentification: string;
  age: number;
  nationality: string;
  gender: string;
  rating?: any;
  profileImage: any;
  categories?: CategoryDto[];
  travels?: TravelDtoResponse[];

  constructor({
    id,
    email,
    name,
    uniqueIdentification,
    age,
    numberPhone,
    nationality,
    gender,
    profileImage,
    categories,
    travels,
  }: {
    id: string;
    email: string;
    name: string;
    numberPhone: string;
    uniqueIdentification: string;
    age: number;
    nationality: string;
    gender: string;
    profileImage: any;
    categories: CategoryDto[];
    travels?: TravelDtoResponse[];
  }) {
    this.id = id;
    this.email = email;
    this.name = name;
    this.numberPhone = numberPhone;
    this.uniqueIdentification = uniqueIdentification;
    this.age = age;
    this.nationality = nationality;
    this.gender = gender;
    this.rating = new Rating();
    this.profileImage = profileImage;
    this.categories = categories;
    this.travels = travels;
  }
}

export default UserDtoResponse;
