const mongoose = require("mongoose");

const Visit = mongoose.model(
  "Visit",
  new mongoose.Schema({
    reason: {type:String},
    remark: {type:String},
    empId:{
      type: mongoose.Schema.Types.ObjectId,
      ref: "User"
    },
    retailerId:{
      type: mongoose.Schema.Types.ObjectId,
      ref: "User"
    }
  }, {timestamps: true})
);

module.exports = Visit;