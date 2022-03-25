const db = require("../models");
const fs = require('fs');
const path = require('path')
const formidable = require('formidable');

exports.uploadFile = (req, res) => {
    const form = new formidable.IncomingForm({allowEmptyFiles:false,keepExtensions:true});
    form.parse(req, function(err, fields, files){
        if(fields.file !== ""){
            var oldPath = files.file.filepath;
            var newPath = path.join(__dirname, '../../uploads')
                    + '/'+files.file.newFilename
            var rawData = fs.readFileSync(oldPath)
        
            fs.writeFile(newPath, rawData, function(err){

                res.status(200).send({
                    status:"success",
                    message : "Successfully Uploaded",
                    data: {
                        url:files.file.newFilename
                    }
                });
            });
        } else {
            res.status(500).send({ status:"error", message: "File is Missing" });
        }
    });
};



exports.retrieveFile = (req, res, next) => {
    try{
        console.log(req.params.file);
        res.status(200).sendFile(path.join(__dirname, '../../uploads/'+req.params.file));
    }catch(error){
        res.status(500).send({ status:"error", message: "File is Missing" });
    }
}

exports.downloadCSVFile = (req, res, next) => {
    try{
        res.status(200).sendFile(path.join(__dirname, '../../uploads/'+req.params.file));
    }catch(error){
        res.status(500).send({ status:"error", message: "File is Missing" });
    }
}