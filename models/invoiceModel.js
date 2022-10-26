const mongoose = require("mongoose");

const InvoiceSchema = new mongoose.Schema({
    invoice_Id: {
		type: String,
		required: true,
	},
	order_Id: {
		type: mongoose.Schema.Types.ObjectId,
        required: true,
        ref: "orders",
    },
	created_supplier_id: {
		type: mongoose.Schema.Types.ObjectId,
        required: true,
        ref: "user",
    },
    site_manager_id: {
		type: mongoose.Schema.Types.ObjectId,
        required: true,
        ref: "user",
    },
	order_Items: {
        type: [],
        required: true,
    },
	total_price: {
        type: String,
        required: true,
    },
	discount: {
		type: String,
        default:null
	},
    final_price: {
        type: String,
        required: true,
    },
},
{
    timestamps: true,
}
);

module.exports = Invoice = mongoose.model("Invoice", InvoiceSchema);