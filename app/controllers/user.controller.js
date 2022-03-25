const db = require("../models");
const { user: User } = db;

// Get Single User
exports.getsingleUser = (req,res)=>{
  User.findById(req.params.id,(err,data)=>{
    if(err){
        res.status(500).send({ status:"error", message: err });
    } else {
        res.status(200).send({
            status:"success",
            message : "Single User retrieved",
            data: data
        });
    }
  });
}

exports.updateStatus = (req, res) => {
    User.findByIdAndUpdate(req.params.id, { $set: { status: req.body.status } }, (err, data) => {
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