export class CustomError extends Error {

    constructor(message: string,public statusHttp:number) {
        super(message); 
    }
}