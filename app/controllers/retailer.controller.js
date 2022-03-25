const db = require("../models");
const { retailer: Retailer, user: User, designation: Designation, role: Role ,orders:Orders} = db;
var bcrypt = require("bcryptjs");
const { mongoose } = require("../models");

exports.getAllRetailer = (req, res) => {
    Retailer.find({}, (err, data) => {
        if (err) {
            res.status(500).send({ status: "error", message: err });
        } else {
            res.status(200).send({
                status: "success",
                message: "All Retailer",
                data: data
            });
        }
    });
}

exports.getAllRetailerByEmployee = async (req, res) => {
    let data = [];
    const empid = mongoose.Types.ObjectId(req.params.empId);
    let retailarCollection= await  Retailer.aggregate([{ $match:{ $or: [{ accountManager: empid }, { srAccountManager: empid }] }},{$lookup:{from:"users",localField:"user",foreignField:'_id',as:"userData"}}]);
    
    for(let i in retailarCollection){
        let kg = 0;
        let orderCount = await Orders.find({retailerId: retailarCollection[i]._id}).count();
        let orders = await Orders.aggregate([{$match:{retailerId: retailarCollection[i]._id}}]).exec();
        for(let j in orders){
            for(let k  in orders[j].items){
                    kg += orders[j].items[k].totalkgpkt;
            }
        }
        data.push({retailer:retailarCollection[i],orders:orderCount,totalKg:kg});
    }
    res.status(200).send({
        status: "success",
        message: "All Retailer",
        data: data
    });
   
}



exports.getSingleRetailerByUser = (req, res) => {
    const rtlid = mongoose.Types.ObjectId(req.params.id);
    Retailer.aggregate([{$match:{ user: rtlid }},{$lookup:{from:"users",localField:"user",foreignField:'_id',as:"userData"}}], (err, data) => {
        if (err) {
            res.status(500).send({ status: "error", message: err });
        } else {
            res.status(200).send({
                status: "success",
                message: "Retailer",
                data: data
            });
        }
    });
}


exports.getSingleRetailer = (req, res) => {
    const empid = mongoose.Types.ObjectId(req.params.id);
    Retailer.aggregate([{$match:{ _id: empid }},{$lookup:{from:"users",localField:"user",foreignField:'_id',as:"userData"}}], (err, data) => {
        if (err) {
            res.status(500).send({ status: "error", message: err });
        } else {
            res.status(200).send({
                status: "success",
                message: "Retailer",
                data: data
            });
        }
    });
}

exports.createRetailerByEmp = (req, res) => {
    console.log(req.body);

    const user = new User({
        email: req.body.email,
        address:req.body.address,
        district: req.body.district,
        state: req.body.state,
        city: req.body.city,
        taluka: req.body.taluka,
        contactPersonName: req.body.contactPersonName,
        mobileNo:req.body.mobileNo,
        whatsappNo: req.body.whatsappNo,
        status:req.body.status,
      
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

                    User.find({ _id: req.body.accountManager }, (err, accountManagerData) => {
                        if (!req.body.accountManager) {
                            res.status(400).send({ message: "AccountManager Id Required" });
                            return;
                        }

                        User.find({ _id: req.body.srAccountManager }, (err, srAccountManagerData) => {
                            if (!req.body.srAccountManager) {
                                res.status(400).send({ message: "SrAccountManager Id Required" });
                                return;
                            }

                            const retailer = new Retailer({
                                accountManager: accountManagerData[0],
                                srAccountManager: srAccountManagerData[0],
                                firmName: req.body.firmName,
                                gstinNo: req.body.gstinNo,
                                fssailicNo: req.body.fssailicNo,
                                user: user
                            });

                            retailer.save((err, data) => {
                                if (err) {
                                    res.status(500).send({ message: err });
                                    return;
                                }

                                res.status(200).send({
                                    status: "success",
                                    message: "Retailer Created Successful"
                                });
                            });
                        });    
                    });
                });
            }
            );
        }
    });
};

exports.createRetailer = (req, res) => {
    console.log(req.body);

    const user = new User({
        email: req.body.email,
        password: bcrypt.hashSync(req.body.password, 8),
        userId:req.body.userId,
        address:req.body.address,
        district: req.body.district,
        state: req.body.state,
        city: req.body.city,
        taluka: req.body.taluka,
        contactPersonName: req.body.contactPersonName,
        mobileNo:req.body.mobileNo,
        whatsappNo: req.body.whatsappNo,
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

                    User.find({ _id: req.body.accountManager }, (err, accountManagerData) => {
                        if (!req.body.accountManager) {
                            res.status(400).send({ message: "AccountManager Id Required" });
                            return;
                        }

                        User.find({ _id: req.body.srAccountManager }, (err, srAccountManagerData) => {
                            if (!req.body.srAccountManager) {
                                res.status(400).send({ message: "SrAccountManager Id Required" });
                                return;
                            }

                            const retailer = new Retailer({
                                accountManager: accountManagerData[0],
                                srAccountManager: srAccountManagerData[0],
                                anniversaryDate: req.body.anniversaryDate,
                                firmName: req.body.firmName,
                                gstinNo: req.body.gstinNo,
                                fssailicNo: req.body.fssailicNo,
                                potentialSale: req.body.potentialSale,
                                target: req.body.target,
                                incentive: req.body.incentive,
                                discount: req.body.discount,
                                referenceDetails: req.body.referenceDetails,
                                document: req.body.document,
                                selfi: req.body.selfi,
                                photo: req.body.photo,
                                user: user
                            });

                            retailer.save((err, data) => {
                                if (err) {
                                    res.status(500).send({ message: err });
                                    return;
                                }

                                res.status(200).send({
                                    status: "success",
                                    message: "Retailer Created Successful"
                                });
                            });
                        });    
                    });
                });
            }
            );
        }
    });
};

exports.updateRetailer = (req, res) => {
    
    User.find({ _id: req.body.accountManager }, (err, accountManagerData) => {
        if (!req.body.accountManager) {
            res.status(400).send({ message: "AccountManager Id Required" });
            return;
        }

        User.find({ _id: req.body.srAccountManager }, (err, srAccountManagerData) => {
            if (!req.body.srAccountManager) {
                res.status(400).send({ message: "SrAccountManager Id Required" });
                return;
            }

            Retailer.findByIdAndUpdate(req.params.id, {
                $set: {
                    accountManager: accountManagerData[0],
                    srAccountManager: srAccountManagerData[0],
                    anniversaryDate: req.body.anniversaryDate,
                    firmName: req.body.firmName,
                    gstinNo: req.body.gstinNo,
                    fssailicNo: req.body.fssailicNo,
                    potentialSale: req.body.potentialSale,
                    target: req.body.target,
                    incentive: req.body.incentive,
                    discount: req.body.discount,
                    referenceDetails: req.body.referenceDetails,
                    document: req.body.document,
                    selfi: req.body.selfi,
                    photo: req.body.photo
                }
            }, (err, data) => {
                if (err) {
                    res.status(500).send({ status: "error", message: err });
                } else {
                    
                    User.findByIdAndUpdate(req.body._uid, {
                        $set: {
                            email: req.body.email,
                            userId:req.body.userId,
                            address:req.body.address,
                            district: req.body.district,
                            state: req.body.state,
                            city: req.body.city,
                            taluka: req.body.taluka,
                            contactPersonName: req.body.contactPersonName,
                            mobileNo:req.body.mobileNo,
                            whatsappNo: req.body.whatsappNo,
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
    });
}

exports.deleteRetailer = (req, res) => {
    Retailer.findByIdAndDelete(req.params.id, (err, data) => {
        if (err) {
            res.status(500).send({ status: "error", message: err });
        } else {
            res.status(200).send({
                status: "success",
                message: "Retailer deleted successfully"
            });
        }
    });
}
