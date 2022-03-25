const db = require("../models");
const { employee: Employee, user: User, designation: Designation, role: Role, incentive: Incentive } = db;
var bcrypt = require("bcryptjs");
const mongoose = require("mongoose");

exports.getAllEmployee = (req, res) => {
    Employee.find({}, (err, data) => {
        if (err) {
            res.status(500).send({ status: "error", message: err });
        } else {
            res.status(200).send({
                status: "success",
                message: "All Employee",
                data: data
            });
        }
    });
}

exports.getAllEmployeeWithIncentive = (req, res) => {
    Employee.find({}, (err, data) => {
        if (err) {
            res.status(500).send({ status: "error", message: err });
        } else {
            let empData = [];
            
            data.forEach((element) => {
                Incentive.find({ empId: element['user'] }, (err, data1) => {
                    if (err) {
                        res.status(500).send({ status: "error", message: err });
                    } else {
                        console.log(data1);
                        let totalIncentive = 0;
                        for (let i in data1) {
                            totalIncentive = data1[i]['incentiveAmount'];
                        }   
                        empData.push({ data: element, totalIncentive: totalIncentive });
                    }
                });
            });

            let interval = setInterval(() => {
                if(empData.length === data.length){
                    clearInterval(interval);
                    res.status(200).send({
                        status: "success",
                        message: "All Employee",
                        data: empData
                    });
                }
            })
        }
    });
}

exports.getSingleEmployee = (req, res) => {
     
    Employee.find({ _id: req.params.id }, (err, data) => {
        if (err) {
            res.status(500).send({ status: "error", message: err });
        } else {
            res.status(200).send({
                status: "success",
                message: "Employee",
                data: data
            });
        }
    });
}

exports.getSingleEmployeeByUser = (req, res) => {
    const empid = mongoose.Types.ObjectId(req.params.id);
    Employee.aggregate([{$match:{ user: empid }},{$lookup:{from:"users",localField:"user",foreignField:'_id',as:"userData"}}], (err, data) => {
        if (err) {
            res.status(500).send({ status: "error", message: err });
        } else {
            res.status(200).send({
                status: "success",
                message: "Employee",
                data: data
            });
        }
    });
}

exports.createEmployee = (req, res) => {
    console.log(req.body);

    const user = new User({
        name: req.body.name,
        email: req.body.email,
        password: bcrypt.hashSync(req.body.password, 8),
        userId:req.body.userId,
        address:req.body.address,
        state:req.body.state,
        city:req.body.city,
        mobileNo:req.body.mobileNo,
        areaOfExpertise:req.body.areaOfExpertise,
        gender:req.body.gender,
        birthDate:req.body.birthDate,
        status:req.body.status,
        aadharCard: req.body.aadharCard
    });

    user.save((err, user) => {
        console.log(user);
        if (err) {
            res.status(500).send({ message: err });
            return;
        }
        if (req.body.roles) {
            Role.find({ name: { $in: req.body.roles } }, (err, roles) => {
                if (err) {
                    res.status(500).send({ message: "Role must not be empty" });
                    return;
                }

                user.roles = roles.map(role => role._id);
                user.save(err => {
                    if (err) {
                        res.status(500).send({ message: err });
                        return;
                    }

                    Designation.find({ _id: req.body.designation }, (err, designationData) => {
                        if (!req.body.designation) {
                            res.status(400).send({ message: "Designation Id Required" });
                            return;
                        }

                        const employee = new Employee({
                            anniversaryDate: req.body.anniversaryDate,
                            dateOfJoning: req.body.dateOfJoning,
                            reportingTo: req.body.reportingTo,
                            alloatedArea: req.body.alloatedArea,
                            blackoutArea: req.body.blackoutArea,
                            remark: req.body.remark,
                            targetInKg: req.body.targetInKg,
                            incentive: req.body.incentive,
                            referenceDetails: req.body.referenceDetails,
                            document: req.body.document,
                            photo: req.body.photo,
                            designation: designationData[0],
                            user: user
                        });

                        employee.save((err, data) => {
                            if (err) {
                                res.status(500).send({ message: err });
                                return;
                            }

                            res.status(200).send({
                                status: "success",
                                message: "Employee Created Successful"
                            });
                        });
                    });
                });
            }
            );
        }
    });
}

exports.updateEmployeeAlloatedArea = (req, res) => {
    Employee.findByIdAndUpdate(req.params.id, {
        $set: {
            alloatedArea: req.body.alloatedArea
        }
    }, (err, data) => {
        if (err) {
            res.status(500).send({ status: "error", message: err });
        } else {
            res.status(200).send({
                status: "success",
                message: "Employee updated successfully"
            });
        }
    });
}

exports.updateEmployeeBlackoutArea = (req, res) => {
    Employee.findByIdAndUpdate(req.params.id, {
        $set: {
            blackoutArea: req.body.blackoutArea
        }
    }, (err, data) => {
        if (err) {
            res.status(500).send({ status: "error", message: err });
        } else {
            res.status(200).send({
                status: "success",
                message: "Employee updated successfully"
            });
        }
    });
}

exports.updateEmployee = (req, res) => {
    Designation.find({ _id: req.body.designation }, (err, designationData) => {
        if (!req.body.designation) {
            res.status(400).send({ message: "Designation Id Required" });
            return;
        }

        Employee.findByIdAndUpdate(req.params.id, {
            $set: {
                anniversaryDate: req.body.anniversaryDate,
                dateOfJoning: req.body.dateOfJoning,
                reportingTo: req.body.reportingTo,
                alloatedArea: req.body.alloatedArea,
                blackoutArea: req.body.blackoutArea,
                remark: req.body.remark,
                targetInKg: req.body.targetInKg,
                incentive: req.body.incentive,
                referenceDetails: req.body.referenceDetails,
                document: req.body.document,
                photo: req.body.photo,
                designation: designationData[0]
            }
        }, (err, data) => {
            if (err) {
                res.status(500).send({ status: "error", message: err });
            } else {
                
                User.findByIdAndUpdate(req.body._uid, {
                    $set: {
                        name: req.body.name,
                        email: req.body.email,
                        userId:req.body.userId,
                        address:req.body.address,
                        state:req.body.state,
                        city:req.body.city,
                        mobileNo:req.body.mobileNo,
                        areaOfExpertise:req.body.areaOfExpertise,
                        gender:req.body.gender,
                        birthDate:req.body.birthDate,
                        status:req.body.status,
                        aadharCard: req.body.aadharCard
                    }
                }, (err, data) => {
                    if (err) {
                        res.status(500).send({ status: "error", message: err });
                    } else {
                        
                        res.status(200).send({
                            status: "success",
                            message: "Employee updated successfully"
                        });
                    }
                });
            }
        });
    });
}

exports.deleteEmployee = (req, res) => {
    Employee.findByIdAndDelete(req.params.id, (err, data) => {
        if (err) {
            res.status(500).send({ status: "error", message: err });
        } else {
            res.status(200).send({
                status: "success",
                message: "Employee deleted successfully"
            });
        }
    });
}
