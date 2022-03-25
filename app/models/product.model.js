const mongoose = require("mongoose");

const Product = mongoose.model(
  "Product_Master",
  new mongoose.Schema({
    productCode: {type:String},
    productType: {type:String},
    productName: {type:String},
    productHindiName: {type:String},
    tag: {type:String},
    uom: {type:String},
    brand: {type:String},
    group: {type:String},
    size: {type:String},
    hsnNo: {type:String},
    stdSize: {type:Number},
    mrp: {type:Number},
    discount: {type:Number},
    retailerRate: {type:Number}
  }, {timestamps: true})
);

module.exports = Product;