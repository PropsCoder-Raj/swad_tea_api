const mongoose = require("mongoose");

const Scheme = mongoose.model(
  "Scheme",
  new mongoose.Schema({
    productType: {type:String},
    targetKg: {type:Number},
    stdSize: {type:Number},
    freeKg: {type:Number},
    productId:{
      type: mongoose.Schema.Types.ObjectId,
      ref: "Product_Master"
    }
  }, {timestamps: true})
);

module.exports = Scheme;