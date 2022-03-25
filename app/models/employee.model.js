const mongoose = require("mongoose");

const Employee = mongoose.model(
  "Employee_Master",
  new mongoose.Schema({
    anniversaryDate: {type:String},
    dateOfJoning: {type:String},
    designation:{
        type: mongoose.Schema.Types.ObjectId,
        ref: "Designation"
    },
    reportingTo: {type:String},
    alloatedArea: [{type:String}],
    blackoutArea: [{type:String}],
    document: {
            url: {type:String},
            type: {type:String}
    },
    photo: {
            url: {type:String},
            type: {type:String}
    },
    remark: {type:String},
    targetInKg: {type:String},
    incentive: {type:String},
    referenceDetails: {type:String},
    user:{
        type: mongoose.Schema.Types.ObjectId,
        ref: "User"
    },
  }, {timestamps: true})
);

module.exports = Employee;