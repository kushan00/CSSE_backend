const express = require('express');
const mongoose = require('mongoose');
const apiResponse = require("../helpers/apiResponse");
const uniqueID = require("../helpers/uniqueID");
const ItemModel = require("../models/ItemModel");

 const getItems = async (req, res) => { 
    try {
        const Items = await ItemModel.find()
        .populate({
            path: "supplier_Id",
          });
                 
        apiResponse.Success(res,"Items",{ Items: Items })
    } catch (err) {
        console.error(err.message);
        apiResponse.ServerError(res,"Server Error",{err:err});
    }
 }

 const getItem = async (req, res) => { 
    const { id } = req.params;

    try {
        const Items = await ItemModel.find({"_id":id})
        .populate({
            path: "supplier_Id",
          });
        
        apiResponse.Success(res,"Items",{ Items: Items })
    } catch (err) {
        console.error(err.message);
        apiResponse.ServerError(res,"Server Error",{err:err});
    }
}


const getItemsToSupplier = async (req, res) => { 
    const { id } = req.params;

    try {
        const Items = await ItemModel.find({"supplier_Id":id})
        .populate({
            path: "supplier_Id",
          });
        
        apiResponse.Success(res,"Items",{ Items: Items })
    } catch (err) {
        console.error(err.message);
        apiResponse.ServerError(res,"Server Error",{err:err});
    }
}


 const createItem = async (req, res) => {
    const Item = req.body;

    const newItem = new ItemModel({ ...Item});
   
    //generate Item id
    const item_Id = await uniqueID.generateItemID();
    newItem.item_Id = item_Id;

    console.log("Saved Item data",newItem);
    try {
        await newItem.save();
        
        apiResponse.Success(res,"NewItem",{ newItem: newItem });

    } catch (err) {
        console.error(err.message);
        apiResponse.ServerError(res,"Server Error",{err:err});
    }
}


 const updateItem = async (req, res) => {
    const { id } = req.params;
    const { item_Id, item_name, unit_price, supplier_Id,type , available_quantity } = req.body;
    
    const filter = { _id: id };
    const update = { 
        item_Id:item_Id,
         item_name: item_name,
         unit_price: unit_price,
         supplier_Id: supplier_Id,
         type:type,
         available_quantity:available_quantity,    
        };
  
    try {
    
      let data = await ItemModel.findOneAndUpdate(filter, update);
      console.log(data);
      apiResponse.Success(res,"Item Details Updated", {data:data});
  
    } catch (error) {
      apiResponse.ServerError(res,"Server Error",{err:error});
    }
}


 const deleteItem = async (req, res) => {
    const { id } = req.params;

    if (!mongoose.Types.ObjectId.isValid(id)) return res.status(404).send(`No Item with id: ${id}`);

    await ItemModel.findByIdAndRemove(id);

    apiResponse.Success(res,"Item Deleted", {});
}

module.exports = {getItemsToSupplier , getItems , getItem, deleteItem, createItem, updateItem};