const mongoose = require("mongoose");

const Retailer = mongoose.model(
  "Retailer_Master",
  new mongoose.Schema({
    firmName: {type:String},
    anniverysaryDate: {type:String},
    gstinNo: {type:String},
    fssailicNo: {type:String},
    potentialSale: {type:String},
    target: {type:String},
    incentive: {type:String},
    discount: {type:String},
    accountManager: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "User"
    },
    srAccountManager: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "User"
    },
    referenceDetails: {type:String},
    document: {
            url: {type:String},
            type: {type:String}
    },
    selfi: {
            url: {type:String},
            type: {type:String}
    },
    photo: {
            url: {type:String},
            type: {type:String}
    },
    user:{
        type: mongoose.Schema.Types.ObjectId,
        ref: "User"
    },
  }, {timestamps: true})
);

module.exports = Retailer;