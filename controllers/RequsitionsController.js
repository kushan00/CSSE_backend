const express = require("express");
const mongoose = require("mongoose");
const apiResponse = require("../helpers/apiResponse");
const uniqueID = require("../helpers/uniqueID");
const RequsitionModel = require("../models/requsitionModel");

const getRequsitions = async (req, res) => {
    try {

        const Requsition = await RequsitionModel.find()
        .populate({
            path: "site_manager_id",
            select: "user_Id fullName email mobileno",
          })
        .populate({
            path: "Supplier_detils",
            select: "user_Id fullName email mobileno",
          });
    
        apiResponse.Success(res, "Requsition", { Requsition: Requsition });
    } catch (err) {
        console.error(err.message);
        apiResponse.ServerError(res, "Server Error", { err: err });
    }
    };

    
const getRequsitionById = async (req, res) => {
  const { id } = req.params;

  try {
      // const Requsition = await RequsitionModel.findById(id);
      const Requsition = await RequsitionModel.find({"_id":id})
        .populate({
          path: "site_manager_id",
          select: "user_Id fullName email mobileno",
        }).populate({
          path: "Supplier_detils",
          select: "user_Id fullName email mobileno",
        });

      apiResponse.Success(res, "Requsition", { Requsition: Requsition });
  } catch (err) {
      console.error(err.message);
      apiResponse.ServerError(res, "Server Error", { err: err });
  }
}

const getRequsitionToSiteManager = async (req, res) => {
    const { id } = req.params;

    try {
        // const Requsition = await RequsitionModel.findById(id);
        const Requsition = await RequsitionModel.find({"site_manager_id":id})
          .populate({
            path: "site_manager_id",
            select: "user_Id fullName email mobileno",
          }).populate({
            path: "Supplier_detils",
            select: "user_Id fullName email mobileno",
          });

        apiResponse.Success(res, "Requsition", { Requsition: Requsition });
    } catch (err) {
        console.error(err.message);
        apiResponse.ServerError(res, "Server Error", { err: err });
    }
}

const getRequsitionToSupplier = async (req, res) => {
    const { id } = req.params;

    try {
        // const Requsition = await RequsitionModel.findById(id);
        const Requsition = await RequsitionModel.find({"Supplier_detils" : id})
          .populate({
            path: "Supplier_detils",
            select: "user_Id fullName email mobileno",
          })
          .populate({
            path: "site_manager_id",
            select: "user_Id fullName email mobileno",
          });

        apiResponse.Success(res, "Requsition", { Requsition: Requsition });
    } catch (err) {
        console.error(err.message);
        apiResponse.ServerError(res, "Server Error", { err: err });
    }
}

const createRequsition = async (req, res) => {

    const Requsition = req.body;
    
    //generate requition id
    const Requsition_id = await uniqueID.generateRequsitionID();
    Requsition.Requsition_id = Requsition_id;

    const newRequsition = new RequsitionModel({ ...Requsition});
    console.log("Saved data", newRequsition);
    try {
        await newRequsition.save();

        apiResponse.Success(res, "NewRequsition", { newRequsition: newRequsition });
    } catch (err) {
        console.error(err.message);
        apiResponse.ServerError(res, "Server Error", { err: err });
    }
}

const updateRequsition = async (req, res) => {
    const { id } = req.params;
    const {Requsition_id, Company_details , delivery_details , Supplier_detils , site_manager_id , required_date , order_Items , status } = req.body;

    const filter = { _id: id };
    const update = { 
          Requsition_id: Requsition_id, 
          Company_details:Company_details,
          delivery_details:delivery_details,
          Supplier_detils:Supplier_detils,
          site_manager_id:site_manager_id,
          required_date:required_date,
          order_Items:order_Items,
          status:status,
        };

    try {

      let data = await RequsitionModel.findOneAndUpdate(filter, update);
      console.log(data);
      apiResponse.Success(res,"Requsition Details Updated", {data:data});
    
    } catch (error) {
      apiResponse.ServerError(res,"Server Error",{err:error});
    }
}

const updateRequsitionStatus = async (req, res) => {
  const { id } = req.params;
  const { status} = req.body;
  
const filter = { _id: id };
const update = { 
     status: status,     
    };

try {

  let data = await RequsitionModel.findOneAndUpdate(filter, update);
  console.log(data);
  apiResponse.Success(res,"Requsition Details Updated", {data:data});

} catch (error) {
  apiResponse.ServerError(res,"Server Error",{err:error});
}
}

const deleteRequsition = async (req, res) => {
    const { id } = req.params;

    if (!mongoose.Types.ObjectId.isValid(id))
        return res.status(404).send(`No Requsition with id: ${id}`);

    await RequsitionModel.findByIdAndRemove(id);

    apiResponse.Success(res, "Requsition Deleted", {});
}

module.exports = {getRequsitionById, getRequsitionToSiteManager , getRequsitionToSupplier,updateRequsitionStatus, getRequsitions, createRequsition, updateRequsition, deleteRequsition };