const dotenv=require("dotenv");
const fs =require("fs")

const {
    S3Client,
    PutObjectCommand,
    DeleteObjectCommand,
    GetObjectCommand,
    ListObjectsV2Command,
} = require("@aws-sdk/client-s3");
const {getSignedUrl}=require("@aws-sdk/s3-request-presigner")
const {lookup} =require("mime-types")
dotenv.config();


const s3 = new S3Client({
    region: "auto",
    endpoint: process.env.R2_ENDPOINT,
    credentials: {
        accessKeyId: process.env.AWS_ACCESS_KEY_ID,
        secretAccessKey: process.env.AWS_SECRET_ACCESS_KEY,
    },
});


module.exports={
    //server upload
    uploadToR2:async (filePath,fileName)=>{
        const fileStats=fs.statSync(filePath);
        //less than 50 mb- push in one shot
        if(fileStats.size>52428800){
            const file=fs.readFileSync(filePath);
            const params={
                Bucket:process.env.R2_BUCKET,
                Key:fileName,
                Body:file,
            };
            s3.putObject(params,(err,data)=>{
                if(err){
                    console.log(err);
                }else{
                    console.log(data);
                }
            });
        }else{
            //more than 50 mb- push in stream
            const params={
                Bucket:process.env.R2_BUCKET,
                Key:fileName,
                Body:fs.createReadStream(filePath),
            };
            const data=await s3.upload(params).promise();
            console.log(data);
        }
    },
    //pre-signed URL
    getUploadURL:async(fileName)=>{
        const mimeType = lookup(fileName);
        const data=new PutObjectCommand({
            Bucket:process.env.R2_BUCKET,
            Key:fileName,
            ContentType:mimeType
        })
        //an hour to upload to file 
        const signedURL=await getSignedUrl(s3,data,{expiresIn:3600})
        return signedURL;
    },
        getLoadURL:async(fileName)=>{
        const data=new GetObjectCommand({
            Bucket:process.env.R2_BUCKET,
            Key:fileName,
            ContentType:"application/octet-stream"
        })
        const signedURL=await getSignedUrl(s3,data,{expiresIn:3600})
        return signedURL;
    },

}
