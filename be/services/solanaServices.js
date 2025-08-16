const { Order } = require("../db");
const uploadServices = require("./uploadServices");

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
    orderId,
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

        const newOrder = new Order({
            orderId: orderId || `Solana_Order_${Date.now()}`,
            roomNumber,
            reading,
            billImageURL,
            totalAmount,
            unitsConsumed,
            paymentStatus,
            paymentMethod,
            txSignature,
            failureReason
        });

        await newOrder.save();

        return {
            success: true,
            order: newOrder
        };
    } catch (err) {
        console.error(err);
        throw new Error('Failed to create order: ' + err.message);
    }
}

module.exports={createSolanaOrder,getSolanaPriceInINR}