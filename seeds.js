const mongoose = require("mongoose");
const Users = require("./models/userModel.js");
const dotenv = require("dotenv");

/* Loading the environment variables from the .env file. */
dotenv.config();

/* Connecting to the MongoDB database. */
mongoose.connect(
  process.env.DB_LINK,
  {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  },
  (err) => {
    if (err) return console.error(err);
    console.log("Successfully Connected to MongoDB");
  }
);

/* Creating an array of admin objects. */
const seedLineManagers = [
  {
    user_Id: "001",
    fullName: "line manager 1",
    email: "linemanager1@gmail.com",
    mobileno: "+94715391491",
    password: "$2a$10$kyDfuM.pQv/lbOQlyU.4Geycmv42dnN1O7nrGQku9kxrhwGd0dV9a", //123@Testing
    userRole: "line_manager",
    status:"insert-by-seed"
  },
  {
    user_Id: "002",
    fullName: "line manager 2",
    email: "linemanager2@gmail.com",
    mobileno: "94715391491",
    password: "$2a$10$kyDfuM.pQv/lbOQlyU.4Geycmv42dnN1O7nrGQku9kxrhwGd0dV9a", //123@Testing
    userRole: "line_manager",
    status:"insert-by-seed"
  },
];

/**
 * Delete all users, then insert the seedLineManagers array into the database.
 */
const seedDB = async () => {
  try {
    await Users.deleteMany({});
    await Users.insertMany(seedLineManagers);
    console.log("Successfully Line managers seeded to the database.");
  } catch (error) {
    console.error(error);
  }
};

seedDB().then(() => {
  mongoose.connection.close();
});
