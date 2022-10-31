const express = require("express");
const router = express.Router();


const {getOrdersToSitemanager,getOrdersToSupplier , getOrdersMoreThanOneLak , getOrderById, getOrdersLessThanOneLak, updateOrderStatus, getOrders, deleteOrder, createOrder, updateOrder} = require("../Controllers/OrderController");


router.post("/createOrder",createOrder);
router.get("/getAllOrders",getOrders);
router.get("/getOrderBy-Id",getOrderById);
router.get("/getOrdersMoreThanOneLak",getOrdersMoreThanOneLak);
router.get("/getOrdersLessThanOneLak",getOrdersLessThanOneLak);
router.get("/getOrderBySiteManagerId/:id",getOrdersToSitemanager);
router.get("/getOrderBySupplierId/:id",getOrdersToSupplier);
router.put("/getOrderStatus/:id",updateOrderStatus);
router.delete("/deleteOrder/:id",deleteOrder);
router.put("/updateOrder/:id",updateOrder);


module.exports = router;
