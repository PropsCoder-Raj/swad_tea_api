const mongoose = require("mongoose");

const Orders = mongoose.model(
  "Orders",
  new mongoose.Schema({
    transportName: {type:String},
    transportContact: {type:Number},
    proformaInvoiceNo: {type:Number},
    items:[{
        productId:{
            type: mongoose.Schema.Types.ObjectId,
            ref: "Product_Master"
        },
        hsn:{type:String},
        productName:{type:String},
        size:{type:String},
        brand:{type:String},
        kgpkt:{type:String},
        bag:{type:String},
        quantity:{type:Number},
        discount:{type:Number},
        totalkgpkt:{type:Number},
        rate:{type:Number},
        amount:{type:Number}
    }],
    offers:{type:Array},
    subTotal: {type:Number},
    commission: {type:Number},
    commissionId:{
      type: mongoose.Schema.Types.ObjectId,
      ref: "Commission"
  },
    cgst:{type:Number},
    sgst:{type:Number},
    totalAmount:{type:Number},
    empId:{
        type: mongoose.Schema.Types.ObjectId,
        ref: "Employee_Master"
    },
    transportId:{
      type: mongoose.Schema.Types.ObjectId,
      ref: "Transport_Master"
  },
    retailerId:{
        type: mongoose.Schema.Types.ObjectId,
        ref: "Retailer_Master"
    },
    status:{type:String},
    paymentStatus:{type:String},
    paymentId:{type:String},
    invoiceStatus:{type:Boolean},
  }, {timestamps: true})
);

module.exports = Orders;