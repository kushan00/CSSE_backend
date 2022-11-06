const mongoose = require("mongoose");
const Payment = require("../models/paymentModel");


  test("create Payment without required field should failed", async () => {
    const PaymentWithoutRequiredField = new Payment({ total_amount: "500000"});
    let err;
    try {
      const savedPaymentWithoutRequiredField =
        await PaymentWithoutRequiredField.save();
      err = savedPaymentWithoutRequiredField;
    } catch (error) {
      err = error;
    }
    expect(err).toBeInstanceOf(mongoose.Error.ValidationError);
    expect(err.errors.invoice_Id).toBeDefined();
  });

