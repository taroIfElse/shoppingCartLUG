const mongoose = require("mongoose");
const dbConnection = async () => {
  try {
    await mongoose.connect(process.env.CONNECTIONSTRING);
    console.log("Connection with db succesfully");
  } catch (error) {
    console.log(error);
    throw new Error("Couldnot connect to database");
  }
};

module.exports = { dbConnection };
