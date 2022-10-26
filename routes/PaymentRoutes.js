const express = require("express");
const router = express.Router();

const {deletepayment,getPaymentToFinancal , getPaymentToSiteManager, getPaymentToSupplier, getPayments,createPayment} = require("../Controllers/paymentController");


router.post("/createPayment",createPayment);
router.get("/getPayments",getPayments);
router.get("/getPaymentToFinancal/:id",getPaymentToFinancal);
router.get("/getPaymentToSiteManager/:id",getPaymentToSiteManager);
router.get("/getPaymentToSupplier/:id",getPaymentToSupplier);
router.delete("/deletepayment/:id",deletepayment);



module.exports = router;
