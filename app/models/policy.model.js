const mongoose = require("mongoose");

const Policy = mongoose.model(
  "Policy_Master",
  new mongoose.Schema({
    salesTeamIncentive: {type:Number},
    salesTeamTarget: {type:Number},
    birthDayOfferIncentive: {type:Number},
    retailerIncentive: {type:Number},
    retailerTarget: {type:Number},
    retailerFreeTEA: {type:Number},
    retailerBirthDayOfferIncentive: {type:Number},
  }, {timestamps: true})
);

module.exports = Policy;