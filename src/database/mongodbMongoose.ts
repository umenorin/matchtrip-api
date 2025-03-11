import mongoose from "mongoose";

const  mongoosedb = async () =>{
    try {
        // Conecta ao banco de dados
        await mongoose.connect(`mongodb://127.0.0.1:27017/${process.env.NAME_DATABASE}`);

        console.log('Conexão com o banco de dados estabelecida e coleção criada com sucesso!');
    } catch (error) {
        console.error('Erro ao conectar ao banco de dados:', error);
    }

} 



export default mongoosedb;