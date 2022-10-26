const mongoose = require("mongoose"); 

const OrdersSchema = new mongoose.Schema({

	order_Id: {
		type: String,
		required: true,
	},
    PR_Id: {
		type: mongoose.Schema.Types.ObjectId,
      required: true,
        ref: "requsition",
    },
	Supplier_detils: {
        type: mongoose.Schema.Types.ObjectId,
      required: true,
        ref: "user",
    },
	site_manager_id: {
        type: mongoose.Schema.Types.ObjectId,
      required: true,
        ref: "user",
    },
	Company_details: {
        type: String,
        required: true,
    },
    delivery_details: {
        type: String,
        required: true,
    },
	order_Items: {
        type: [],
        required: true,
    },
	total_price: {
        type: String,
        required: true,
    },
	credit_notice: {
        type: String,
        required: true,
    },
	required_date: {
        type: String,
        required: true,
    },
	order_status: {
        type: String,
        default: "pending",
    },


},
{
	timestamps: true,
}
);

module.exports = Orders = mongoose.model("orders", OrdersSchema);
