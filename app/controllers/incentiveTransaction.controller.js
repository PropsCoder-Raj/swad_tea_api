const db = require("../models");
const { incentiveTransaction: IncentiveTransaction } = db;

exports.getAllIncentiveTransaction = (req,res)=>{
    IncentiveTransaction.find({emp: req.params.empId},(err,data)=>{
        if(err){
          res.status(500).send({ status:"error", message: err });
        } else {
          res.status(200).send({
              status:"success",
              message : "All IncentiveTransaction",
              data: data
          });
        }
    }).sort({"createdAt":-1});
}

exports.getSingleIncentiveTransaction = (req,res)=>{
    IncentiveTransaction.find({_id:req.params.id},(err,data)=>{
        if(err){
          res.status(500).send({ status:"error", message: err });
        } else {
          res.status(200).send({
              status:"success",
              message : "IncentiveTransaction",
              data: data
          });
        }
    });
}

exports.createIncentiveTransaction = (req, res) => {
    const incentiveTransaction = new IncentiveTransaction({
      amount: req.body.amount,
      incentiveId: req.body.incentiveId,
      empId: req.body.empId
    });
  
    incentiveTransaction.save((err, data) => {
        if (err) {
            res.status(500).send({ message: err });
            return;
        }
  
        res.status(200).send({
            status:"success",
            message : "IncentiveTransaction Created Successful"
        });
    });
};

exports.updateIncentiveTransaction = (req,res)=>{
  IncentiveTransaction.findByIdAndUpdate(req.params.id,{$set:{
    amount: req.body.amount,
    incentiveId: req.body.incentiveId,
    empId: req.body.empId
  }},(err,data)=>{
    if(err){
      res.status(500).send({ status:"error", message: err });
    } else {
      res.status(200).send({
          status:"success",
          message : "IncentiveTransaction updated successfully"
      });
    }
  });
}


exports.deleteIncentiveTransaction = (req,res)=>{
    IncentiveTransaction.findByIdAndDelete(req.params.id,(err,data)=>{
      if(err){
        res.status(500).send({ status:"error", message: err });
      } else {
        res.status(200).send({
            status:"success",
            message : "IncentiveTransaction deleted successfully"
        });
      }
    });
}
