const razorpayInstance = require("../config/razorpay");
const { Order } = require("../db");
const uploadServices = require("./uploadServices");


async function createOrder(amount, roomNumber,reading,fileName,unitsConsumed) {
    const options = {
    amount: amount * 100,
    currency: 'INR',
    receipt: "TEST"
  };

  try {
    console.log(fileName)
    const billImageURL=await uploadServices.getLoadURL(fileName)
    const order = await razorpayInstance.orders.create(options);

    const newOrder = new Order({
      orderId:order.id,
      roomNumber,
      totalAmount: amount,
      reading,
      billImageURL,
      unitsConsumed
    });

    await newOrder.save();

    return {
      success: true,
      order
    }
  } catch (err) {
    console.error(err);
     throw new Error('Failed to create order: ' + err.message);
  }
    
}

module.exports={createOrder}