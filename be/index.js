const { GoogleGenAI } = require("@google/genai");
const express = require("express")
const app = express()
const cors = require("cors")
const multer = require('multer')
const crypto = require('crypto');
const { getUploadURL, getLoadURL } = require("./services/uploadServices");
const { Bill, Order } = require("./db");
const razorpayInstance = require("./config/razorpay");

const { handlePaymentSuccess, handlePaymentFailed } = require("./utils/paymentHandlers");

app.use('/razorpay', express.raw({ type: 'application/json' }));
app.use(cors());
app.use(express.json())
const port = process.env.PORT;

app.use(function (req, res, next) {
  res.header("Access-Control-Allow-Origin", "*");
  res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
  next();
});

async function getPrevReading(roomNo) {
  const prevReading = await Order.findOne({ roomNumber: roomNo })
    .sort({ orderDate: -1 });

  if (prevReading) {

    return prevReading.reading; 
  } else {
    return 0;
  }
}


async function getMeterReading(fileName,roomNumber) {
  const imageURL = await getImageUrl(fileName);
  console.log("code reached getMeterReading part " + imageURL)
  const ai = new GoogleGenAI({});

  const response = await fetch(imageURL);
  console.log(response)
  const imageArrayBuffer = await response.arrayBuffer();
  const base64ImageData = Buffer.from(imageArrayBuffer).toString('base64');
  const mimeType = response.headers.get('Content-Type');
  //to get prev bill
  const prevReading = await getPrevReading(roomNumber);


  const result = await ai.models.generateContent({
    model: "gemini-2.5-flash",
    config: {
      systemInstruction: process.env.GEMINI_SYSTEM_PROMPT,
    },

    contents: [
      {
        inlineData: {
          mimeType: mimeType,
          data: base64ImageData,
        },
      },
      { text: "What is the electricity reading of the meter attached in the meter?" }
    ],
  });
  return {output:result.text,prevReading};
}

// const storage = multer.diskStorage({
//   destination: function (req, file, cb) {
//      cb(null, `${__dirname}/uploads`);
//   },
//   filename: function (req, file, cb) {
//     cb(null, file.originalname)
//   }
// })

// const upload = multer({ storage: storage })




async function getImageUrl(fileName) {
  try {
    const getImageUrl = await getLoadURL(fileName);

    return getImageUrl;
  } catch (e) {
    console.log(e.message)
  }

}
// app.post('/upload', upload.single('image'), async (req, res) => {
//     try{
//         await uploadToR2(req.file.path,req.file.filename);
//         res.send(`File uploaded successfully`)
//     }catch(e){
//         res.status(500).send(`There was some error in uploading the file ${e.message}`)
//     }
// })
app.post("/get-reading", async (req, res) => {
  const fileName = req.body.fileName;
  const roomNumber = req.body.roomNumber;
  const result = await getMeterReading(fileName,roomNumber);
  res.send(result )

})

// app.post("/get-previous-reading", async (req, res) => {
//   const roomNo = req.body.roomNo;
//   const prevReading = await getPrevReading(roomNo);
//   console.log("meter reading" + prevReading)
//   res.send(prevReading)

// })
app.post('/create-order', async (req, res) => {
  const { amount, roomNumber,reading } = req.body;

  const options = {
    amount: amount * 100,
    currency: 'INR',
    receipt: "TEST"
  };

  try {
    const order = await razorpayInstance.orders.create(options);

    const newOrder = new Order({
      orderId:order.id,
      roomNumber,
      totalAmount: amount,
      reading
    });

    await newOrder.save();

    res.json({
      success: true,
      order
    });
  } catch (err) {
    console.error(err);
    res.status(500).json({ success: false });
  }
});
app.post('/razorpay', async (req, res) => {
  
  try {
    const webhookSecret = process.env.RAZORPAY_WEBHOOK_SECRET;
    const signature = req.headers['x-razorpay-signature'];
    
    //verification
    const expectedSignature = crypto
      .createHmac('sha256', webhookSecret)
      .update(req.body)
      .digest('hex');
    
    if (signature !== expectedSignature) {
      return res.status(400).json({ error: 'Invalid signature' });
    }
    
    const event = JSON.parse(req.body);
    console.log("EVENT"+event)
    
    
    switch (event.event) {
      case 'payment.captured':
        console.log("EVENT SUC"+event.payload.payment)
        await handlePaymentSuccess(event.payload.payment.entity);
        break;
      case 'payment.failed':
        await handlePaymentFailed(event.payload.payment.entity);
        break;
      default:
        console.log('Unhandled event:', event.event);
    }
    
    res.status(200).json({ status: 'ok' });
  } catch (error) {
    console.error('Webhook error:', error);
    res.status(500).json({ error: 'Webhook processing failed' });
  }
});


app.post("/get-image-url", async (req, res) => {
  try {
    const fileName = req.body.fileName;
    const imageUrl = await getLoadURL(fileName);
    res.send(imageUrl)
  } catch (e) {
    console.log(e.message)
  }

})

app.post("/save", async (req, res) => {
  console.log("code reached save part")
  const amount = req.body.amount;
  const roomNo = 123;
  const imageURL = req.body.imageURL
  const bill = new Bill({
    amount: amount,
    roomNo: roomNo,
    imageUrl: imageURL,
    paid: false,
  });
  bill.save().then(() => res.json({ msg: "Bill saved successfully!" })).catch((e) => {
    console.log(e)
    res.status(500).json({ msg: "Some internal server error occured!" })
  })

})
app.post("/upload-url", async (req, res) => {
  try {
    const fileName = req.body.fileName;
    console.log(fileName)
    const uploadURL = await getUploadURL(fileName);
    // const meterReading = getMeterReading(getImageUrl(fileName));
    res.send({ uploadURL });
  } catch (e) {
    res.status(500).send("There is some internal error- " + e.message);

  }
})




// app.get("/getText",(req,res)=>{
//     Tesseract.recognize("uploads/Screenshot 2025-07-0ç1 at 2.05.58 PM.png", "eng",{
//          tessedit_char_whitelist: "0123456789",
//     })
//   .then(({ data: { text } }) => {
//     console.log("Extracted text:", text);
//     res.send(text);
//   });
// })


app.listen(port, () => {
  console.log("Listening")
})



//In the case of sending the data to backend and then to the storage,if there are multiple clients and all make requiest the server might use the resources and it might lead to bottlenecks
//Whereas in case of pre-signed urls the client will directly upload to the bucket with a presigned url which the backend will send back and this isnt that much of heavy lifting and this wont be an issue for the backend resources
