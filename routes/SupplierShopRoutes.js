const express = require("express");
const router = express.Router();


const {getSupplierShopsToSupplier , getSupplierShops , getSupplierShop, deleteSupplierShop, createSupplierShop, updateSupplierShop} = require("../Controllers/SupplierShopController");


router.post("/createSupplierShop",createSupplierShop);
router.get("/getAllSupplierShops",getSupplierShops);
router.get("/getSupplierShop/:id",getSupplierShop);
router.get("/getSupplierShopBySupplierId/:id",getSupplierShopsToSupplier);
router.delete("/deleteSupplierShop/:id",deleteSupplierShop);
router.put("/updateSupplierShop/:id",updateSupplierShop);


module.exports = router;
