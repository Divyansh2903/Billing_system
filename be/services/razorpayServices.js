import { PrismaClient } from "../generated/prisma";
import { handlePaymentSuccess } from "../utils/paymentHandlers";

const razorpayInstance = require("../config/razorpay");
const { Order } = require("../db");
const uploadServices = require("./uploadServices");
const crypto = require("crypto");

const prisma = new PrismaClient();
// const { Order } = require("../db");

export async function createOrder(amount, roomNumber, reading, fileName, unitsConsumed) {
  const options = {
    amount: Math.round(amount * 100),
    currency: 'INR',
    receipt: "TEST"
  };

  try {
    const billImageURL = await uploadServices.getLoadURL(fileName);
    const razorpayOrder = await razorpayInstance.orders.create(options);

    //old
    // const newOrder = new Order({
    //   orderId:order.id,
    //   roomNumber,
    //   totalAmount: amount,
    //   reading,
    //   billImageURL,
    //   unitsConsumed
    // });
    // await newOrder.save();Í

    const timestamp = new Date().toISOString().replace(/[-:.TZ]/g, "");
    const orderId = `Order-${timestamp}-${roomNumber}`;

    const dbOrder = await prisma.order.create({
      data: {
        orderId,
        razorpayId: razorpayOrder.id,
        reading,
        unitsConsumed,
        billImageUrl: billImageURL,
        totalAmount: amount,
        Room: { connect: { number: parseInt(roomNumber) } }
      }
    });


    return {
      success: true,
      razorpayOrder
    };
  } catch (err) {
    console.error(err);
    throw new Error('Failed to create order: ' + err.message);
  }
}


export async function verifyPaymentClient(body) {
  try {
    const { razorpay_payment_id, razorpay_order_id, razorpay_signature, amount } = body;

    const expectedSignature = crypto
      .createHmac("sha256", razorpayInstance.key_secret)
      .update(razorpay_order_id + "|" + razorpay_payment_id)
      .digest("hex");

    if (expectedSignature !== razorpay_signature) {
      return { success: false, message: "Invalid signature" };
    }


    await handlePaymentSuccess(razorpay_order_id, razorpay_payment_id, "razorpay", amount);


    return { success: true, message: "Success" };
  } catch (error) {
    return { success: false, message: `Client Payment side fialure ${error}` };
  }
}
