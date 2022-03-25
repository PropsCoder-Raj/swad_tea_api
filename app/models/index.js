const mongoose = require('mongoose');
mongoose.Promise = global.Promise;

const db = {};

db.mongoose = mongoose;


db.user = require("./user.model");
db.role = require("./role.model");
db.refreshToken = require("./refreshToken.model");

db.designation = require("./designation.model");
db.area = require("./area.model");
db.policy = require("./policy.model");
db.product = require("./product.model");
db.productPrice = require("./productPrice.model");
db.employee = require("./employee.model");
db.retailer = require("./retailer.model");
db.orders = require("./orders.model");
db.scheme = require("./scheme.model");
db.incentive = require("./incentive.model");
db.commission = require("./commission.model");
db.visit = require("./visit.model");
db.transport = require("./transport.model");
db.incentiveTransaction = require("./incentiveTransaction.model");

db.ROLES = ["user", "admin", "retailers", "employees"];

module.exports = db;