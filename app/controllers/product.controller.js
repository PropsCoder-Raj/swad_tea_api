const db = require("../models");
const { product:Product } = db;

// exports.updateBrandData = (req, res) => {
//   Product.updateMany(
//     {productName: 'SWARG ELAICHI'},
//     { $set: {brand: 'Elaichi'} },
//   function(err, result) {
//       console.log(result);
//       console.log(err);
//   })  
// };

exports.getAllProduct = (req,res)=>{
    Product.find({},(err,data)=>{
        if(err){
          res.status(500).send({ status:"error", message: err });
        } else {
          res.status(200).send({
              status:"success",
              message : "All Product",
              data: data
          });
        }
    });
}

exports.getSingleProduct = (req,res)=>{
    Product.find({_id:req.params.id},(err,data)=>{
        if(err){
          res.status(500).send({ status:"error", message: err });
        } else {
          res.status(200).send({
              status:"success",
              message : "Product",
              data: data
          });
        }
    });
}

exports.createProduct = (req, res) => {
    const product = new Product({
      productCode: req.body.productCode,
      productName: req.body.productName,
      productType: req.body.productType,
      productHindiName: req.body.productHindiName,
      tag: req.body.tag,
      uom: req.body.uom,
      brand: req.body.brand,
      group: req.body.group,
      size: req.body.size,
      hsnNo: req.body.hsnNo,
      stdSize: req.body.stdSize,
      mrp: 0,
      discount: 0,
      retailerRate: 0
    });
  
    product.save((err, data) => {
        if (err) {
            res.status(500).send({ message: err });
            return;
        }
  
        res.status(200).send({
            status:"success",
            message : "Product Created Successful"
        });
    });
};

exports.updateProduct = (req,res)=>{
  Product.findByIdAndUpdate(req.params.id,{$set:{
    productCode: req.body.productCode,
    productName: req.body.productName,
    productType: req.body.productType,
    productHindiName: req.body.productHindiName,
    tag: req.body.tag,
    uom: req.body.uom,
    brand: req.body.brand,
    group: req.body.group,
    size: req.body.size,
    hsnNo: req.body.hsnNo,
    stdSize: req.body.stdSize
  }},(err,data)=>{
    if(err){
      res.status(500).send({ status:"error", message: err });
    } else {
      res.status(200).send({
          status:"success",
          message : "Product updated successfully"
      });
    }
  });
}

exports.updateProductPrice = (req,res)=>{
  Product.findByIdAndUpdate(req.params.id,{$set:{
    mrp: req.body.mrp,
    discount: req.body.discount,
    retailerRate: req.body.retailerRate
  }},(err,data)=>{
    if(err){
      res.status(500).send({ status:"error", message: err });
    } else {
      res.status(200).send({
          status:"success",
          message : "Product Price updated successfully"
      });
    }
  });
}





exports.getDashboardPieMonthWise = async (req,res)=>{
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
  let kg=[];
  let pkt=[];
  let year1 = req.params.year;
  let year2 = 0;
  let month1 = 0;
  let month2 = 0;
  var start = '';
  var end = '';
  month1 = Number(req.params.month);
  if(month1 == 11){
    month2 = 0;
    year2 = year1 +1;
  }else{
    month2 = Number(month1) + 1;
    year2 = year1;
  }

  start = new Date(year1, month1, 1);
  end = new Date(year2, month2, 1);
  size25g = await Product.find({size:"25 g", createdAt:{ $gte: start, $lt: end }}).count();
  size50g = await Product.find({size:"50 g", createdAt:{ $gte: start, $lt: end }}).count();
  size100g = await Product.find({size:"100 g", createdAt:{ $gte: start, $lt: end }}).count();
  size250g = await Product.find({size:"250 g", createdAt:{ $gte: start, $lt: end }}).count();
  size500g = await Product.find({size:"500 g", createdAt:{ $gte: start, $lt: end }}).count();
  size1kg = await Product.find({size:"1 kg", createdAt:{ $gte: start, $lt: end }}).count();
  size5kg = await Product.find({size:"5 kg", createdAt:{ $gte: start, $lt: end }}).count();
  kg.push({size25g:size25g,size50g:size50g,size100g:size100g,size250g:size250g,size500g:size500g,size1kg:size1kg,size5kg:size5kg});
  size5pkt = await Product.find({size:"5 Pkts", createdAt:{ $gte: start, $lt: end }}).count();
  size10pkt = await Product.find({size:"10 Pkts", createdAt:{ $gte: start, $lt: end }}).count();
  size50pkt = await Product.find({size:"50 Pkts", createdAt:{ $gte: start, $lt: end }}).count();
  size100pkt = await Product.find({size:"100 Pkts", createdAt:{ $gte: start, $lt: end }}).count();
  size250pkt = await Product.find({size:"250 Pkts", createdAt:{ $gte: start, $lt: end }}).count();
  size500pkt = await Product.find({size:"500 Pkts", createdAt:{ $gte: start, $lt: end }}).count();
  size750pkt = await Product.find({size:"750 Pkts", createdAt:{ $gte: start, $lt: end }}).count();
  pkt.push({size5pkt:size5pkt,size10pkt:size10pkt,size50pkt:size50pkt,size100pkt:size100pkt,size250pkt:size250pkt,size500pkt:size500pkt,size750pkt:size750pkt});
  res.status(200).send({
    status:"success",
    message : "Pie Chart Data Fetched Successfullu",
    kg:kg,
    pkt:pkt
  });
}

exports.deleteProduct = (req,res)=>{
    Product.findByIdAndDelete(req.params.id,(err,data)=>{
      if(err){
        res.status(500).send({ status:"error", message: err });
      } else {
        res.status(200).send({
            status:"success",
            message : "Product deleted successfully"
        });
      }
    });
}
