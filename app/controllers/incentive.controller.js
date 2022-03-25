const db = require("../models");
const {
    incentive: Incentive,
    orders: Orders,
    employee: Employee
} = db;
const mongoose = require("mongoose");

exports.createIncentive = async (req, res) => {
    let empId = mongoose.Types.ObjectId(req.body.empId);
    let incentive = 0;
    let totalKg = 0;
    let achieveKg = 0;
    let totalAmount = 0;
    let transfer = 0;
    let incentiveAmount=0;
    let incentiveCash= 0;
    let empCollection = await Employee.find({
        user: empId
    }).exec();
    incentive = empCollection[0].incentive;
    totalKg = empCollection[0].targetInKg;
    let orderCollection = await Orders.aggregate([{
            $match: {
                empId: empId
            }
        },
        {
            $project: {
                month: {
                    $month: "$createdAt"
                },
                year: {
                    $year: "$createdAt"
                },
                items: 1,
                subTotal: 1
            }
        }
    ]).exec();
    for (let i in orderCollection) {
        if (orderCollection[i].month == (new Date().getMonth()+1) && orderCollection[i].year == new Date().getFullYear()) {
            for (let j in orderCollection[i].items) {
                achieveKg += orderCollection[i].items[j].totalkgpkt;
            }
            totalAmount += orderCollection[i].subTotal;
        }
    }
    let incentiveCollection = await Incentive.find({
        empId: empId,
        month: new Date().getMonth() +1,
        year: new Date().getFullYear()
    }).exec();
    incentiveCash =(totalAmount * (incentive / 100)).toFixed(2);
    
    if(incentiveCollection.length > 0){
        if(incentiveCollection[0].transfer == undefined){
            transfer =0 ;
        }else{
        transfer = incentiveCollection[0].transfer;
    }
    }else{
        transfer = 0;
    }
   let updateincentive = await Incentive.updateOne({
        empId: empId,
        month: new Date().getMonth() +1,
        year: new Date().getFullYear()
    }, {
        $set: {
            totalKg: totalKg,
            achieveKg: achieveKg,
            totalAmount: totalAmount,
            incentive: incentive,
            balance:    (incentiveCash - transfer).toFixed(2),
            incentiveAmount: incentiveCash
        }
    }, {
        upsert: true
    }).exec();

        res.status(200).send({
            status: "success",
            message: "Incentive Created Successfully",
            data: updateincentive
        });
}


exports.getAllIncentiveByEmp = async (req,res)=>{
    let empId = mongoose.Types.ObjectId(req.params.empId)
    let incentiveCollection = await Incentive.aggregate([{$match:{
        empId:empId
    }}]).exec();
    res.status(200).send({
        status: "success",
        message: "All Incentive Emp",
        data: incentiveCollection
    });
}

exports.updateIncentiveBalanceTransfer = (req, res) => {
    console.log(req.params.id);
    console.log(req.body);
    Incentive.findByIdAndUpdate(req.params.id, {
        $set: {
            balance: req.body.balance,
            transfer: req.body.transfer
        }
    }, (err, data) => {

        if (err) {
            res.status(500).send({ status: "error", message: err });
        } else {
            res.status(200).send({
                status: "success",
                message: "Incentive updated successfully"
            });
        }
    });
}