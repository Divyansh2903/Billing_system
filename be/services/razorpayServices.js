import { PrismaClient } from "../generated/prisma";

const razorpayInstance = require("../config/razorpay");
const { Order } = require("../db");
const uploadServices = require("./uploadServices");

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
