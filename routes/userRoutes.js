const express = require("express");
const router = express.Router();
const { check } = require("express-validator");
const {
    getUsers,
    getOneUser,
    createUser,
    updateUser,
    deleteUser,
    authUser,
    loginUser
  } = require("../controllers/userController.js");
const  auth  = require("../middlewares/auth.js");


router.get("/auth", auth,authUser);
router.post(
	"/signin",
	[
		check("email", "Please include a valid email").isEmail(),
		check("password", "Password is required").exists(),
	],
	loginUser);
router.post("/create-user",
	[
		check("email", "Please include a valid email").isEmail(),
	],
	createUser);
router.get("/all-users",getUsers);
router.get("/:id",getOneUser);
router.put("/update-user/:id",updateUser);
router.delete("/delete-user/:id",deleteUser);


module.exports = router;
