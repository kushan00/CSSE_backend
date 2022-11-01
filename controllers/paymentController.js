const express = require('express');
const mongoose = require('mongoose');
const apiResponse = require("../helpers/apiResponse");
const uniqueID = require("../helpers/uniqueID");
const paymentModel = require("../models/paymentModel");

 const getPayments = async (req, res) => { 
    try {
        const payments = await paymentModel.find()
        .populate({
            path: "invoice_Id",
        })
        .populate({
            path: "order_Id",
        })
        .populate({
            path: "order_owner_site_manager_id",
        })
        .populate({
            path: "paidto_supplier_id",
        })
        .populate({
            path: "paidby_financial_manager_id",
        });
                 
        apiResponse.Success(res,"payments",{ payments: payments })
    } catch (err) {
        console.error(err.message);
        apiResponse.ServerError(res,"Server Error",{err:err});
    }
}


const getPaymentToSupplier = async (req, res) => { 
    const { id } = req.params;

    try {
        const Payment = await paymentModel.find({"paidto_supplier_id":id})
        .populate({
            path: "invoice_Id",
        })
        .populate({
            path: "order_Id",
        })
        .populate({
            path: "order_owner_site_manager_id",
        })
        .populate({
            path: "paidto_supplier_id",
        })
        .populate({
            path: "paidby_financial_manager_id",
        });
        
        apiResponse.Success(res,"Payment",{ Payment: Payment })
    } catch (err) {
        console.error(err.message);
        apiResponse.ServerError(res,"Server Error",{err:err});
    }
}

const getPaymentToSiteManager = async (req, res) => { 
    const { id } = req.params;

    try {
        const Payment = await paymentModel.find({"order_owner_site_manager_id":id})
        .populate({
            path: "invoice_Id",
        })
        .populate({
            path: "order_Id",
        })
        .populate({
            path: "order_owner_site_manager_id",
        })
        .populate({
            path: "paidto_supplier_id",
        })
        .populate({
            path: "paidby_financial_manager_id",
        });
        
        apiResponse.Success(res,"Payment",{ Payment: Payment })
    } catch (err) {
        console.error(err.message);
        apiResponse.ServerError(res,"Server Error",{err:err});
    }
}

const getPaymentToFinancal = async (req, res) => { 
    const { id } = req.params;

    try {
        const Payment = await paymentModel.find({"paidby_financial_manager_id":id})
        .populate({
            path: "invoice_Id",
        })
        .populate({
            path: "order_Id",
        })
        .populate({
            path: "order_owner_site_manager_id",
        })
        .populate({
            path: "paidto_supplier_id",
        })
        .populate({
            path: "paidby_financial_manager_id",
        });
        
        apiResponse.Success(res,"Payment",{ Payment: Payment })
    } catch (err) {
        console.error(err.message);
        apiResponse.ServerError(res,"Server Error",{err:err});
    }
}


 const createPayment = async (req, res) => {
    const payment = req.body;

    //generate Invoice id
    const payment_Id = await uniqueID.generatepaymentID();
    payment.payment_Id = payment_Id;

    const newPayment = new paymentModel({ ...payment })
    console.log("Saved data",newPayment);
    try {
        await newPayment.save();
        
        apiResponse.Success(res,"NewPayment",{ newPayment: newPayment })
    } catch (err) {
        console.error(err.message);
        apiResponse.ServerError(res,"Server Error",{err:err});
    }
}


const deletepayment = async (req, res) => {
    const { id } = req.params;

    if (!mongoose.Types.ObjectId.isValid(id)) return res.status(404).send(`No payment with id: ${id}`);

    await paymentModel.findByIdAndRemove(id);

    apiResponse.Success(res,"payment Deleted", {});
}



module.exports = {deletepayment,getPaymentToFinancal , getPaymentToSiteManager, getPaymentToSupplier, getPayments,createPayment};