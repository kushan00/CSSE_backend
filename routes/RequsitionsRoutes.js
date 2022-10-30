const express = require("express");
const router = express.Router();

const {getRequsitionById, getRequsitionToSiteManager , getRequsitionToSupplier,updateRequsitionStatus, getRequsitions, createRequsition, updateRequsition, deleteRequsition } = require("../Controllers/RequsitionsController");

router.post("/createRequsition",createRequsition);
router.get("/getAllRequsitions",getRequsitions);
router.get("/getRequsitionById/:id",getRequsitionById)
router.get("/getRequsitionBySiteManagerId/:id",getRequsitionToSiteManager);
router.get("/getRequsitionBySupplier/:id",getRequsitionToSupplier);
router.put("/getRequsitionByStatus/:id",updateRequsitionStatus);
router.delete("/deleteRequsition/:id",deleteRequsition);
router.put("/updateRequsition/:id",updateRequsition);


module.exports = router;