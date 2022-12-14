const express = require("express");
const dotenv = require("dotenv");
const cors = require("cors");
const mongoose = require("mongoose");
const bodyParser = require("body-parser");

dotenv.config();

const app = express();

app.use(express.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());
app.use(
  cors({
    origin: ["http://localhost:3000"],
    credentials:true
  })
);

const PORT = process.env.PORT || 5000;

app.listen(PORT, () => console.log(`Server successfully  started on : ${PORT}`));



mongoose.connect(
  process.env.DB_LINK,
  {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  },
  (err) => {
    if (err) return console.error(err);
    console.log("Successfully Connected to MongoDB");
  }
);


//import routes
const User = require("./routes/userRoutes");
const Requsition = require("./routes/RequsitionsRoutes");
const Orders = require("./routes/OrdersRoutes");
const Invoice = require("./routes/InvoiceRoutes");
const Payment = require("./routes/PaymentRoutes");
const Item = require ("./routes/ItemRoutes");
const SupplierShop = require ("./routes/SupplierShopRoutes");
const Card = require ("./routes/cardRoutes");

//User management routes
app.use("/user",User);
app.use("/requsition",Requsition);
app.use("/order",Orders);
app.use("/invoice",Invoice);
app.use("/payment",Payment);
app.use("/item",Item);
app.use("/supplierShop",SupplierShop);
app.use("/card",Card);