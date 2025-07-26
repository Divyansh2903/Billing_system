
const uploadServices = require("../services/uploadServices");

exports.getUploadURL = async (req, res) => {
    console.log("here")
    try{
    const fileName = req.body.fileName;
    const uploadURL = await uploadServices.getUploadURL(fileName);
    res.send({ uploadURL });
    }catch(e){
        console.log("Error at upload-url"+e.message);
    }
};