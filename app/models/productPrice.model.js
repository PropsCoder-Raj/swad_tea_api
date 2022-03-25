const mongoose = require("mongoose");

const ProductPrice = mongoose.model(
  "Product_Price_Master",
  new mongoose.Schema({
    productCode: {type:String},
    productName: {type:String},
    stdSize: {type:String},
    uom: {type:String},
    mrp: {type:String},
    discount: {type:String},
    retailerRate: {type:String},
    product:{
        type: mongoose.Schema.Types.ObjectId,
        ref: "Product_Master"
    }
  }, {timestamps: true})
);

module.exports = ProductPrice;