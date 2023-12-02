import mongoose from "mongoose";
import colors from "colors";

const dbconnect = async () => {
  try {


    await mongoose.connect(process.env.Mongo_url1, {
      useNewUrlParser: true,
    });

   

    console.log(`mongoDB database connected`.bgBlack.green.bold);
  } catch (error) {
    console.log(`Error in mongo connection => ${error}`.bgRed.black.bold);
  }
};

export default dbconnect;

