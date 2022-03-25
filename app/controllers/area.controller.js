const db = require("../models");
const { area:Area } = db;

exports.getAllArea = (req,res)=>{
    Area.find({},(err,data)=>{
        if(err){
          res.status(500).send({ status:"error", message: err });
        } else {
          res.status(200).send({
              status:"success",
              message : "All Area",
              data: data
          });
        }
    });
}

exports.getSingleArea = (req,res)=>{
    Area.find({_id:req.params.id},(err,data)=>{
        if(err){
          res.status(500).send({ status:"error", message: err });
        } else {
          res.status(200).send({
              status:"success",
              message : "Area",
              data: data
          });
        }
    });
}

exports.createArea = (req, res) => {
    const area = new Area({
      areaName: req.body.areaName,
      state: req.body.state,
      district: req.body.district,
      city: req.body.city,
      prospectSale: req.body.prospectSale,
      status: req.body.status
    });
  
    area.save((err, data) => {
        if (err) {
            res.status(500).send({ message: err });
            return;
        }
  
        res.status(200).send({
            status:"success",
            message : "Area Created Successful"
        });
    });
};

exports.updateArea = (req,res)=>{
  Area.findByIdAndUpdate(req.params.id,{$set:{areaName: req.body.areaName,state: req.body.state,district: req.body.district,city: req.body.city,prospectSale: req.body.prospectSale,status: req.body.status}},(err,data)=>{
    if(err){
      res.status(500).send({ status:"error", message: err });
    } else {
      res.status(200).send({
          status:"success",
          message : "Area updated successfully"
      });
    }
  });
}

exports.updateAreaStatus = (req, res) => {
    Area.findByIdAndUpdate(req.params.id, { $set: { status: req.body.status } }, (err, data) => {
      if (err) {
        res.status(500).send({ status: "error", message: err });
      } else {
        res.status(200).send({
          status: "success",
          message: "Area updated successfully"
        });
      }
    });
}


exports.deleteArea = (req,res)=>{
    Area.findByIdAndDelete(req.params.id,(err,data)=>{
      if(err){
        res.status(500).send({ status:"error", message: err });
      } else {
        res.status(200).send({
            status:"success",
            message : "Area deleted successfully"
        });
      }
    });
}
