import { Travel } from "../models/Travel.js";
import { Rating } from "../models/Rating.js";

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
  travels?: any;
  profileImage: any;

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
    this.travels = new Array<typeof Travel>();
    this.profileImage = profileImage;
  }
}

export default UserDtoResponse;
