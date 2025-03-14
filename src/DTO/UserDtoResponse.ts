/*
    Thsi class was create for send the informations the determinate user by frontend
*/

class UserDtoResponse {
    id?:string;
    name?:string;
    email:string;
    numberPhone?:string;
    uniqueIdentification?:string;
    age?:number;

    constructor(
        { id, email, name ,uniqueIdentification,age,numberPhone}: 
        { id?: string | undefined; email: string; name?: string;numberPhone?:string,uniqueIdentification?:string;age:number },
    ){
        this.id=id;
        this.email=email;
        this.name=name;
        this.numberPhone = numberPhone;
        this.uniqueIdentification = uniqueIdentification;
        this.age = age
    }
}

export default UserDtoResponse