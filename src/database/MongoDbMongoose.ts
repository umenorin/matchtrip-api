import mongoose from "mongoose";

const mongoosedb = async () => {
  try {
    await mongoose.connect(
      `mongodb://127.0.0.1:27017/${process.env.NAME_DATABASE}`
    );

    console.log("Database working successfully");
  } catch (error) {
    console.error("Error while connecting to the database: ", error);
  }
};

export default mongoosedb;
