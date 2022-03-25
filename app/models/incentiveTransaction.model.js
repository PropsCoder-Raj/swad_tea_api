const mongoose = require("mongoose");

const IncentiveTransaction = mongoose.model(
  "Incentive_Transaction",
  new mongoose.Schema({
    amount: {type:Number},
    incentiveId:{
        type: mongoose.Schema.Types.ObjectId,
        ref: "Incentive"
    },
    empId:{
        type: mongoose.Schema.Types.ObjectId,
        ref: "User"
    },
  }, {timestamps: true})
);

module.exports = IncentiveTransaction;