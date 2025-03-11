class UserDtoRequest {
    id?:string;
    name:string;
    email:string;
    password:string;
    numberPhone?:string;
    uniqueIdentification:string;
    age:number;

    constructor(
        { id, email, name ,password,uniqueIdentification,age,numberPhone}: 
        { id?: string | undefined; email: string; name: string;password:string;numberPhone?:string,uniqueIdentification:string;age:number },
    ){
        this.id=id;
        this.email=email;
        this.name=name;
        this.password = password;
        this.numberPhone = numberPhone;
        this.uniqueIdentification = uniqueIdentification;
        this.age = age
    }
}

export default UserDtoRequest