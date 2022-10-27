const express = require("express");
const router = express.Router();


const {getItemsToSupplier , getItems , getItem, deleteItem, createItem, updateItem} = require("../Controllers/ItemController");


router.post("/createItem",createItem);
router.get("/getAllItems",getItems);
router.get("/getItem/:id",getItem);
router.get("/getItemBySupplierId/:id",getItemsToSupplier);
router.delete("/deleteItem/:id",deleteItem);
router.put("/updateItem/:id",updateItem);


module.exports = router;
