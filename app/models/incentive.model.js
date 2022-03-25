const mongoose = require("mongoose");

const Incentive = mongoose.model(
  "Incentive",
  new mongoose.Schema({
    month: {type:Number},
    year: {type:Number},
    totalKg:{type:Number},
    achieveKg: {type:Number},
    totalAmount: {type:Number},
    incentive: {type:Number},
    balance: {type:Number},
    incentiveAmount: {type:Number},
    transfer: {type:Number},
    empId:{
        type: mongoose.Schema.Types.ObjectId,
        ref: "User"
    },
  }, {timestamps: true})
);

module.exports = Incentive;