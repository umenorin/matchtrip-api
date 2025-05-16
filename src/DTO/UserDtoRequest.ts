import { Travel } from "../models/Travel.js";
import { Rating } from "../models/Rating.js";

/*
    This class was create for ever request send by front end, it'll trasnform in UserDtoRquest for finally used by the services
*/
class UserDtoRequest {
  id?: string;
  name?: string;
  email?: string;
  password: string;
  numberPhone?: string;
  uniqueIdentification?: string;
  age?: number;
  nationality: string;
  gender: string;
  rating?: any;
  travels?: any;
  profileImage: any;

  constructor({
    id,
    email,
    name,
    password,
    uniqueIdentification,
    age,
    numberPhone,
    nationality,
    gender,
    rating,
    travels,
    profileImage,
  }: {
    id?: string | undefined;
    email: string;
    name?: string;
    password: string;
    numberPhone?: string;
    uniqueIdentification: string;
    age: number;
    nationality: string;
    gender: string;
    rating: typeof Rating;
    travels: typeof Array<typeof Travel>;
    profileImage: any;
  }) {
    this.id = id;
    this.email = email;
    this.name = name;
    this.password = password;
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

export default UserDtoRequest;
