const mongoose = require("mongoose");

const Transport = mongoose.model(
  "Transport_Master",
  new mongoose.Schema({
    transporterName: {type:String},
    contactPersonName: {type:String},
    gstTransporterId: {type:String},
    mobile: {type:Number},
    address: {type:String},
  }, {timestamps: true})
);

module.exports = Transport;