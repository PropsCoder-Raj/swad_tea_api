const db = require("../models");
const { productPrice: ProductPrice, product: Product } = db;

exports.getAllProductPrice = (req,res)=>{
    ProductPrice.find({},(err,data)=>{
        if(err){
          res.status(500).send({ status:"error", message: err });
        } else {
          res.status(200).send({
              status:"success",
              message : "All ProductPrice",
              data: data
          });
        }
    });
}

exports.getSingleProductPrice = (req,res)=>{
    ProductPrice.find({_id:req.params.id},(err,data)=>{
        if(err){
          res.status(500).send({ status:"error", message: err });
        } else {
          res.status(200).send({
              status:"success",
              message : "Product Price",
              data: data
          });
        }
    });
}

exports.createProductPrice = (req, res) => {

    Product.find({ _id: req.params.productId }, (err, productData) => {
        if (!req.params.productId) {
          res.status(400).send({ message: "Product Id Required" });
          return;
        }    

        const productPrice = new ProductPrice({
            productCode: req.body.productCode,
            productName: req.body.productName,
            stdSize: req.body.stdSize,
            uom: req.body.uom,
            mrp: req.body.mrp,
            discount: req.body.discount,
            retailerRate: req.body.retailerRate,
            product: productData[0]
        });
    
        productPrice.save((err, data) => {
            if (err) {
                res.status(500).send({ message: err });
                return;
            }
    
            res.status(200).send({
                status:"success",
                message : "Product Price Created Successful"
            });
        });
    });    
};

exports.updateProductPrice = (req,res)=>{
    

    Product.find({ _id: req.params.productId }, (err, productData) => {
        if (!req.params.productId) {
          res.status(400).send({ message: "Product Id Required" });
          return;
        }  

        ProductPrice.findByIdAndUpdate(req.params.id,{$set:{
            productCode: req.body.productCode,
            productName: req.body.productName,
            stdSize: req.body.stdSize,
            uom: req.body.uom,
            mrp: req.body.mrp,
            discount: req.body.discount,
            retailerRate: req.body.retailerRate,
            product: productData[0]
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
    });    
}

exports.deleteProductPrice = (req,res)=>{
    ProductPrice.findByIdAndDelete(req.params.id,(err,data)=>{
      if(err){
        res.status(500).send({ status:"error", message: err });
      } else {
        res.status(200).send({
            status:"success",
            message : "Product Price deleted successfully"
        });
      }
    });
}
