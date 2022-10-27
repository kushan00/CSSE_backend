const mongoose = require("mongoose");

const ItemSchema = new mongoose.Schema({
    item_Id: {
		type: String,
		required: true,
	},
	item_name: {
		type: String,
		required: true,
	},
	unit_price: {
		type: String,
		required: true,
	},
    supplier_Id: {
		type: mongoose.Schema.Types.ObjectId,
      required: true,
        ref: "user",
    },
    type: {
		type: String,
		required: true,
	},
	available_quantity: {
		type: String,
        default:null
	},

},
{
    timestamps: true,
}
);

module.exports = Item = mongoose.model("Item", ItemSchema);