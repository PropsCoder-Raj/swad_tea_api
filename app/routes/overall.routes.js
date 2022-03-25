const { authJwt } = require("../middlewares");
const designation = require("../controllers/designation.controller");
const area = require("../controllers/area.controller");
const policy = require("../controllers/policy.controller");
const product = require("../controllers/product.controller");
const order = require("../controllers/orders.controller");
const incentive = require("../controllers/incentive.controller");
const productPrice = require("../controllers/productPrice.controller");
const employee = require("../controllers/employee.controller");
const user = require("../controllers/user.controller");
const retailer = require("../controllers/retailer.controller");
const roleController = require("../controllers/role.controller");
const schemeController = require("../controllers/scheme.controller");
const commissionController = require("../controllers/commission.controller");
const visitController = require("../controllers/visit.controller");
const transportController = require("../controllers/transport.controller");
const incentiveTransaction = require("../controllers/incentiveTransaction.controller");

module.exports = function(app) {
    app.use(function(req, res, next) {
      res.header(
        "Access-Control-Allow-Headers",
        "x-access-token, Origin, Content-Type, Accept"
      );
      next();
    });

    
    app.get("/api/role-all/", roleController.getRolesAll);
    // app.put("/api/update-brand/", product.updateBrandData);

    // IncentiveTransaction Controller
    app.get("/api/incentive-transaction/:empId",incentiveTransaction.getAllIncentiveTransaction);
    app.get("/api/incentive-transaction/:id",incentiveTransaction.getSingleIncentiveTransaction);    
    app.post("/api/incentive-transaction", [authJwt.verifyToken],incentiveTransaction.createIncentiveTransaction);
    app.put("/api/incentive-transaction/:id",[authJwt.verifyToken],incentiveTransaction.updateIncentiveTransaction);
    app.delete("/api/incentive-transaction/:id",[authJwt.verifyToken],incentiveTransaction.deleteIncentiveTransaction);


    // Transport Controller
    app.get("/api/transport",transportController.getAllTransport);
    app.get("/api/transport/:id",transportController.getSingleTransport);    
    app.post("/api/transport", [authJwt.verifyToken],transportController.createTransport);
    app.put("/api/transport/:id",[authJwt.verifyToken],transportController.updateTransport);
    app.delete("/api/transport/:id",[authJwt.verifyToken],transportController.deleteTransport);
    
    // Visit Controller
    app.get("/api/visit",visitController.getAllVisit);
    app.get("/api/visit-emp/:empId",visitController.getAllVisitEmp);    
    app.get("/api/visit/:id",visitController.getSingleVisit);    
    app.post("/api/visit", [authJwt.verifyToken],visitController.createVisit);
    app.put("/api/visit/:id",[authJwt.verifyToken],visitController.updateVisit);
    app.delete("/api/visit/:id",[authJwt.verifyToken],visitController.deleteVisit);
    
    // Designation Controller
    app.get("/api/designation",designation.getAllDesignation);
    app.get("/api/designation/:id",designation.getSingleDesignation);    
    app.post("/api/designation", [authJwt.verifyToken],designation.createDesignation);
    app.put("/api/designation/:id",[authJwt.verifyToken],designation.updateDesignation);
    app.put("/api/designation-status/:id",[authJwt.verifyToken],designation.updateDesignationStatus);
    app.delete("/api/designation/:id",[authJwt.verifyToken],designation.deleteDesignation);
    
    // Area Controller
    app.get("/api/area",area.getAllArea);
    app.get("/api/area/:id",area.getSingleArea);    
    app.post("/api/area", [authJwt.verifyToken],area.createArea);
    app.put("/api/area/:id",[authJwt.verifyToken],area.updateArea);
    app.put("/api/area-status/:id",[authJwt.verifyToken],area.updateAreaStatus);
    app.delete("/api/area/:id",[authJwt.verifyToken],area.deleteArea);

    // Scheme Controller
    app.get("/api/scheme",schemeController.getAllScheme);
    app.get("/api/scheme/:id",schemeController.getSingleScheme);    
    app.post("/api/scheme", [authJwt.verifyToken],schemeController.createScheme);
    app.put("/api/scheme/:id",[authJwt.verifyToken],schemeController.updateScheme);
    app.delete("/api/scheme/:id",[authJwt.verifyToken],schemeController.deleteScheme);
    
    // Policy Controller
    app.get("/api/policy",policy.getAllPolicy);
    app.get("/api/policy/:id",policy.getSinglePolicy);    
    app.post("/api/policy", [authJwt.verifyToken],policy.createPolicy);
    app.put("/api/policy/:id",[authJwt.verifyToken],policy.updatePolicy);
    app.delete("/api/policy/:id",[authJwt.verifyToken],policy.deletePolicy);
    
    // Commission Controller
    app.get("/api/commission",commissionController.getAllCommission);
    app.get("/api/topcommission",commissionController.getTopCommission);
    app.get("/api/commission/:id",commissionController.getSingleCommission);    
    app.post("/api/commission", [authJwt.verifyToken],commissionController.createCommission);
    app.put("/api/commission/:id",[authJwt.verifyToken],commissionController.updateCommission);
    app.delete("/api/commission/:id",[authJwt.verifyToken],commissionController.deleteCommission);

    // Product Controller
    app.get("/api/product",product.getAllProduct);
    app.get("/api/product/:id",product.getSingleProduct); 
    app.get("/api/product-monthwise-pie/:month/:year",product.getDashboardPieMonthWise);    
    app.post("/api/product", [authJwt.verifyToken],product.createProduct);
    app.put("/api/product/:id",[authJwt.verifyToken],product.updateProduct);
    app.put("/api/productprice/:id",[authJwt.verifyToken],product.updateProductPrice);
    app.delete("/api/product/:id",[authJwt.verifyToken],product.deleteProduct);



    //Incentive Controller
    app.post("/api/incentive", [authJwt.verifyToken],incentive.createIncentive);
    app.get("/api/incentive-by-emp/:empId",incentive.getAllIncentiveByEmp); 
    app.put("/api/incentive-balance/:id",[authJwt.verifyToken],incentive.updateIncentiveBalanceTransfer); 

    // Order Controller
    app.get("/api/order",order.getAllOrders);
    app.get("/api/order/:id",order.getSingleOrders);   
    app.get("/api/emp-performace",order.getEmpPerformance); 
    app.get("/api/order-by-emp/:empId",order.getAllOrdersByEmp); 
    app.get("/api/order-by-emp-date/:empId/:fromDate/:toDate",order.getAllOrdersByEmpDates); 
    app.get("/api/order-by-retailer/:empId",order.getAllOrdersByRetailer); 
    app.get("/api/payment-pending-order-by-retailer/:empId",order.getAllPendingOrdersByRetailer); 
    app.get("/api/dashboard-count/:empId",order.dashboardCount); 
    app.get("/api/dashboard-retailer-count/:rtrlId/:month/:year",order.retailerDashboardCount); 
    app.get("/api/admin-dashboard-pie",order.getBrandWiseYearSales); 
    app.get("/api/admin-year-wise-sales",order.getCurrentFiscalYrWiseSales);
    app.get("/api/month-dashboard-count/:empId",order.getMonthWiseDashboard); 
    app.get("/api/month-incentive/:empId",order.getMonthWiseIncentive); 
    app.get("/api/month-dashboard-count-retailer/:rtrlId",order.getMonthWiseDashboard); 
    app.post("/api/order", [authJwt.verifyToken],order.createOrders);
    app.put("/api/order/:id",[authJwt.verifyToken],order.updateOrders);
    app.get("/api/orders-pie/:empId",order.getDashboardPie);    
    app.put("/api/payment-success/:id",[authJwt.verifyToken],order.paymentSuccess);
    app.put("/api/confirm-order/:id",[authJwt.verifyToken],order.confirmOrder);
    app.put("/api/invoice-order/:id",[authJwt.verifyToken],order.invoiceUpate);
    app.delete("/api/order/:id",[authJwt.verifyToken],order.deleteOrders);

    // Product Price Controller
    app.get("/api/productprice",productPrice.getAllProductPrice);
    app.get("/api/productprice/:id",productPrice.getSingleProductPrice);    
    app.post("/api/productprice/:productId", [authJwt.verifyToken],productPrice.createProductPrice);
    app.put("/api/productprice/:productId/:id",[authJwt.verifyToken],productPrice.updateProductPrice);
    app.delete("/api/productprice/:id",[authJwt.verifyToken],productPrice.deleteProductPrice);

    // Employee Controller
    app.get("/api/employee",employee.getAllEmployee);
    app.get("/api/employee-incentive",employee.getAllEmployeeWithIncentive);
    app.get("/api/employee/:id",employee.getSingleEmployee);    
    app.get("/api/employee-by-user/:id",employee.getSingleEmployeeByUser);    
    app.post("/api/employee", [authJwt.verifyToken],employee.createEmployee);
    app.put("/api/employee/:id",[authJwt.verifyToken],employee.updateEmployee);
    app.put("/api/employee-alloated-area/:id",[authJwt.verifyToken],employee.updateEmployeeAlloatedArea);
    app.put("/api/employee-blackout-area/:id",[authJwt.verifyToken],employee.updateEmployeeBlackoutArea);
    app.delete("/api/employee/:id",[authJwt.verifyToken],employee.deleteEmployee);

    // Retailer Controller
    app.get("/api/retailer",retailer.getAllRetailer);
    app.get("/api/retailer-by-emp/:empId",retailer.getAllRetailerByEmployee);
    app.get("/api/retailer-by-user/:id",retailer.getSingleRetailerByUser);   
    app.get("/api/retailer/:id",retailer.getSingleRetailer);    
    app.post("/api/retailer", [authJwt.verifyToken],retailer.createRetailer);
    app.post("/api/retailer-emp", [authJwt.verifyToken],retailer.createRetailerByEmp);
    app.put("/api/retailer/:id",[authJwt.verifyToken],retailer.updateRetailer);
    app.delete("/api/retailer/:id",[authJwt.verifyToken],retailer.deleteRetailer);

    // User Controller
    app.get("/api/user/:id", user.getsingleUser);   
    app.put("/api/user-status/:id",[authJwt.verifyToken],user.updateStatus); 

};
