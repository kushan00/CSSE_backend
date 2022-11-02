const mongoose = require("mongoose");
const Item = require("../models/itemModel");


  test("create Item without required field should failed", async () => {
    const ItemWithoutRequiredField = new Item({ unit_price: "5000"});
    let err;
    try {
      const savedItemWithoutRequiredField =
        await ItemWithoutRequiredField.save();
      err = savedItemWithoutRequiredField;
    } catch (error) {
      err = error;
    }
    expect(err).toBeInstanceOf(mongoose.Error.ValidationError);
    expect(err.errors.item_name).toBeDefined();
  });

