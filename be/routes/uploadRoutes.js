const express=require("express")
const router=express.Router();
const uploadController=require("../controllers/uploadController");

router.post("/upload-url",uploadController.getUploadURL);


module.exports = router;