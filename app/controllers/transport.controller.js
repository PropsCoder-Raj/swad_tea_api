const db = require("../models");
const { transport: Transport } = db;

exports.getAllTransport = (req, res) => {
    Transport.find({}, (err, data) => {
        if (err) {
            res.status(500).send({ status: "error", message: err });
        } else {
            res.status(200).send({
                status: "success",
                message: "All Transport",
                data: data
            });
        }
    });
}

exports.getSingleTransport = (req, res) => {
    Transport.find({ _id: req.params.id }, (err, data) => {
        if (err) {
            res.status(500).send({ status: "error", message: err });
        } else {
            res.status(200).send({
                status: "success",
                message: "Transport",
                data: data
            });
        }
    });
}

exports.createTransport = (req, res) => {
    const transport = new Transport({
        transporterName: req.body.transporterName,
        contactPersonName: req.body.contactPersonName,
        gstTransporterId: req.body.gstTransporterId,
        mobile: req.body.mobile,
        address: req.body.address
    });

    transport.save((err, data) => {
        if (err) {
            res.status(500).send({ message: err });
            return;
        }

        res.status(200).send({
            status: "success",
            message: "Transport Created Successful"
        });
    });
};

exports.updateTransport = (req, res) => {
    Transport.findByIdAndUpdate(req.params.id, {
        $set: {
            transporterName: req.body.transporterName,
            contactPersonName: req.body.contactPersonName,
            gstTransporterId: req.body.gstTransporterId,
            mobile: req.body.mobile,
            address: req.body.address
        }
    }, (err, data) => {
        if (err) {
            res.status(500).send({ status: "error", message: err });
        } else {
            res.status(200).send({
                status: "success",
                message: "Transport updated successfully"
            });
        }
    });
}

exports.deleteTransport = (req, res) => {
    Transport.findByIdAndDelete(req.params.id, (err, data) => {
        if (err) {
            res.status(500).send({ status: "error", message: err });
        } else {
            res.status(200).send({
                status: "success",
                message: "Transport deleted successfully"
            });
        }
    });
}
