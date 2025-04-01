import mongoose from "mongoose";

const mongoosedb = async () => {
  try {
    await mongoose.connect(
      `${process.env.DATABASE_URL}`
    );

    console.log("Database working successfully");
  } catch (error) {
    console.error("Error while connecting to the database: ", error);
  }
};

export default mongoosedb;
