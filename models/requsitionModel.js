const mongoose = require("mongoose");

const RequsitionSchema = new mongoose.Schema({
    Requsition_id: {
        type: String,
        required: true,
    },
    Company_details: {
        type: String,
        required: true,
    },
    delivery_details: {
        type: String,
        required: true,
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
    required_date: {
        type: String,
        required: true,
    },
    order_Items: {
        type: [],
        required: true,
    },
    status: {
        type: String,
        required: true,
    },

    
},
{
    timestamps: true,
}
);

module.exports = Requsition = mongoose.model("requsition", RequsitionSchema);