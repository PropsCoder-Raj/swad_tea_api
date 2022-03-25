const db = require("../models");
const { policy:Policy } = db;

exports.getAllPolicy = (req,res)=>{
    Policy.find({},(err,data)=>{
        if(err){
          res.status(500).send({ status:"error", message: err });
        } else {
          res.status(200).send({
              status:"success",
              message : "All Policy",
              data: data
          });
        }
    });
}

exports.getSinglePolicy = (req,res)=>{
    Policy.find({_id:req.params.id},(err,data)=>{
        if(err){
          res.status(500).send({ status:"error", message: err });
        } else {
          res.status(200).send({
              status:"success",
              message : "Policy",
              data: data
          });
        }
    });
}

exports.createPolicy = (req, res) => {
    const policy = new Policy({
      salesTeamIncentive: req.body.salesTeamIncentive,
      salesTeamTarget: req.body.salesTeamTarget,
      birthDayOfferIncentive: req.body.birthDayOfferIncentive,
      retailerIncentive: req.body.retailerIncentive,
      retailerTarget: req.body.retailerTarget,
      retailerFreeTEA: req.body.retailerFreeTEA,
      retailerBirthDayOfferIncentive: req.body.retailerBirthDayOfferIncentive
    });
  
    policy.save((err, data) => {
        if (err) {
            res.status(500).send({ message: err });
            return;
        }
  
        res.status(200).send({
            status:"success",
            message : "Policy Created Successful"
        });
    });
};

exports.updatePolicy = (req,res)=>{
  Policy.findByIdAndUpdate(req.params.id,{$set:{salesTeamIncentive: req.body.salesTeamIncentive,salesTeamTarget: req.body.salesTeamTarget,birthDayOfferIncentive: req.body.birthDayOfferIncentive,retailerIncentive: req.body.retailerIncentive,retailerTarget: req.body.retailerTarget,retailerFreeTEA: req.body.retailerFreeTEA,retailerBirthDayOfferIncentive: req.body.retailerBirthDayOfferIncentive
    }},(err,data)=>{
    if(err){
      res.status(500).send({ status:"error", message: err });
    } else {
      res.status(200).send({
          status:"success",
          message : "Policy updated successfully"
      });
    }
  });
}

exports.deletePolicy = (req,res)=>{
    Policy.findByIdAndDelete(req.params.id,(err,data)=>{
      if(err){
        res.status(500).send({ status:"error", message: err });
      } else {
        res.status(200).send({
            status:"success",
            message : "Policy deleted successfully"
        });
      }
    });
}
