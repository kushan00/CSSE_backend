const express = require('express');
const mongoose = require('mongoose');
const apiResponse = require("../helpers/apiResponse");
const uniqueID = require("../helpers/uniqueID");
const OrderModel = require("../models/orderModel");

 const getOrders = async (req, res) => { 
    try {
        const Orders = await OrderModel.find()
        .populate({
            path: "PR_Id",
          });
                 
        apiResponse.Success(res,"Orders",{ Orders: Orders })
    } catch (err) {
        console.error(err.message);
        apiResponse.ServerError(res,"Server Error",{err:err});
    }
 }

 const getOrdersMoreThanOneLak = async (req, res) => { 
    try {
        const Orders = await OrderModel.find()
        .populate({
            path: "PR_Id",
          });
        console.log("Orders",Orders);
        var morethanorders = [];
        for(let i = 0; i < Orders.length ; i++ ){
            if(Orders[i].total_price > 100000){
                morethanorders.push(Orders[i]);
            }
        }
                 
        apiResponse.Success(res,"Orders with total more than one lak",{ Orders: morethanorders })
    } catch (err) {
        console.error(err.message);
        apiResponse.ServerError(res,"Server Error",{err:err});
    }
 }

 const getOrdersLessThanOneLak = async (req, res) => { 
    try {
        const Orders = await OrderModel.find()
        .populate({
            path: "PR_Id",
          });
        console.log("Orders",Orders);
        var morethanorders = [];
        for(let i = 0; i < Orders.length ; i++ ){
            if(Orders[i].total_price < 100000){
                morethanorders.push(Orders[i]);
            }
        }
                 
        apiResponse.Success(res,"Orders with total Less than one lak",{ Orders: morethanorders })
    } catch (err) {
        console.error(err.message);
        apiResponse.ServerError(res,"Server Error",{err:err});
    }
 }


 const getOrdersToSitemanager = async (req, res) => { 
    const { id } = req.params;

    try {
        const order = await OrderModel.find({"site_manager_id":id})
        .populate({
            path: "PR_Id",
          });
        
        apiResponse.Success(res,"order",{ order: order })
    } catch (err) {
        console.error(err.message);
        apiResponse.ServerError(res,"Server Error",{err:err});
    }
}

const getOrdersToSupplier = async (req, res) => { 
    const { id } = req.params;

    try {
        const order = await OrderModel.find({"Supplier_detils":id})
        .populate({
            path: "PR_Id",
          });
        
        apiResponse.Success(res,"order",{ order: order })
    } catch (err) {
        console.error(err.message);
        apiResponse.ServerError(res,"Server Error",{err:err});
    }
}


 const createOrder = async (req, res) => {
    const Order = req.body;

    const newOrder = new OrderModel({ ...Order});
   
    //generate Order id
    const order_Id = await uniqueID.generateOrderID();
    newOrder.order_Id = order_Id;

    console.log("Saved Order data",newOrder);
    try {
        await newOrder.save();
        
        apiResponse.Success(res,"NewOrder",{ newOrder: newOrder });

    } catch (err) {
        console.error(err.message);
        apiResponse.ServerError(res,"Server Error",{err:err});
    }
}


 const updateOrder = async (req, res) => {
    const { id } = req.params;
    const { order_Id, PR_Id, Supplier_detils, site_manager_id,Company_details , delivery_details ,required_date , order_Items, total_price, credit_notice , order_status} = req.body;
    
    const filter = { _id: id };
    const update = { 
         order_Id: order_Id,
         PR_Id: PR_Id,
         Supplier_detils: Supplier_detils,
         Company_details:Company_details,
         delivery_details:delivery_details,
         order_Items:order_Items,
         required_date:required_date,
         site_manager_id: site_manager_id,
         total_price: total_price,
         credit_notice: credit_notice,
         order_status: order_status,   
         
        };
  
    try {
    
      let data = await OrderModel.findOneAndUpdate(filter, update);
      console.log(data);
      apiResponse.Success(res,"Order Details Updated", {data:data});
  
    } catch (error) {
      apiResponse.ServerError(res,"Server Error",{err:error});
    }
}

const updateOrderStatus = async (req, res) => {
    const { id } = req.params;
    const { order_status} = req.body;
    
  const filter = { _id: id };
  const update = { 
       order_status: order_status,     
      };

  try {
  
    let data = await OrderModel.findOneAndUpdate(filter, update);
    console.log(data);
    apiResponse.Success(res,"Order Details Updated", {data:data});

  } catch (error) {
    apiResponse.ServerError(res,"Server Error",{err:error});
  }
}


 const deleteOrder = async (req, res) => {
    const { id } = req.params;

    if (!mongoose.Types.ObjectId.isValid(id)) return res.status(404).send(`No post with id: ${id}`);

    await OrderModel.findByIdAndRemove(id);

    apiResponse.Success(res,"Order Deleted", {});
}

module.exports = {getOrdersToSitemanager,getOrdersToSupplier ,getOrdersMoreThanOneLak  , getOrdersLessThanOneLak, updateOrderStatus, getOrders, deleteOrder, createOrder, updateOrder};