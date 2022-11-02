const mongoose = require("mongoose");
const Invoice = require("../models/invoiceModel");


  test("create Invoice without required field should failed", async () => {
    const InvoiceWithoutRequiredField = new Invoice({ total_price: "500000"});
    let err;
    try {
      const savedInvoiceWithoutRequiredField =
        await InvoiceWithoutRequiredField.save();
      err = savedInvoiceWithoutRequiredField;
    } catch (error) {
      err = error;
    }
    expect(err).toBeInstanceOf(mongoose.Error.ValidationError);
    expect(err.errors.order_Id).toBeDefined();
  });

