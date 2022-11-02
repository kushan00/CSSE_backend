const mongoose = require("mongoose");
const Order = require("../models/orderModel");


  test("create Order without required field should failed", async () => {
    const OrderWithoutRequiredField = new Order({ Company_details: "Company details testing"});
    let err;
    try {
      const savedOrderWithoutRequiredField =
        await OrderWithoutRequiredField.save();
      err = savedOrderWithoutRequiredField;
    } catch (error) {
      err = error;
    }
    expect(err).toBeInstanceOf(mongoose.Error.ValidationError);
    expect(err.errors.order_Id).toBeDefined();
  });

