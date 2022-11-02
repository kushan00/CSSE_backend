const mongoose = require("mongoose");
const Card = require("../models/cardModel");


  test("create Card without required field should failed", async () => {
    const CardWithoutRequiredField = new Card({ cardNum: "Card Num testing"});
    let err;
    try {
      const savedCardWithoutRequiredField =
        await CardWithoutRequiredField.save();
      err = savedCardWithoutRequiredField;
    } catch (error) {
      err = error;
    }
    expect(err).toBeInstanceOf(mongoose.Error.ValidationError);
    expect(err.errors.holder).toBeDefined();
  });

