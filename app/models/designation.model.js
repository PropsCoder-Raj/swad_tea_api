const mongoose = require("mongoose");

const Designation = mongoose.model(
  "Designation",
  new mongoose.Schema({
    designation: {type:String},
    status: {type:String},
  }, {timestamps: true})
);

module.exports = Designation;