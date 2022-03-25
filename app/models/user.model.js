const mongoose = require("mongoose");

const User = mongoose.model(
  "User",
  new mongoose.Schema({
    name: {type:String},
    email: {type:String},
    password: {type:String},
    roles: [
      {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Role"
      }
    ],
    userId: {type: String},
    address: {type:String},
    district: {type:String},
    state: {type:String},
    city: {type:String},
    taluka: {type:String},
    contactPersonName: {type:String},
    mobileNo: {type:String},
    whatsappNo: {type:String},
    aadharCard: {type:String},
    areaOfExpertise: {type:String},
    gender: {type:String},
    birthDate: {type:String},
    status:{type:String},
    lastLoginOn:{type:Date}
  }, { timestamps: true })
);

module.exports = User;
