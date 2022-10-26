const mongoose = require("mongoose"); 

const PaymentSchema = new mongoose.Schema({

	payment_Id: {
		type: String,
		required: true,
	},
	invoice_Id: {
		type: mongoose.Schema.Types.ObjectId,
        required: true,
        ref: "Invoice",
    },
	order_Id: {
		type: mongoose.Schema.Types.ObjectId,
        required: true,
        ref: "orders",
    },
	order_owner_site_manager_id: {
		type: mongoose.Schema.Types.ObjectId,
        required: true,
        ref: "user",
    },
	paidto_supplier_id: {
		type: mongoose.Schema.Types.ObjectId,
        required: true,
        ref: "user",
    },
	paidby_financial_manager_id: {
		type: mongoose.Schema.Types.ObjectId,
        required: true,
        ref: "user",
    },
	total_amount:{
		type:String,
		required:true,
	},
	status:{
		type:String,
		default:"not_paid"
	}
    
},
{
	timestamps: true,
}
);

module.exports = Payment = mongoose.model("Payment", PaymentSchema);
