const express = require("express");
const router = express.Router();


const {getInvoicesToSitemanager,getInvoicesToSupplier , getInvoices, deleteInvoice, createInvoice, updateInvoice} = require("../Controllers/InvoiceController");


router.post("/createInvoice",createInvoice);
router.get("/getAllInvoices",getInvoices);
router.get("/getInvoiceBySiteManagerId/:id",getInvoicesToSitemanager);
router.get("/getInvoiceBySupplierId/:id",getInvoicesToSupplier);
router.delete("/deleteInvoice/:id",deleteInvoice);
router.put("/updateInvoice/:id",updateInvoice);


module.exports = router;
