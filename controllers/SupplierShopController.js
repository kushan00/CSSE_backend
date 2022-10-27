const express = require('express');
const mongoose = require('mongoose');
const apiResponse = require("../helpers/apiResponse");
const uniqueID = require("../helpers/uniqueID");
const supplierShopModel = require("../models/supplierShopModel");

 const getSupplierShops = async (req, res) => { 
    try {
        const SupplierShops = await supplierShopModel.find()
        .populate({
            path: "supplier_Id",
          });
                 
        apiResponse.Success(res,"SupplierShops",{ SupplierShops: SupplierShops })
    } catch (err) {
        console.error(err.message);
        apiResponse.ServerError(res,"Server Error",{err:err});
    }
 }

 const getSupplierShop = async (req, res) => { 
    const { id } = req.params;

    try {
        const SupplierShops = await supplierShopModel.find({"_id":id})
        .populate({
            path: "supplier_Id",
          });
        
        apiResponse.Success(res,"SupplierShops",{ SupplierShops: SupplierShops })
    } catch (err) {
        console.error(err.message);
        apiResponse.ServerError(res,"Server Error",{err:err});
    }
}


const getSupplierShopsToSupplier = async (req, res) => { 
    const { id } = req.params;

    try {
        const SupplierShops = await supplierShopModel.find({"supplier_Id":id})
        .populate({
            path: "supplier_Id",
          });
        
        apiResponse.Success(res,"SupplierShops",{ SupplierShops: SupplierShops })
    } catch (err) {
        console.error(err.message);
        apiResponse.ServerError(res,"Server Error",{err:err});
    }
}


 const createSupplierShop = async (req, res) => {
    const SupplierShop = req.body;

    const newSupplierShop = new supplierShopModel({ ...SupplierShop});
   
    //generate SupplierShop id
    const supplierShop_Id = await uniqueID.generateSupplierShopID();
    newSupplierShop.supplierShop_Id = supplierShop_Id;

    console.log("Saved SupplierShop data",newSupplierShop);
    try {
        await newSupplierShop.save();
        
        apiResponse.Success(res,"NewSupplierShop",{ newSupplierShop: newSupplierShop });

    } catch (err) {
        console.error(err.message);
        apiResponse.ServerError(res,"Server Error",{err:err});
    }
}


 const updateSupplierShop = async (req, res) => {
    const { id } = req.params;
    const { supplierShop_Id, supplierShop_name, Location, supplier_Id,Mobile} = req.body;
    
    const filter = { _id: id };
    const update = { 
         supplierShop_Id:supplierShop_Id,
         supplierShop_name: supplierShop_name,
         Location: Location,
         supplier_Id: supplier_Id,
         Mobile:Mobile,    
        };
  
    try {
    
      let data = await supplierShopModel.findOneAndUpdate(filter, update);
      console.log(data);
      apiResponse.Success(res,"SupplierShop Details Updated", {data:data});
  
    } catch (error) {
      apiResponse.ServerError(res,"Server Error",{err:error});
    }
}


 const deleteSupplierShop = async (req, res) => {
    const { id } = req.params;

    if (!mongoose.Types.ObjectId.isValid(id)) return res.status(404).send(`No SupplierShop with id: ${id}`);

    await supplierShopModel.findByIdAndRemove(id);

    apiResponse.Success(res,"SupplierShop Deleted", {});
}

module.exports = {getSupplierShopsToSupplier , getSupplierShops , getSupplierShop, deleteSupplierShop, createSupplierShop, updateSupplierShop};