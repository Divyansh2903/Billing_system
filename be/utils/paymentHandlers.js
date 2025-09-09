// import { Order } from '../db/index.js';


const { PrismaClient } = require("../generated/prisma")




const prisma = new PrismaClient();



// export async function handlePaymentSuccess(payment) {
//     try {
//         console.log("PAYMENT", JSON.stringify(payment, null, 2));
//         const order = await Order.findOne({
//             orderId: payment.order_id
//         });

//         if (order) {
//             order.paymentStatus = 'paid';
//             order.paymentMethod = payment.method;
//             order.totalAmount = payment.amount;
//             order.orderDate = new Date(payment.created_at * 1000);

//             await order.save();
//         }
//     } catch (error) {
//         console.error('Error handling payment captured:', error);
//     }
// }

export async function handlePaymentSuccess(payment) {
  try {
    // await prisma.order.upsert({
    // where: { razorpayId: payment.order_id },
    // update: {
    //   paymentStatus: "PAID",
    //   paymentMethod: payment.method,
    //   totalAmount: payment.amount,
    //   razorpayCreatedAt: new Date(payment.created_at * 1000),
    // },
    //   create: {
    //     razorpayId: payment.order_id,
    //     paymentStatus: "PAID",
    //     paymentMethod: payment.method,
    //     totalAmount: payment.amount,
    //     razorpayCreatedAt: new Date(payment.created_at * 1000),
    //   },
    // }).then(result=>{console.log("DB SAVE result SUCCESS-",result)});;
    
    await prisma.$transaction(async (tx) => {
      const updatedOrder = await tx.order.update({
        where: { razorpayId: payment.order_id },
        data: {
          paymentStatus: "PAID",
          paymentMethod: payment.method,
          totalAmount: payment.amount,
          razorpayCreatedAt: new Date(payment.created_at * 1000),
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
    console.error("Error handling payment success:", error);
  }
}



// export async function handlePaymentFailed(payment) {
//     try {
//         const order = await Order.findOne({
//             razorpayOrderId: payment.order_id
//         });

//         if (order) {
//             order.paymentStatus = 'failed';
//             order.failureReason = payment.error_description;
//             await order.save();
//         }
//     } catch (error) {
//         console.error('Error handling payment failed:', error);
//     }
// }

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