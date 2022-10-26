const mongoose = require("mongoose");

const UserSchema = new mongoose.Schema({
    user_Id: {
		type: String,
		required: true,
	},
	fullName: {
		type: String,
		required: true,
	},
	mobileno: {
		type: String,
		required: true,
	},
	email: {
		type: String,
		required: true,
		unique: true,
	},
    password: {
		type: String,
		required: true,
	},
	status: {
		type: String,
        default:null
	},
	userRole: {
		type: String,
		required:true,
	},
},
{
    timestamps: true,
}
);

module.exports = User = mongoose.model("user", UserSchema);