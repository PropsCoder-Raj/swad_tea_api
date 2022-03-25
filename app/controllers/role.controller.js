const db = require("../models");
const { role: Role } = db;

exports.getRolesAll = (req, res) => {
    Role.find({}, (err, data) => {
        if (err) {
            res.status(500).send({ status: "error", message: err });
        } else {
            res.status(200).send({
                status: "success",
                message: "All Role",
                data: data
            });
        }
    });
}