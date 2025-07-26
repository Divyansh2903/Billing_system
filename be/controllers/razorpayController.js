const razorpayServices = require("../services/razorpayServices")
const razorpayWebhookServices = require("../services/razorpayWebhookServices")


exports.createOrder = async (req, res) => {
    const { amount, roomNumber, reading,fileName } = req.body;
    const order = await razorpayServices.createOrder(amount,roomNumber,reading,fileName);
    res.json(order)

};


exports.verifyWebhook = async (req, res) => {
    const body=req.body;
    const headers=req.headers;
    await razorpayWebhookServices.verifyPayment(body,headers);
    res.status(200).json({ success: true });


};
