import { User } from "../src/models/User"
import UserRepository from "../src/repositories/UserRepository"

test('register a new user', ()=>{
    test("a new user don't have some atribute except the number phone",()=>{
        const user: any = new User ({
            name: "João Silva",
            password: "senhaSegura123,.",
            numberPhone: "11999999999",
            age: 30, 
            uniqueIdentification: "12345678909",
            email: "joao.silva@example.com"
        })

        const userRepository = new UserRepository()
        const userRequestDto = userRepository.register(user)
        expect(userRequestDto!=null)
    })
})