import mongoose from "mongoose";
import config = require("../config/config");

const connectDB = async () => {
  try {
    await mongoose.connect(config.default.mongoURI, {
      useNewUrlParser: true,
      useCreateIndex: true,
      useUnifiedTopology: true,
    });

    console.log("Mongoose Connected ...");
  } catch (err) {
    console.error(err.message);
    process.exit(1);
  }
};

export default connectDB;
