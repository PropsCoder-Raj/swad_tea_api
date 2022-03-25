const db = require("../models");
const { commission:Commission } = db;

exports.getAllCommission = (req,res)=>{
    Commission.find({},(err,data)=>{
        if(err){
          res.status(500).send({ status:"error", message: err });
        } else {
          res.status(200).send({
              status:"success",
              message : "All Commission",
              data: data
          });
        }
    }).sort({"createdAt":-1});
}

exports.getTopCommission = (req,res)=>{
  Commission.find({},(err,data)=>{
      if(err){
        res.status(500).send({ status:"error", message: err });
      } else {
        res.status(200).send({
            status:"success",
            message : "All Commission",
            data: data[0]
        });
      }
  }).sort({"createdAt":-1});
}

exports.getSingleCommission = (req,res)=>{
    Commission.find({_id:req.params.id},(err,data)=>{
        if(err){
          res.status(500).send({ status:"error", message: err });
        } else {
          res.status(200).send({
              status:"success",
              message : "Commission",
              data: data
          });
        }
    });
}

exports.createCommission = (req, res) => {
    const commission = new Commission({
      target: req.body.target,
      commission: req.body.commission
    });
  
    commission.save((err, data) => {
        if (err) {
            res.status(500).send({ message: err });
            return;
        }
  
        res.status(200).send({
            status:"success",
            message : "Commission Created Successful"
        });
    });
};

exports.updateCommission = (req,res)=>{
  Commission.findByIdAndUpdate(req.params.id,{$set:{target: req.body.target,commission: req.body.commission
    }},(err,data)=>{
    if(err){
      res.status(500).send({ status:"error", message: err });
    } else {
      res.status(200).send({
          status:"success",
          message : "Commission updated successfully"
      });
    }
  });
}

exports.deleteCommission = (req,res)=>{
    Commission.findByIdAndDelete(req.params.id,(err,data)=>{
      if(err){
        res.status(500).send({ status:"error", message: err });
      } else {
        res.status(200).send({
            status:"success",
            message : "Commission deleted successfully"
        });
      }
    });
}
