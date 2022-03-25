const db = require("../models");
const { designation:Designation } = db;

exports.getAllDesignation = (req,res)=>{
    Designation.find({},(err,data)=>{
        if(err){
          res.status(500).send({ status:"error", message: err });
        } else {
          res.status(200).send({
              status:"success",
              message : "All Designation",
              data: data
          });
        }
    });
}

exports.getSingleDesignation = (req,res)=>{
    Designation.find({_id:req.params.id},(err,data)=>{
        if(err){
          res.status(500).send({ status:"error", message: err });
        } else {
          res.status(200).send({
              status:"success",
              message : "Designation",
              data: data
          });
        }
    });
}

exports.createDesignation = (req, res) => {
    const designation = new Designation({
      designation: req.body.designation,
      status: req.body.status
    });
  
    designation.save((err, data) => {
        if (err) {
            res.status(500).send({ message: err });
            return;
        }
  
        res.status(200).send({
            status:"success",
            message : "Designation Created Successful"
        });
    });
};

exports.updateDesignation = (req,res)=>{
  Designation.findByIdAndUpdate(req.params.id,{$set:{designation: req.body.designation,status: req.body.status}},(err,data)=>{
    if(err){
      res.status(500).send({ status:"error", message: err });
    } else {
      res.status(200).send({
          status:"success",
          message : "Designation updated successfully"
      });
    }
  });
}

exports.updateDesignationStatus = (req, res) => {
    Designation.findByIdAndUpdate(req.params.id, { $set: { status: req.body.status } }, (err, data) => {
      if (err) {
        res.status(500).send({ status: "error", message: err });
      } else {
        res.status(200).send({
          status: "success",
          message: "Designation updated successfully"
        });
      }
    });
}


exports.deleteDesignation = (req,res)=>{
    Designation.findByIdAndDelete(req.params.id,(err,data)=>{
      if(err){
        res.status(500).send({ status:"error", message: err });
      } else {
        res.status(200).send({
            status:"success",
            message : "Designation deleted successfully"
        });
      }
    });
}
