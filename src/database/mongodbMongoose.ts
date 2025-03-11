import mongoose from "mongoose";

const mongoosedb = async () => {
  try {
    await mongoose.connect(
      `mongodb://127.0.0.1:27017/${process.env.NAME_DATABASE}`
    );

    console.log(
      "✅ \x1b[32mDatabase connected successfully!\x1b[0m",
      `\n- Host: \x1b[33m${mongoose.connection.host}\x1b[0m`,
      `\n- Database: \x1b[33m${mongoose.connection.name}\x1b[0m`
    );
  } catch (error:any) {
    console.error(
      "❌ \x1b[31mFailed to connect to the database:\x1b[0m",
      `\n- Error: \x1b[31m${error.message}\x1b[0m`,
      `\n- Connection string: \x1b[33mmongodb://127.0.0.1:27017/${process.env.NAME_DATABASE}\x1b[0m`
    );
    process.exit(1); // Encerra o processo com erro
  }
};

export default mongoosedb;
