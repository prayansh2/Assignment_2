const mongoose = require("mongoose");
require("dotenv").config();

const connectDB = async (uri) => {
  console.log("MongoDB URI:", process.env.MONGO_URI);
  try {
      await mongoose.connect(uri||process.env.MONGO_URI );
      // console.log(process.env.MONGO_URI)

    console.log(" MongoDB Connected Successfully");
  } catch (error) {
    console.log(" MongoDB Connection Error:", error.message);
    // process.exit(1);
  }
};

module.exports = connectDB;
