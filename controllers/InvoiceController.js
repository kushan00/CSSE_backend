const express = require('express');
const mongoose = require('mongoose');
const apiResponse = require("../helpers/apiResponse");
const uniqueID = require("../helpers/uniqueID");
const InvoiceModel = require("../models/invoiceModel");

 const getInvoices = async (req, res) => { 
    try {
        const Invoices = await InvoiceModel.find()
        .populate({
            path: "invoice_Id",
        })
        .populate({
            path: "created_supplier_id",
        })
        .populate({
            path: "site_manager_id",
        });
                 
        apiResponse.Success(res,"Invoices",{ Invoices: Invoices })
    } catch (err) {
        console.error(err.message);
        apiResponse.ServerError(res,"Server Error",{err:err});
    }
 }






 const getInvoicesToSitemanager = async (req, res) => { 
    const { id } = req.params;

    try {
        const Invoice = await InvoiceModel.find({"site_manager_id":id})
        .populate({
            path: "invoice_Id",
        })
        .populate({
            path: "created_supplier_id",
        })
        .populate({
            path: "site_manager_id",
        });
        
        apiResponse.Success(res,"Invoice",{ Invoice: Invoice })
    } catch (err) {
        console.error(err.message);
        apiResponse.ServerError(res,"Server Error",{err:err});
    }
}

const getInvoicesToSupplier = async (req, res) => { 
    const { id } = req.params;

    try {
        const Invoice = await InvoiceModel.find({"created_supplier_id":id})
        .populate({
            path: "invoice_Id",
        })
        .populate({
            path: "created_supplier_id",
        })
        .populate({
            path: "site_manager_id",
        });
        
        apiResponse.Success(res,"Invoice",{ Invoice: Invoice })
    } catch (err) {
        console.error(err.message);
        apiResponse.ServerError(res,"Server Error",{err:err});
    }
}


 const createInvoice = async (req, res) => {
    const Invoice = req.body;

    const newInvoice = new InvoiceModel({ ...Invoice});
   
    //generate Invoice id
    const invoice_Id = await uniqueID.generateInvoiceID();
    newInvoice.invoice_Id = invoice_Id;

    console.log("Saved Invoice data",newInvoice);
    try {
        await newInvoice.save();
        
        apiResponse.Success(res,"NewInvoice",{ newInvoice: newInvoice });

    } catch (err) {
        console.error(err.message);
        apiResponse.ServerError(res,"Server Error",{err:err});
    }
}


 const updateInvoice = async (req, res) => {
    const { id } = req.params;
    const { Invoice_Id, order_Id, created_supplier_id, site_manager_id,order_Items , total_price ,discount , final_price} = req.body;
    
    const filter = { _id: id };
    const update = { 
         Invoice_Id: Invoice_Id,
         order_Id: order_Id,
         created_supplier_id: created_supplier_id,
         order_Items:order_Items,
         total_price:total_price,
         final_price:final_price,
         discount:discount,
         site_manager_id: site_manager_id, 
         
        };
  
    try {
    
      let data = await InvoiceModel.findOneAndUpdate(filter, update);
      console.log(data);
      apiResponse.Success(res,"Invoice Details Updated", {data:data});
  
    } catch (error) {
      apiResponse.ServerError(res,"Server Error",{err:error});
    }
}


 const deleteInvoice = async (req, res) => {
    const { id } = req.params;

    if (!mongoose.Types.ObjectId.isValid(id)) return res.status(404).send(`No post with id: ${id}`);

    await InvoiceModel.findByIdAndRemove(id);

    apiResponse.Success(res,"Invoice Deleted", {});
}

module.exports = {getInvoicesToSitemanager,getInvoicesToSupplier , getInvoices, deleteInvoice, createInvoice, updateInvoice};