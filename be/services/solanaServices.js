import { PrismaClient } from "../generated/prisma";

const { Order } = require("../db");
const uploadServices = require("./uploadServices");



const prisma = new PrismaClient();


async function getSolanaPriceInINR() {
  const url = 'https://api.coingecko.com/api/v3/simple/price?vs_currencies=inr&ids=solana';
  const options = {
    method: 'GET',
    headers: {
      accept: 'application/json',
      'x-cg-demo-api-key': process.env.COINGECKO_API,
    },
  };

  try {
    const res = await fetch(url, options);
    const data = await res.json();
    return data.solana.inr;
  } catch (err) {
    throw new Error('Failed to get rates: ' + err.message);

  }
}
async function createSolanaOrder({
  roomNumber,
  reading,
  unitsConsumed,
  fileName,
  paymentStatus,
  paymentMethod,
  totalAmount,
  txSignature,
  failureReason
}) {
  try {
    const billImageURL = fileName ? await uploadServices.getLoadURL(fileName) : null;

    //old
    // const newOrder = new Order({
    //     orderId: orderId || `Solana_Order_${Date.now()}`,
    //     roomNumber,
    //     reading,
    //     billImageURL,
    //     totalAmount,
    //     unitsConsumed,
    //     paymentStatus,
    //     paymentMethod,
    //     txSignature,
    //     failureReason
    // });
    // await newOrder.save();
    const timestamp = new Date().toISOString().replace(/[-:.TZ]/g, "");
    const orderId = `Order-${timestamp}-${roomNumber}`;

    // const newOrder=await prisma.order.create({
    //   data:{
    //     orderId:orderId,
    //     reading:reading,
    //     unitsConsumed:unitsConsumed,
    //     txSignature:txSignature,
    //     billImageUrl:billImageURL,
    //     roomId:room.id,
    //     totalAmount:totalAmount,
    //     failureReason:failureReason,
    //     paymentStatus:paymentStatus,
    //     paymentMethod:paymentMethod,

    //   }
    // })

    const [order, updatedRoom] = await prisma.$transaction([
      prisma.order.create({
        data: {
          orderId: orderId,
          reading: reading,
          unitsConsumed: unitsConsumed,
          totalAmount: totalAmount,
          txSignature: txSignature,
          paymentStatus: paymentStatus,
          paymentMethod: paymentMethod,
          Room: { connect: { number: parseInt(roomNumber) } }
        }
      }),
      prisma.room.update({
        where: { number: parseInt(roomNumber) },
        data: {
          lastReading: reading,
          lastBillPaidOn: new Date()
        }
      })
    ]);

    return {
      success: true,
      order: order
    };
  } catch (err) {
    console.error(err);
    throw new Error('Failed to create order: ' + err.message);
  }
}

export default { createSolanaOrder, getSolanaPriceInINR }