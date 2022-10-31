const mongoose = require("mongoose");

const supplierShopSchema = new mongoose.Schema({
    supplierShop_Id: {
		type: String,
		required: true,
	},
	supplierShop_name: {
		type: String,
		required: true,
	},
	Location: {
		type: String,
		required: true,
	},
    supplier_Id: {
		type: mongoose.Schema.Types.ObjectId,
      required: true,
        ref: "user",
    },
    Mobile: {
		type: String,
		required: true,
	},
},
{
    timestamps: true,
}
);

module.exports = supplierShop = mongoose.model("supplierShop", supplierShopSchema);