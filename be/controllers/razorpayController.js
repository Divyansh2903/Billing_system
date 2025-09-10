const razorpayServices = require("../services/razorpayServices")
const razorpayWebhookServices = require("../services/razorpayWebhookServices")


exports.createOrder = async (req, res) => {
    const { amount, roomNumber, reading, fileName, unitsConsumed } = req.body;
    const order = await razorpayServices.createOrder(amount, roomNumber, reading, fileName, unitsConsumed);
    res.json(order)

};


exports.verifyPaymentClient = async (req, res) => {
        const result = await razorpayServices.verifyPaymentClient(req.body);
        console.log(result)
        if (!result.success) return res.status(400).json(result);
        res.status(200).json(result);

};


// exports.verifyWebhook = async (req, res) => {
//     const body=req.body;
//     const headers=req.headers;
//     await razorpayWebhookServices.verifyPayment(body,headers);
//     res.status(200).json({ success: true });


// };
