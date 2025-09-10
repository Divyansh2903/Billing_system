// import { Order } from '../db/index.js';


const { PrismaClient } = require("../generated/prisma")
const prisma = new PrismaClient();


export async function handlePaymentSuccess(orderId,razorpay_payment_id,paymentMethod,amount) {
  try {

    await prisma.$transaction(async (tx) => {
      const updatedOrder = await tx.order.update({
        where: { razorpayId: orderId },
        data: {
          paymentStatus: "PAID",
          paymentMethod: paymentMethod,
          totalAmount: amount,
          razorpayCreatedAt: new Date(),
        },
      });

      await tx.room.update({
        where: { id: updatedOrder.roomId },
        data: {
          lastBillPaidOn: new Date(),
          lastReading: updatedOrder.reading,
        },
      });

    });

  } catch (error) {
    console.error("Error handling success:", error);
  }
}



export async function handlePaymentFailed(payment) {
  try {
    await prisma.order.upsert({
      where: { razorpayId: payment.order_id },
      update: {
        paymentStatus: "FAILED",
        paymentMethod: payment.method,
        failureReason: payment.error_description,
      },
      create: {
        razorpayId: payment.order_id,
        paymentStatus: "FAILED",
        paymentMethod: payment.method,
        failureReason: payment.error_description,
      },
    }).then(result => { console.log("DB SAVE result-", result) });
  } catch (error) {
    console.error("Error handling payment failed:", error);
  }
}