const db = require("../models");
const { visit: Visit, retailer: Retailer } = db;
const mongoose = require("mongoose");

exports.getAllVisit = (req, res) => {
    Visit.find({}, (err, data) => {
        if (err) {
            res.status(500).send({ status: "error", message: err });
        } else {
            res.status(200).send({
                status: "success",
                message: "All Visit",
                data: data
            });
        }
    });
}


exports.getAllVisitEmp = (req, res) => {
    Visit.find({ empId: req.params.empId }, (err, data) => {
        if (err) {
            res.status(500).send({ status: "error", message: err });
        } else {
                    res.status(200).send({
                        status: "success",
                        message: "All Visit",
                        data: data
                    });
        }
    }).sort({"createdAt":-1});
}


exports.getSingleVisit = (req, res) => {
    Visit.find({ _id: req.params.id }, (err, data) => {
        if (err) {
            res.status(500).send({ status: "error", message: err });
        } else {
            res.status(200).send({
                status: "success",
                message: "Visit",
                data: data
            });
        }
    });
}

exports.createVisit = (req, res) => {
    const visit = new Visit({
        reason: req.body.reason,
        remark: req.body.remark,
        empId: req.body.empId,
        retailerId: req.body.retailerId
    });

    visit.save((err, data) => {
        if (err) {
            res.status(500).send({ message: err });
            return;
        }

        res.status(200).send({
            status: "success",
            message: "Visit Created Successful"
        });
    });
};

exports.updateVisit = (req, res) => {
    Visit.findByIdAndUpdate(req.params.id, { $set: { reason: req.body.reason, remark: req.body.remark, empId: req.body.empId, retailerId: req.body.retailerId } }, (err, data) => {
        if (err) {
            res.status(500).send({ status: "error", message: err });
        } else {
            res.status(200).send({
                status: "success",
                message: "Visit updated successfully"
            });
        }
    });
}

exports.deleteVisit = (req, res) => {
    Visit.findByIdAndDelete(req.params.id, (err, data) => {
        if (err) {
            res.status(500).send({ status: "error", message: err });
        } else {
            res.status(200).send({
                status: "success",
                message: "Visit deleted successfully"
            });
        }
    });
}
