const mongoose = require("mongoose");
const Requsition = require("../models/requsitionModel");


  test("create Requsition without required field should failed", async () => {
    const RequsitionWithoutRequiredField = new Requsition({ Company_details: "Company details"});
    let err;
    try {
      const savedRequsitionWithoutRequiredField =
        await RequsitionWithoutRequiredField.save();
      err = savedRequsitionWithoutRequiredField;
    } catch (error) {
      err = error;
    }
    expect(err).toBeInstanceOf(mongoose.Error.ValidationError);
    expect(err.errors.delivery_details).toBeDefined();
  });

