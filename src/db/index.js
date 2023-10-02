const mongoose = require("mongoose");

const connectionString = "mongodb://localhost:27017/mydb";

mongoose.connect(connectionString, {
  useNewUrlParser: true,
  useUnifiedTopology: true
})
  .then(() => {
    console.log("Connected to MongoDB successfully!");
  });
// instead of catching this should just throw.

module.exports = mongoose;
