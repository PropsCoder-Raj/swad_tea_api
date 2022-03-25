const mongoose = require("mongoose");

const Commission = mongoose.model(
  "Commission",
  new mongoose.Schema({
    target: {type:Number},
    commission: {type:Number}
  }, {timestamps: true})
);

module.exports = Commission;