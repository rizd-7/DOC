const mongoose = require("mongoose");

const connectDB = (MONGO_URI) => {
    // Connecting to the database
    return mongoose
      .connect(MONGO_URI, {
       /*   
        useCreateIndex: true,
        useFindAndModify: false, */
        useNewUrlParser: true,
        useUnifiedTopology: true,
      })
  };

  module.exports = connectDB;