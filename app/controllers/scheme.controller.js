const db = require("../models");
const { scheme: Scheme } = db;
const mongoose = require("mongoose");

exports.getAllScheme = (req, res) => {
  Scheme.aggregate([{
    $lookup: {
      from: "product_masters",
      localField: "productId",
      foreignField: '_id',
      as: "productData"
    }
  }], (err, data) => {
    if (err) {
      res.status(500).send({ status: "error", message: err });
    } else {
      res.status(200).send({
        status: "success",
        message: "All Scheme",
        data: data
      });
    }
  });
}

exports.getSingleScheme = (req, res) => {
  const id = mongoose.Types.ObjectId(req.params.id);
  Scheme.aggregate([{ $match: { _id: id } }, {
    $lookup: {
      from: "product_masters",
      localField: "productId",
      foreignField: '_id',
      as: "productData"
    }
  }], (err, data) => {
    if (err) {
      res.status(500).send({ status: "error", message: err });
    } else {
      res.status(200).send({
        status: "success",
        message: "Scheme",
        data: data
      });
    }
  });
}

exports.createScheme = (req, res) => {
  const scheme = new Scheme({
    productType: req.body.productType,
    targetKg: req.body.targetKg,
    stdSize: req.body.stdSize,
    freeKg: req.body.freeKg,
    productId:req.body.productId
  });

  scheme.save((err, data) => {
    if (err) {
      res.status(500).send({ message: err });
      return;
    }

    res.status(200).send({
      status: "success",
      message: "Scheme Created Successful"
    });
  });
};

exports.updateScheme = (req, res) => {
  Scheme.findByIdAndUpdate(req.params.id,{$set:{productType: req.body.productType,targetKg: req.body.targetKg,stdSize: req.body.stdSize,freeKg: req.body.freeKg
    ,productId:req.body.productId}},(err,data)=>{
    if (err) {
      res.status(500).send({ status: "error", message: err });
    } else {
      res.status(200).send({
        status: "success",
        message: "Scheme updated successfully"
      });
    }
  });
}

exports.deleteScheme = (req, res) => {
  Scheme.findByIdAndDelete(req.params.id, (err, data) => {
    if (err) {
      res.status(500).send({ status: "error", message: err });
    } else {
      res.status(200).send({
        status: "success",
        message: "Scheme deleted successfully"
      });
    }
  });
}
