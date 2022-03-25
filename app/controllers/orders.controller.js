const db = require("../models");
const {
  orders: Orders, visit: Visit, employee: Employee
} = db;
const mongoose = require("mongoose");

exports.getEmpPerformance = async (req, res) => {
  const dt = new Date();
  let year1 = dt.getFullYear();
  let year2 = dt.getFullYear();
  let month1 = dt.getMonth();
  let month2 = 0;
  var start = '';
  var end = '';
  if (month1 == 11) {
    month2 = 0;
    year2 = year1 + 1;
  } else {
    month2 = Number(month1) + 1;
    year2 = year1;
  }

  start = new Date(year1, month1, 1);
  end = new Date(year2, month2, 1);

  let empData = [];
  let empData1 = [];

  const employee = Employee.aggregate(
    [{$match:{}},{$lookup:{from:"users",localField:"user",foreignField:'_id',as:"userData"}},
    {$lookup:{from:"designations",localField:"designation",foreignField:'_id',as:"designationArr"}}], (err, data) => {
    if (err) {
      res.status(500).send({ status: "error", message: err });
    } else {
      empData = data;
    }
  });



  let interval = setInterval(() => {
    if (empData.length > 0) {
      clearInterval(interval);
      empData.forEach(empElement => {
        let totalKg = 0;
        const empid = mongoose.Types.ObjectId(empElement.user);
        Orders.aggregate([{
          $match: {
            empId: empid,
            createdAt: { $gte: start, $lt: end }
          }
        },  
        { $group: { _id: "$retailerId", count: { $sum: 1 }, items: { $addToSet: "$items" } } }
        ], (err, data1) => {
          if (err) {
            res.status(500).send({ status: "error", message: err });
          } else {
            for (let i in data1) {
              for (let j in data1[i].items) {
                for (let k in data1[i].items[j]) {
                  if (data1[i].items[j][k].kgpkt === 'Kg') {
                    totalKg += data1[i].items[j][k].totalkgpkt;
                  }
                }
              }
            }
            let per = Number(empElement.targetInKg) / 100;
            let percentage = Math.round(Number(totalKg) / per);
            empData1.push({ data: empElement, percentage: percentage, totalKg: totalKg, total: data1 });
          }
        });
      });

      let interval1 = setInterval(() => {
        if (empData1.length == empData.length) {
          clearInterval(interval1);
          empData1.sort((a, b) => b['percentage'] - a['percentage']);
          res.status(200).send({
            status: "success",
            message: "All Employee",
            data: empData1
          });
        }
      });
    }
  }, 500);

}

exports.getAllOrders = (req, res) => {
  Orders.aggregate([{
    $match: {}
  }, {
    $lookup: {
      from: "users",
      localField: "empId",
      foreignField: '_id',
      as: "employeeData"
    }
  },
  {
    $lookup: {
      from: "retailer_masters",
      localField: "retailerId",
      foreignField: '_id',
      as: "retailerData"
    }
  },{
    $sort:{
      createdAt:-1
    }
  }], (err, data) => {
    if (err) {
      res.status(500).send({
        status: "error",
        message: err
      });
    } else {
      res.status(200).send({
        status: "success",
        message: "All Orders",
        data: data
      });
    }
  });
}


exports.getAllOrdersByEmpDates = (req, res) => {

  var start;
  var end;
  start = new Date(req.params.fromDate);
  end = new Date(req.params.toDate);

  const empid = mongoose.Types.ObjectId(req.params.empId);
  Orders.aggregate([{
    $match: {
      empId: empid,
      createdAt: { $gte: start, $lt: end }
    }
  }, {
    $lookup: {
      from: "retailer_masters",
      localField: "retailerId",
      foreignField: '_id',
      as: "retailerData"
    }
  },
  {
    $lookup: {
      from: "users",
      localField: "empId",
      foreignField: '_id',
      as: "userData"
    }
  }
  ], (err, data) => {
    if (err) {
      res.status(500).send({
        status: "error",
        message: err
      });
    } else {
      res.status(200).send({
        status: "success",
        message: "All Orders",
        data: data
      });
    }
  });
}

exports.getAllOrdersByEmp = (req, res) => {
  const empid = mongoose.Types.ObjectId(req.params.empId);
  Orders.aggregate([{
      $match: {
        empId: empid
      }
    }, {
      $lookup: {
        from: "retailer_masters",
        localField: "retailerId",
        foreignField: '_id',
        as: "retailerData"
      }
    },
    {
      $lookup: {
        from: "users",
        localField: "empId",
        foreignField: '_id',
        as: "userData"
      }
    },
    {
      $sort:{
        createdAt:-1
      }
    }
  ], (err, data) => {
    if (err) {
      res.status(500).send({
        status: "error",
        message: err
      });
    } else {
      res.status(200).send({
        status: "success",
        message: "All Orders",
        data: data
      });
    }
  });
}

exports.getAllOrdersByRetailer = (req, res) => {
  const empid = mongoose.Types.ObjectId(req.params.empId);
  Orders.aggregate([{
    $match: {
      retailerId: empid
    }
  }, {
    $lookup: {
      from: "retailer_masters",
      localField: "retailerId",
      foreignField: '_id',
      as: "retailerData"
    }
  },
  {
    $lookup: {
      from: "users",
      localField: "empId",
      foreignField: '_id',
      as: "userData"
    }
  },
  {
    $sort:{
      createdAt:-1
    }
  }
  ], (err, data) => {
    if (err) {
      res.status(500).send({
        status: "error",
        message: err
      });
    } else {
      res.status(200).send({
        status: "success",
        message: "All Orders",
        data: data
      });
    }
  });
}

exports.getAllPendingOrdersByRetailer = (req, res) => {
  const empid = mongoose.Types.ObjectId(req.params.empId);
  Orders.aggregate([{
    $match: {
      retailerId: empid,
      paymentStatus: 'pending'
    }
  }, {
    $lookup: {
      from: "retailer_masters",
      localField: "retailerId",
      foreignField: '_id',
      as: "retailerData"
    }
  },
  {
    $lookup: {
      from: "users",
      localField: "empId",
      foreignField: '_id',
      as: "userData"
    }
  },
  {
    $sort:{
      createdAt:-1
    }
  }
  ], (err, data) => {
    if (err) {
      res.status(500).send({
        status: "error",
        message: err
      });
    } else {
      res.status(200).send({
        status: "success",
        message: "All Orders",
        data: data
      });
    }
  });
}


exports.getMonthWiseDashboardRetailer = async (req, res) => {
  let totalKg = 0;
  const rtrlId = mongoose.Types.ObjectId(req.params.rtrlId);
  let ordersCount = await Orders.aggregate([
    {
      $match: {
        rtrlId: rtrlId
      }
    },
    {
      $project:
      {
        month: { $month: "$createdAt" },
        year: { $year: "$createdAt" },
        items: 1,
        retailerId: 1
      }
    },
    {
      $group: {
        _id: {
          retailerId: "$retailerId",
          month: "$month",
          year: "$year"
        },
        count: {
          $sum: 1
        },
        items: {
          $addToSet: "$items"
        }
      }
    }
  ]).exec();
  for (let i in ordersCount) {
    for (let j in ordersCount[i].items) {
      for (let k in ordersCount[i].items[j]) {
        totalKg += ordersCount[i].items[j][k].totalkgpkt;
      }

    }
    ordersCount[i].totalKg = totalKg;
  }
  res.status(200).send({
    status: "success",
    message: "All Orders",
    data: ordersCount
  });
}


exports.getMonthWiseDashboard = async (req, res) => {
  let totalKg = 0;
  const empid = mongoose.Types.ObjectId(req.params.empId);
  let ordersCount = await Orders.aggregate([
    {
      $match: {
        empId: empid
      }
    },
    {
      $project:
      {
        month: { $month: "$createdAt" },
        year: { $year: "$createdAt" },
        items: 1,
        retailerId: 1
      }
    },
    {
      $group: {
        _id: {
          retailerId: "$retailerId",
          month: "$month",
          year: "$year"
        },
        count: {
          $sum: 1
        },
        items: {
          $addToSet: "$items"
        }
      }
    }
  ]).exec();


  let visitsCount = await Visit.aggregate([
    {
      $match: {
        empId: empid
      }
    },
    {
      $project:
      {
        month: { $month: "$createdAt" },
        year: { $year: "$createdAt" },
        items: 1,
        retailerId: 1
      }
    },
    {
      $group: {
        _id: {
          month: "$month",
          year: "$year"
        },
        count: {
          $sum: 1
        }
      }
    }
  ]).exec();



  for (let i in ordersCount) {
    for (let j in ordersCount[i].items) {
      for (let k in ordersCount[i].items[j]) {
        totalKg += ordersCount[i].items[j][k].totalkgpkt;
      }

    }
    ordersCount[i].totalKg = totalKg;
  }
  res.status(200).send({
    status: "success",
    message: "All Orders",
    data: ordersCount,
    visit: visitsCount[0].count
  });
}


exports.getMonthWiseIncentive = async (req, res) => {
  let totalKg = 0;
  const empid = mongoose.Types.ObjectId(req.params.empId);
  let ordersCount = await Orders.aggregate([
    {
      $match: {
        empId: empid
      }
    },
    {
      $project:
      {
        month: { $month: "$createdAt" },
        year: { $year: "$createdAt" },
        items: 1,
        subTotal: 1
      }
    },
    {
      $group: {
        _id: {
          month: "$month",
          year: "$year"
        },
        count: {
          $sum: 1
        },
        items: {
          $addToSet: "$items"
        },
        totalIncentive: {
          $sum: "$subTotal"
        },
        avgAmount: {
          $avg: "$subTotal"
        }
      }
    }
  ]).exec();
  res.status(200).send({
    status: "success",
    message: "All Orders",
    data: ordersCount
  });
}


exports.retailerDashboardCount = async (req, res) => {
  const rtrlid = mongoose.Types.ObjectId(req.params.rtrlId);
  let totalKg = 0;
  let allOrderCount = 0;
  let pendingOrderCount = 0;


  let size25g = 0;
  let size50g = 0;
  let size100g = 0;
  let size250g = 0;
  let size500g = 0;
  let size1kg = 0;
  let size5kg = 0;
  let size5pkt = 0;
  let size10pkt = 0;
  let size50pkt = 0;
  let size100pkt = 0;
  let size250pkt = 0;
  let size500pkt = 0;
  let size750pkt = 0;
  let sizeBrand1 = 0;
  let sizeBrand2 = 0;
  let sizeBrand3 = 0;
  let kg = [];
  let pkt = [];
  let brand = [];

  let year1 = req.params.year;
  let year2 = 0;
  let month1 = 0;
  let month2 = 0;
  var start = '';
  var end = '';
  month1 = Number(req.params.month);
  if (month1 == 11) {
    month2 = 0;
    year2 = year1 + 1;
  } else {
    month2 = Number(month1) + 1;
    year2 = year1;
  }

  start = new Date(year1, month1, 1);
  end = new Date(year2, month2, 1);

  let allOrderData = await Orders.aggregate([{
    $match: {
      retailerId: rtrlid,
      createdAt: { $gte: start, $lt: end }
    }
  },
  ]).exec();
  allOrderCount = allOrderData.length;
  allOrderData.forEach(data => {
    data['items'].forEach(item => {
      if (item['brand'] === 'Dust') { sizeBrand1++;; }
      if (item['brand'] === 'Leaf') { sizeBrand2++;; }
      if (item['brand'] === 'Elaichi') { sizeBrand3++;; }
      if (item['size'] === '25 g') { size25g++; }
      if (item['size'] === '50 g') { size50g++; }
      if (item['size'] === '100 g') { size100g++; }
      if (item['size'] === '250 g') { size250g++; }
      if (item['size'] === '500 g') { size500g++; }
      if (item['size'] === '1 kg') { size1kg++; }
      if (item['size'] === '5 kg') { size5kg++; }
      if (item['size'] === '5 Pkts') { size5pkt++; }
      if (item['size'] === '10 Pkts') { size10pkt++; }
      if (item['size'] === '50 Pkts') { size50pkt++; }
      if (item['size'] === '100 Pkts') { size100pkt++; }
      if (item['size'] === '250 Pkts') { size250pkt++; }
      if (item['size'] === '500 Pkts') { size500pkt++; }
      if (item['size'] === '750 Pkts') { size750pkt++; }
    })
  });
  let pendingOrderData =await Orders.aggregate([{
    $match: {
      retailerId: rtrlid,
      paymentStatus: 'pending',
      createdAt: { $gte: start, $lt: end }
    }
  }
  ]).exec();
  pendingOrderCount = pendingOrderData.length


  kg.push({ size25g: size25g, size50g: size50g, size100g: size100g, size250g: size250g, size500g: size500g, size1kg: size1kg, size5kg: size5kg });
  pkt.push({ size5pkt: size5pkt, size10pkt: size10pkt, size50pkt: size50pkt, size100pkt: size100pkt, size250pkt: size250pkt, size500pkt: size500pkt, size750pkt: size750pkt });
  brand.push({ sizeBrand1, sizeBrand2, sizeBrand3 });

  res.status(200).send({
    status: "success",
    message: "Dashboard Order Count",
    allOrderCount: allOrderCount,
    pendingOrderCount: pendingOrderCount,
    kg: kg,
    pkt: pkt,
    brand: brand
  });
}


exports.getBrandWiseYearSales = async (req,res)=>{
  let sizeBrand1 = 0;
  let sizeBrand2 = 0;
  let sizeBrand3 = 0;
  let brand = [];
  let year1 = new Date().getFullYear();
  let year2 = new Date().getFullYear() + 1;
  let start = new Date(year1+ "-03-01");
  let end = new Date(year2+ "-02-31");
  let allOrderData = await Orders.aggregate([{
    $match: {
      createdAt: { $gte: start, $lt: end }
    }
  }]).exec();
  
  allOrderData.forEach(data => {
    data['items'].forEach(item => {
      if (item['brand'] === 'Dust') { sizeBrand1 = Number(sizeBrand1) + Number(item.totalkgpkt) }
      if (item['brand'] === 'Leaf') { sizeBrand2 = Number(sizeBrand2) + Number(item.totalkgpkt) }
      if (item['brand'] === 'Elaichi') { sizeBrand3 = Number(sizeBrand3) + Number(item.totalkgpkt) }
    })
  });
  brand.push({ sizeBrand1, sizeBrand2, sizeBrand3 });
  res.status(200).send({
    status: "success",
    message: "Dashboard Pie Count",
    brand: brand
  });
}


exports.getCurrentFiscalYrWiseSales = async (req,res)=>{
    var today = new Date();
    
    var curMonth = today.getMonth();
    let year1 = 0;
    let year2= 0;
    var fiscalYr = "";
    if (curMonth > 3) { 
        year1 = today.getFullYear().toString();
        year2 = (today.getFullYear() + 1).toString()
    } else {
      year1 =(today.getFullYear() - 1).toString();
      year2=  today.getFullYear().toString();
    }

    let aprilsCountkg = 0;
    let mayCountkg = 0;
    let juneCountkg = 0;
    let julyCountkg = 0;
    let augustCountkg = 0;
    let septCountkg = 0;
    let octCountkg = 0;
    let novCountkg = 0;
    let decCountkg = 0;
    let janCountkg = 0;
    let febCountkg = 0;
    let marCountkg = 0;

    let aprilsCount = await Orders.aggregate([{$match: {createdAt: { $gte: new Date(year1+ "-04-01"), $lt: new Date(year1+ "-04-30") }}},
    { $group: { _id : null, count: { $sum: 1 }, items: { $addToSet: "$items" } }}]).exec();
    let mayCount = await Orders.aggregate([{$match: {createdAt: { $gte: new Date(year1+ "-05-01"), $lt: new Date(year1+ "-05-31") }}},
    { $group: { _id : null, count: { $sum: 1 }, items: { $addToSet: "$items" } }}]).exec();
    let juneCount = await Orders.aggregate([{$match: {createdAt: { $gte: new Date(year1+ "-06-01"), $lt: new Date(year1+ "-06-30") }}},
    { $group: { _id : null, count: { $sum: 1 }, items: { $addToSet: "$items" } }}]).exec();
    let julyCount = await Orders.aggregate([{$match: {createdAt: { $gte: new Date(year1+ "-07-01"), $lt: new Date(year1+ "-07-31") }}},
    { $group: { _id : null, count: { $sum: 1 }, items: { $addToSet: "$items" } }}]).exec();
    let augustCount = await Orders.aggregate([{$match: {createdAt: { $gte: new Date(year1+ "-08-01"), $lt: new Date(year1+ "-08-31") }}},
    { $group: { _id : null, count: { $sum: 1 }, items: { $addToSet: "$items" } }}]).exec();
    let septCount = await Orders.aggregate([{$match: {createdAt: { $gte: new Date(year1+ "-09-01"), $lt: new Date(year1+ "-09-30") }}},
    { $group: { _id : null, count: { $sum: 1 }, items: { $addToSet: "$items" } }}]).exec();
    let octCount = await Orders.aggregate([{$match: {createdAt: { $gte: new Date(year1+ "-10-01"), $lt: new Date(year1+ "-10-31") }}},
    { $group: { _id : null, count: { $sum: 1 }, items: { $addToSet: "$items" } }}]).exec();
    let novCount = await Orders.aggregate([{$match: {createdAt: { $gte: new Date(year1+ "-11-01"), $lt: new Date(year1+ "-11-30") }}},
    { $group: { _id : null, count: { $sum: 1 }, items: { $addToSet: "$items" } }}]).exec();
    let decCount = await Orders.aggregate([{$match: {createdAt: { $gte: new Date(year1+ "-12-01"), $lt: new Date(year1+ "-12-31") }}},
    { $group: { _id : null, count: { $sum: 1 }, items: { $addToSet: "$items" } }}]).exec();
    let janCount = await Orders.aggregate([{$match: {createdAt: { $gte: new Date(year2+ "-01-01"), $lt: new Date(year2+ "-01-31") }}},
    { $group: { _id : null, count: { $sum: 1 }, items: { $addToSet: "$items" } }}]).exec();
    let febCount = await Orders.aggregate([{$match: {createdAt: { $gte: new Date(year2+ "-02-01"), $lt: new Date(year2+ "-02-29") }}},
    { $group: { _id : null, count: { $sum: 1 }, items: { $addToSet: "$items" } }}]).exec();
    let marCount = await Orders.aggregate([{$match: {createdAt: { $gte: new Date(year2+ "-03-01"), $lt: new Date(year2+ "-03-31") }}},
    { $group: { _id : null, count: { $sum: 1 }, items: { $addToSet: "$items" } }}]).exec();

    for (let i in aprilsCount) {
      for (let j in aprilsCount[i].items) {
        for (let k in aprilsCount[i].items[j]) {
          if (aprilsCount[i].items[j][k].kgpkt === 'Kg') {
            aprilsCountkg += aprilsCount[i].items[j][k].totalkgpkt;
          }
        }
      }
    }
    for (let i in febCount) {
      for (let j in febCount[i].items) {
        for (let k in febCount[i].items[j]) {
          if (febCount[i].items[j][k].kgpkt === 'Kg') {
            febCountkg += febCount[i].items[j][k].totalkgpkt;
          }
        }
      }
    }
    for (let i in marCount) {
      for (let j in marCount[i].items) {
        for (let k in marCount[i].items[j]) {
          if (marCount[i].items[j][k].kgpkt === 'Kg') {
            marCountkg += marCount[i].items[j][k].totalkgpkt;
          }
        }
      }
    }
    for (let i in janCount) {
      for (let j in janCount[i].items) {
        for (let k in janCount[i].items[j]) {
          if (janCount[i].items[j][k].kgpkt === 'Kg') {
            janCountkg += janCount[i].items[j][k].totalkgpkt;
          }
        }
      }
    }
    for (let i in decCount) {
      for (let j in decCount[i].items) {
        for (let k in decCount[i].items[j]) {
          if (decCount[i].items[j][k].kgpkt === 'Kg') {
            decCountkg += decCount[i].items[j][k].totalkgpkt;
          }
        }
      }
    }
    for (let i in novCount) {
      for (let j in novCount[i].items) {
        for (let k in novCount[i].items[j]) {
          if (novCount[i].items[j][k].kgpkt === 'Kg') {
            novCountkg += novCount[i].items[j][k].totalkgpkt;
          }
        }
      }
    }
    for (let i in octCount) {
      for (let j in octCount[i].items) {
        for (let k in octCount[i].items[j]) {
          if (octCount[i].items[j][k].kgpkt === 'Kg') {
            octCountkg += octCount[i].items[j][k].totalkgpkt;
          }
        }
      }
    }
    for (let i in septCount) {
      for (let j in septCount[i].items) {
        for (let k in septCount[i].items[j]) {
          if (septCount[i].items[j][k].kgpkt === 'Kg') {
            septCountkg += septCount[i].items[j][k].totalkgpkt;
          }
        }
      }
    }
    for (let i in augustCount) {
      for (let j in augustCount[i].items) {
        for (let k in augustCount[i].items[j]) {
          if (augustCount[i].items[j][k].kgpkt === 'Kg') {
            augustCountkg += augustCount[i].items[j][k].totalkgpkt;
          }
        }
      }
    }
    for (let i in julyCount) {
      for (let j in julyCount[i].items) {
        for (let k in julyCount[i].items[j]) {
          if (julyCount[i].items[j][k].kgpkt === 'Kg') {
            julyCountkg += julyCount[i].items[j][k].totalkgpkt;
          }
        }
      }
    }
    for (let i in juneCount) {
      for (let j in juneCount[i].items) {
        for (let k in juneCount[i].items[j]) {
          if (juneCount[i].items[j][k].kgpkt === 'Kg') {
            juneCountkg += juneCount[i].items[j][k].totalkgpkt;
          }
        }
      }
    }
    for (let i in mayCount) {
      for (let j in mayCount[i].items) {
        for (let k in mayCount[i].items[j]) {
          if (mayCount[i].items[j][k].kgpkt === 'Kg') {
            mayCountkg += mayCount[i].items[j][k].totalkgpkt;
          }
        }
      }
    }

    res.status(200).send({
      status: "success",
      message: "All Sales Year Wise",
      april: aprilsCountkg,
      may: mayCountkg,
      june: juneCountkg,
      july:julyCountkg,
      august:augustCountkg,
      september:septCountkg,
      october:octCountkg,
      november:novCountkg,
      december:decCountkg,
      january:janCountkg,
      february:febCountkg,
      march:marCountkg
    });
    
}
exports.dashboardCount = async (req, res) => {
  const dt = new Date();
  let totalKg = 0;

  const empid = mongoose.Types.ObjectId(req.params.empId);
  let ordersCount = await Orders.aggregate([{
    $match: {
      empId: empid,
      createdAt: { $gte: new Date(dt.getFullYear() + "-" + ("0" + (dt.getMonth() + 1)).slice(-2) + "-" + ("0" + (dt.getDate())).slice(-2)) }
    }

  }
    , {
    $group: {
      _id: "$retailerId",
      count: {
        $sum: 1
      },
      items: { $addToSet: "$items" }
    }
  }
  ]).exec();

  let visitsCount = await Visit.aggregate([{
    $match: {
      empId: empid,
      createdAt: { $gte: new Date(dt.getFullYear() + "-" + ("0" + (dt.getMonth() + 1)).slice(-2) + "-" + ("0" + (dt.getDate())).slice(-2)) }
    }

  }
  ]).exec();

  for (let i in ordersCount) {
    for (let j in ordersCount[i].items) {
      for (let k in ordersCount[i].items[j]) {
        totalKg += ordersCount[i].items[j][k].totalkgpkt;
      }

    }
  }
  res.status(200).send({
    status: "success",
    message: "All Orders",
    data: ordersCount,
    total: totalKg,
    visits: visitsCount.length
  });
}

exports.getSingleOrders = (req, res) => {
  Orders.find({
    _id: req.params.id
  }, (err, data) => {
    if (err) {
      res.status(500).send({
        status: "error",
        message: err
      });
    } else {
      res.status(200).send({
        status: "success",
        message: "Orders",
        data: data
      });
    }
  });
}

exports.createOrders = async (req, res) => {
  let invoiceNo = 0;
  let ordersCount = await Orders.count().exec();

  if (ordersCount == 0) {
    invoiceNo = 1;
    console.log(invoiceNo);
  } else {
    let sortOrders = await Orders.findOne({}).sort('-proformaInvoiceNo').exec();
    invoiceNo = sortOrders.proformaInvoiceNo + 1;

  }

  const orders = new Orders({
    proformaInvoiceNo: invoiceNo,
    items: req.body.items,
    offers: req.body.offers,
    subTotal: req.body.subtotal,
    commission: req.body.commission,
    commissionId:req.body.commissionId,
    cgst: req.body.cgst,
    sgst: req.body.sgst,
    totalAmount: req.body.total,
    empId: req.body.empId,
    retailerId: req.body.retailer,
    status: "pending",
    paymentStatus: "pending",
    transportName: req.body.transportName,
    transportContact: req.body.transportContact,
    transportId:req.body.transportId,
    invoiceStatus: false
  });

  let findOrders = Orders.find({ proformaInvoiceNo: invoiceNo }).exec();
  if (findOrders.length > 0) {
    res.status(200).send({ status: "error", message: "Invoice No. Already Exist" });
  } else {
    orders.save((err, data) => {
      if (err) {
        res.status(500).send({
          message: err
        });
        return;
      }

      res.status(200).send({
        status: "success",
        message: "Orders Created Successfully"
      });
    });
  }

};

exports.updateOrders = (req, res) => {
  Orders.findByIdAndUpdate(req.params.id, {
    $set: {
      transportName: req.body.transportName,
      transportContact: req.body.transportContact,
      transportId:req.body.transportId,
      date: req.body.date,
      proformaInvoiceNo: req.body.proformaInvoiceNo,
      items: req.body.items,
      subTotal: req.body.subTotal,
      commission: req.body.commission,
      cgst: req.body.cgst,
      sgst: req.body.sgst,
      totalAmount: req.body.totalAmount,
      empId: req.body.empId,
      retailerId: req.body.retailerId
    }
  }, (err, data) => {
    if (err) {
      res.status(500).send({
        status: "error",
        message: err
      });
    } else {
      res.status(200).send({
        status: "success",
        message: "Orders updated successfully"
      });
    }
  });
}



exports.confirmOrder = (req, res) => {
  Orders.findByIdAndUpdate(req.params.id, {
    $set: {
      status: req.body.status
    }
  }, (err, data) => {
    if (err) {
      res.status(500).send({
        status: "error",
        message: err
      });
    } else {
      res.status(200).send({
        status: "success",
        message: "Orders updated successfully"
      });
    }
  });
}



exports.invoiceUpate = (req, res) => {
  Orders.findByIdAndUpdate(req.params.id, {
    $set: {
      invoiceStatus: true
    }
  }, (err, data) => {
    if (err) {
      res.status(500).send({
        status: "error",
        message: err
      });
    } else {
      res.status(200).send({
        status: "success",
        message: "Orders updated successfully"
      });
    }
  });
}



exports.paymentSuccess = (req, res) => {
  Orders.findByIdAndUpdate(req.params.id, {
    $set: {
      paymentStatus: req.body.status,
      paymentId: req.body.paymentId
    }
  }, (err, data) => {
    if (err) {
      res.status(500).send({
        status: "error",
        message: err
      });
    } else {
      res.status(200).send({
        status: "success",
        message: "Payment successfully Done"
      });
    }
  });
}

exports.getDashboardPie = async (req, res) => {
  let size25g = 0;
  let size50g = 0;
  let size100g = 0;
  let size250g = 0;
  let size500g = 0;
  let size1kg = 0;
  let size5kg = 0;
  let size5pkt = 0;
  let size10pkt = 0;
  let size50pkt = 0;
  let size100pkt = 0;
  let size250pkt = 0;
  let size500pkt = 0;
  let size750pkt = 0;
  let sizeBrand1 = 0;
  let sizeBrand2 = 0;
  let sizeBrand3 = 0;
  let kg = [];
  let pkt = [];
  let brand = [];
  const empId = mongoose.Types.ObjectId(req.params.empId);
  let orders = await Orders.aggregate([{ $match: { empId: empId } }]).exec();
  for (let i in orders) {
    for (let j in orders[i].items) {
      if (orders[i].items[j].brand === 'Dust') {
        sizeBrand1 += 1;
      }
      if (orders[i].items[j].brand === 'Leaf') {
        sizeBrand2 += 1;
      }
      if (orders[i].items[j].brand === 'Elaichi') {
        sizeBrand3 += 1;
      }
      if (orders[i].items[j].size == "25 g") {
        size25g += 1;
      }
      if (orders[i].items[j].size == "50 g") {
        size50g += 1;
      }
      if (orders[i].items[j].size == "100 g") {
        size100g += 1;
      }
      if (orders[i].items[j].size == "250 g") {
        size250g += 1;
      }
      if (orders[i].items[j].size == "500 g") {
        size500g += 1;
      }
      if (orders[i].items[j].size == "1 kg") {
        size1kg += 1;
      }
      if (orders[i].items[j].size == "5 kg") {
        size5kg += 1;
      }
      if (orders[i].items[j].size == "5 Pkts") {
        size5pkt += 1;
      }
      if (orders[i].items[j].size == "10 Pkts") {
        size10pkt += 1;
      }
      if (orders[i].items[j].size == "50 Pkts") {
        size50pkt += 1;
      }
      if (orders[i].items[j].size == "100 Pkts") {
        size100pkt += 1;
      }
      if (orders[i].items[j].size == "250 Pkts") {
        size250pkt += 1;
      }
      if (orders[i].items[j].size == "500 Pkts") {
        size500pkt += 1;
      }
      if (orders[i].items[j].size == "750 Pkts") {
        size750pkt += 1;
      }
    }
  }
  kg.push({ size25g: size25g, size50g: size50g, size100g: size100g, size250g: size250g, size500g: size500g, size1kg: size1kg, size5kg: size5kg });
  pkt.push({ size5pkt: size5pkt, size10pkt: size10pkt, size50pkt: size50pkt, size100pkt: size100pkt, size250pkt: size250pkt, size500pkt: size500pkt, size750pkt: size750pkt });
  brand.push({ sizeBrand1, sizeBrand2, sizeBrand3 });
  res.status(200).send({
    status: "success",
    message: "Pie Chart Data Fetched Successfullu",
    kg: kg,
    pkt: pkt,
    brand: brand
  });
}

exports.deleteOrders = (req, res) => {
  Orders.findByIdAndDelete(req.params.id, (err, data) => {
    if (err) {
      res.status(500).send({
        status: "error",
        message: err
      });
    } else {
      res.status(200).send({
        status: "success",
        message: "Orders deleted successfully"
      });
    }
  });
}