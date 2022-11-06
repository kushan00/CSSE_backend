const mongoose = require("mongoose");
const SupplierShop = require("../models/supplierShopModel");


  test("create SupplierShop without required field should failed", async () => {
    const SupplierShopWithoutRequiredField = new SupplierShop({ supplierShop_name: "supplier Shop name"});
    let err;
    try {
      const savedSupplierShopWithoutRequiredField =
        await SupplierShopWithoutRequiredField.save();
      err = savedSupplierShopWithoutRequiredField;
    } catch (error) {
      err = error;
    }
    expect(err).toBeInstanceOf(mongoose.Error.ValidationError);
    expect(err.errors.Location).toBeDefined();
  });

