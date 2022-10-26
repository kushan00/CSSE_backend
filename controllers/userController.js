const bcrypt = require("bcryptjs");
const User = require("../models/userModel.js");
const passwordGenerator = require("../helpers/passwordGenerator.js");
const uniqueID = require("../helpers/uniqueID");
const apiResponse = require("../helpers/apiResponse");
var ShoutoutClient = require('shoutout-sdk');

const jwt = require("jsonwebtoken");
var jwtSecret = "mysecrettoken";

var apiKey = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJqdGkiOiJjNWE2MDhkMC01NDkwLTExZWQtODM0ZC0xMTg5MGQxOWY5NGYiLCJzdWIiOiJTSE9VVE9VVF9BUElfVVNFUiIsImlhdCI6MTY2NjcyMTYyOCwiZXhwIjoxOTgyMzQwODI4LCJzY29wZXMiOnsiYWN0aXZpdGllcyI6WyJyZWFkIiwid3JpdGUiXSwibWVzc2FnZXMiOlsicmVhZCIsIndyaXRlIl0sImNvbnRhY3RzIjpbInJlYWQiLCJ3cml0ZSJdfSwic29fdXNlcl9pZCI6IjczNzE5Iiwic29fdXNlcl9yb2xlIjoidXNlciIsInNvX3Byb2ZpbGUiOiJhbGwiLCJzb191c2VyX25hbWUiOiIiLCJzb19hcGlrZXkiOiJub25lIn0.R0YkOI_NrqEfZKVFORIQvo20oxr9RYHEbASg5MVfeVU';

var debug = true, verifySSL = false;

  const createUser = async (req, res) => {
    
    const { 
      fullName, 
      email, 
      mobileno, 
      userRole
  } = req.body;



  try {
  // See if user exists
  let user = await User.findOne({ email });

      if (user) {
        apiResponse.AlreadyExists(res,"User already exists",{user : user?.fullName});
        return 0; 
      }

      // generating user unique gym id
      var user_Id = await uniqueID.generateID();
      var password = await passwordGenerator.generateRandomPassword();

      var client = new ShoutoutClient(apiKey, debug, verifySSL);
      var message = {
      "content": {"sms": "Hello! "+fullName+" Your Registration is successfull..!" + "Your ID is: "+user_Id+ " and Password is: "+password},
      "destinations": [mobileno],
      "source": "ShoutDEMO",
      "transports": ["SMS"]
      };

      client.sendMessage(message, (error, result) => {
      if (error) {
      console.error('Error sending message!',error);
      } else {
      console.log('Sending message successful!',result);
      }
      });

      user = new User({
          user_Id,
          fullName, 
          email, 
          password,  
          mobileno, 
          userRole
      });

      //console.log("user",user);

      //Encrypt Password
      const salt = await bcrypt.genSalt(10);

      user.password = await bcrypt.hash(user.password, salt);

      await user.save();
      
      apiResponse.Success(res,"Add New User Success",{user: user});

      } catch (err) {
      console.error(err);
      apiResponse.ServerError(res,"Server Error",{err:err});
      }
  };

  const authUser = async (req, res) => {
    try {
      let user = await User.findById(req.user.id);
      if (!user) 
      {
        apiResponse.NotFound(res,"Token expired or null",{ err: "Error" })
        return 0;  
      }
      apiResponse.Success(res,"Auth Success",{ user: user })
    } catch (err) {
      console.error(err.message);
      apiResponse.ServerError(res,"Server Error",{err:err});
    }
  };


  const loginUser = async (req, res) => {

    const { email, password } = req.body;

    try {
      // See if user exists
      let user = await User.findOne({ email });

      if (!user) 
      {
        apiResponse.NotFound(res,"Invalid Credentials",{ err: "Error" })
        return 0; 
      }
    

      const isMatch = await bcrypt.compare(password, user.password);

      if (!isMatch) {
          apiResponse.NotFound(res,"Invalid Credentials",{ err: "Error" })
      }

      //Return jsonwebtoken
      const payload = {
        user: {
          id: user.id,
        },
      };

      jwt.sign(payload, jwtSecret, { expiresIn: "1 days" }, (err, token) => {
        if (err) throw err;
        apiResponse.Success(res,"Login Success",{ token, userRole: user.userRole , user: user.fullName , userID : user?.user_Id ? user?.user_Id : "" , _id:user?._id  })
      });
    } catch (err) {
      console.log(err.message);
      apiResponse.ServerError(res,"Server Error",{err:err});
    }
  };




  const getUsers = async (req, res) => {
    try {
      const users = await User.find();
      apiResponse.Success(res,"All Users Retrive Success",{users: users });
    } catch (error) {
      apiResponse.ServerError(res,"Server Error",{err:error});
    }
  };

  const getOneUser = async (req, res) => {
    try {
      const user = await User.findById(req.params.id);
      apiResponse.Success(res,"All Users Retrive Success",{users: users });
    } catch (error) {
      apiResponse.ServerError(res,"Server Error",{err:error});
    }
  };



  const updateUser = async (req, res) => {
    const { id } = req.params;
    const { fullName, mobileno, email , dateOfBirth ,  weight ,height  } = req.body;

    const filter = { _id: id };
    const update = { 
        fullName: fullName,
        mobileno:mobileno,
        email : email,
        dateOfBirth : dateOfBirth,
        weight : weight,
        height : height      
        };

    try {
    
    let data = await User.findOneAndUpdate(filter, update);
    console.log(data);
    apiResponse.Success(res,"User Details Updated", {data:data});

    } catch (error) {
      apiResponse.ServerError(res,"Server Error",{err:error});
    }
  }


  const deleteUser = async (req, res) => {
    const { id } = req.params;

    let data = await User.findByIdAndRemove(id);

    apiResponse.Success(res, "User Deleted", {data:data});
  }




  module.exports = {
    getUsers,
    getOneUser,
    createUser,
    updateUser,
    deleteUser,
    authUser,
    loginUser
  };
