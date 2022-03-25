const mongoose = require("mongoose");

const Area = mongoose.model(
  "Area_Master",
  new mongoose.Schema({
    areaName: {type:String},
    state: {type:String},
    district: {type:String},
    city: {type:String},
    prospectSale: {type:String},
    status: {type:String}
  }, {timestamps: true})
);

module.exports = Area;